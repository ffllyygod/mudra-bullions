const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const API_BASE = 'https://bcast.arihantspot.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID';

function parseRates(data) {
  const lines = data.trim().split('\n');
  const rates = [];
  for (const line of lines) {
    const columns = line.split('\t');
    if (columns.length >= 6) {
      rates.push({
        id: columns[0].trim(),
        name: columns[1].trim(),
        buy: columns[2].trim(),
        sell: columns[3].trim(),
        high: columns[4].trim(),
        low: columns[5].trim(),
      });
    }
  }
  return rates;
}

async function fetchWithTimeout(url, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

app.get('/api/rates', async (req, res) => {
  try {
    const [goldResponse, silverResponse] = await Promise.all([
      fetchWithTimeout(`${API_BASE}/arihant`),
      fetchWithTimeout(`${API_BASE}/arihantsilver`),
    ]);

    if (!goldResponse.ok) throw new Error(`Gold API error: ${goldResponse.status}`);
    if (!silverResponse.ok) throw new Error(`Silver API error: ${silverResponse.status}`);

    const [goldText, silverText] = await Promise.all([goldResponse.text(), silverResponse.text()]);

    const goldRates = parseRates(goldText);
    const silverRates = parseRates(silverText);

    const goldPriceItem = goldRates.find(r => r.name === 'Gold');
    const usdInrItem = goldRates.find(r => r.name === 'USD INR');
    const goldCostItem = goldRates.find(r => r.name === 'GOLD COST');

    const displayGoldRates = goldRates.filter(r => r.name !== 'Gold' && r.name !== 'USD INR' && r.name !== 'GOLD COST');

    const data = {
      gold: displayGoldRates,
      silver: silverRates,
      market: {
        goldPrice: goldPriceItem?.sell || '-',
        usdInr: usdInrItem?.sell || '-',
        goldCost: goldCostItem?.sell || '-',
      },
      timestamp: new Date().toISOString(),
    };

    res.setHeader('Cache-Control', 'public, max-age=5');
    res.json(data);
  } catch (error) {
    console.error('Error fetching rates:', error.message);
    res.status(500).json({ error: 'Failed to fetch rates', message: error.message, timestamp: new Date().toISOString() });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'MUDRA BULLIONS API' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║              🏆 MUDRA BULLIONS 🏆                          ║');
  console.log('║         Live Gold & Silver Rates Server                    ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoint: http://localhost:${PORT}/api/rates`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});
