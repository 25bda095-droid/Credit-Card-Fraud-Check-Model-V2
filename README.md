# 🚀 Fraud Detection Sentinel - Setup Guide

## 📁 Complete File Structure

Create the following structure in your GitHub repository:

```
credit-card-fraud-detection/
├── pages/
│   ├── _app.js
│   └── index.js
├── styles/
│   └── globals.css
├── public/
│   └── (any images or static files)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 📝 Step-by-Step Setup

### 1. Create Files in Your GitHub Repository

#### File 1: `package.json` (Root directory)
```json
{
  "name": "fraud-detection-sentinel",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}
```

#### File 2: `tailwind.config.js` (Root directory)
```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
}
```

#### File 3: `postcss.config.js` (Root directory)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### File 4: `pages/_app.js`
```javascript
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

#### File 5: `pages/index.js`
Copy the ENTIRE React component code from the first artifact (FraudDetectionApp)

#### File 6: `styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #000;
  color: #fff;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.7);
}
```

#### File 7: `.gitignore` (Root directory)
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. Click **"New Project"**
4. **Import** your GitHub repository
5. **Framework Preset**: Select **"Next.js"**
6. **Root Directory**: Leave as `./`
7. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 3. Verify Deployment

Once deployed, you'll get a URL like:
- `https://your-project.vercel.app`

The site should load with:
- ✅ Upload section for CSV/PDF files
- ✅ Live transaction dashboard on the right
- ✅ Real-time updates (dashboard refreshes independently)
- ✅ Results section shows after file upload

## 🎨 Features Implemented

### ✅ Main Features

1. **File Upload Section**
   - Supports CSV and PDF files
   - Drag & drop or click to browse
   - Visual feedback on upload

2. **4 Model Analysis**
   - XGBoost
   - Random Forest
   - Logistic Regression
   - Neural Network
   - Shows detection count (4/4, 3/4, 2/4, 1/4)

3. **Results Display**
   - Fraud vs Legitimate counts
   - Model detection status
   - ROC-AUC scores with animated bars
   - Pie chart visualization
   - Bar chart for model accuracy

4. **Live Dashboard** (Right Side)
   - Auto-refreshes every 3 seconds
   - Shows real-time transactions
   - Risk level indicators (High/Medium/Low)
   - Approved/Blocked status
   - Running statistics
   - **INDEPENDENT REFRESH** - Does NOT affect user's test results

5. **Visual Effects**
   - Animated gradients
   - Smooth transitions
   - Pulse animations
   - Slide-in effects for new transactions
   - Glassmorphism design

## 🔧 Customization

### Change Colors
Edit the gradient colors in `pages/index.js`:
- Red theme: `from-red-500 to-purple-500`
- Blue theme: `from-blue-500 to-cyan-500`
- Green theme: `from-green-500 to-teal-500`

### Adjust Refresh Rate
Change the interval in `pages/index.js`:
```javascript
// Line ~20
const interval = setInterval(() => {
  // ... transaction logic
}, 3000); // Change 3000 to your desired milliseconds
```

### Add Real ML Models
Replace the mock analysis function with actual API calls:
```javascript
const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData
  });
  
  const results = await response.json();
  setResults(results);
};
```

## 🐛 Troubleshooting

### Issue: Styles not loading
- ✅ Check if `postcss.config.js` exists
- ✅ Verify `tailwind.config.js` content paths
- ✅ Ensure `styles/globals.css` has `@tailwind` directives

### Issue: Build fails on Vercel
- ✅ Check all files are committed to GitHub
- ✅ Verify `package.json` dependencies
- ✅ Check Framework Preset is set to "Next.js"

### Issue: Live dashboard not updating
- ✅ Check browser console for errors
- ✅ Verify useEffect interval is running
- ✅ Make sure React is imported correctly

## 📊 Future Enhancements

- [ ] Connect to real ML model APIs
- [ ] Add user authentication
- [ ] Store analysis history
- [ ] Export results to PDF
- [ ] Real-time WebSocket connections
- [ ] Advanced filtering options
- [ ] Custom model training interface

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review Vercel deployment logs
3. Verify all files are in correct directories

---

**Author**: Rishav Raj  
**GitHub**: @25bda095-droid  
**Email**: 25bda095@iiitdwd.ac.in

Made with ❤️ using Next.js, React, and Tailwind CSS
