# 🏆 MUDRA BULLIONS

Live Gold & Silver Rates - Real-time bullion prices with auto-refresh every 30 seconds.

## ✨ Features

- 🥇 **Live Gold Rates** - Real-time gold prices from Chirayu Software
- 🥈 **Live Silver Rates** - Real-time silver prices
- 🔄 **Auto-refresh** - Updates every 30 seconds without page reload
- 📊 **Market Overview** - Gold price per gram, USD/INR rate, Gold Cost
- ⚡ **Visual Feedback** - Flash animation when prices change
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Easy on the eyes with gold/silver accents

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
mudra-bullions-deploy/
├── index.html          # Frontend React app
├── server.js           # Express backend server
├── package.json        # Dependencies
├── Procfile            # Heroku deployment config
└── README.md           # This file
```

## 🌐 Deployment Options

### Option 1: Render (Recommended - Free)

1. Go to [Render](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository or upload files
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click "Create Web Service"
6. Your app will be live at `https://your-app-name.onrender.com`

### Option 2: Railway (Free)

1. Go to [Railway](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js and deploy
5. Your app will be live instantly

### Option 3: Heroku

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create and deploy:
   ```bash
   heroku create mudra-bullions
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Option 4: VPS/Dedicated Server

```bash
# Clone the repository
git clone <your-repo-url>
cd mudra-bullions-deploy

# Install dependencies
npm install

# Start with PM2 for production
npm install -g pm2
pm2 start server.js --name "mudra-bullions"
pm2 startup
pm2 save
```

## 🔧 Configuration

### Change Refresh Interval

Edit `index.html` and modify:
```javascript
const interval = setInterval(fetchRates, 30000); // Change 30000 to your interval in ms
```

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/rates` | Fetch gold and silver rates |
| `GET /api/health` | Health check |

### Data Sources

- **Gold Rates:** `https://bcast.arihantspot.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/arihant`
- **Silver Rates:** `https://bcast.arihantspot.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/arihantsilver`

## 🛠️ Technology Stack

- **Frontend:** React 18 (CDN), Vanilla CSS
- **Backend:** Node.js, Express
- **HTTP Client:** node-fetch
- **Data Source:** Chirayu Software API

## 📊 Rate Card Format

Each rate card displays:
- **Product Name** - e.g., "GOLD 995 (1kg) IND-BIS T+0"
- **Buy Price** - Current buying rate
- **Sell Price** - Current selling rate
- **Low** - Day's lowest price
- **High** - Day's highest price

## ⚠️ Important Notes

1. **CORS:** The Chirayu API doesn't have CORS enabled, so the backend proxy is required
2. **Rate Limiting:** Don't reduce the refresh interval below 10 seconds
3. **SSL:** The API uses HTTPS on port 7768

## 🔍 Troubleshooting

### Connection Error
```
Error: Failed to fetch rates
```
- Check if the API server is accessible
- Verify firewall settings for port 7768

### Server Won't Start
```bash
# Check Node.js version
node --version  # Should be 16+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues with the Chirayu API:
- Website: http://www.chirayusoft.com/
- Arihant Spot: https://www.arihantspot.in/

## 📄 License

MIT License - Feel free to use and modify as needed.

---

**Made with 💛 for MUDRA BULLIONS**
