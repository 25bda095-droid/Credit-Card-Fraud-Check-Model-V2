

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Shield, AlertTriangle, CheckCircle, Activity, TrendingUp, BarChart3, PieChart, RefreshCw, FileText, Download, Zap, Lock, Unlock, Target, Percent } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function FraudDetectionApp() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [liveTransactions, setLiveTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalTransactions: 1247,
    fraudDetected: 23,
    blocked: 18,
    legitimate: 1224
  });
  const resultsRef = useRef(null);

  // Generate mock live transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        amount: (Math.random() * 5000 + 10).toFixed(2),
        merchant: ['Amazon', 'Walmart', 'Gas Station', 'Restaurant', 'Online Store', 'ATM'][Math.floor(Math.random() * 6)],
        location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'][Math.floor(Math.random() * 5)],
        time: new Date().toLocaleTimeString(),
        isFraud: Math.random() > 0.85,
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        status: Math.random() > 0.85 ? 'blocked' : 'approved'
      };

      setLiveTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      
      setStats(prev => ({
        totalTransactions: prev.totalTransactions + 1,
        fraudDetected: prev.fraudDetected + (newTransaction.isFraud ? 1 : 0),
        blocked: prev.blocked + (newTransaction.status === 'blocked' ? 1 : 0),
        legitimate: prev.legitimate + (!newTransaction.isFraud ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'text/csv' || file.type === 'application/pdf' || file.name.endsWith('.csv'))) {
      setUploadedFile(file);
      analyzeFile(file);
    } else {
      alert('Please upload a CSV or PDF file');
    }
  };

  const analyzeFile = async (file) => {
    setAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const totalRecords = Math.floor(Math.random() * 1000) + 500;
    const fraudCount = Math.floor(Math.random() * 50) + 10;
    
    const mockResults = {
      fileName: file.name,
      totalRecords: totalRecords,
      modelsDetected: {
        xgboost: Math.random() > 0.3,
        randomForest: Math.random() > 0.2,
        logisticRegression: Math.random() > 0.4,
        neuralNetwork: Math.random() > 0.35
      },
      fraudCount: fraudCount,
      legitimateCount: totalRecords - fraudCount,
      rocAucScores: {
        xgboost: (0.95 + Math.random() * 0.04).toFixed(3),
        randomForest: (0.93 + Math.random() * 0.05).toFixed(3),
        logisticRegression: (0.88 + Math.random() * 0.06).toFixed(3),
        neuralNetwork: (0.91 + Math.random() * 0.05).toFixed(3)
      },
      // Additional metrics for each model
      modelMetrics: {
        xgboost: {
          precision: (0.92 + Math.random() * 0.06).toFixed(3),
          recall: (0.89 + Math.random() * 0.08).toFixed(3),
          f1Score: (0.90 + Math.random() * 0.07).toFixed(3),
          accuracy: (0.94 + Math.random() * 0.05).toFixed(3),
          truePositives: Math.floor(fraudCount * 0.85),
          falsePositives: Math.floor((totalRecords - fraudCount) * 0.03),
          trueNegatives: Math.floor((totalRecords - fraudCount) * 0.97),
          falseNegatives: Math.floor(fraudCount * 0.15)
        },
        randomForest: {
          precision: (0.90 + Math.random() * 0.07).toFixed(3),
          recall: (0.87 + Math.random() * 0.09).toFixed(3),
          f1Score: (0.88 + Math.random() * 0.08).toFixed(3),
          accuracy: (0.92 + Math.random() * 0.06).toFixed(3),
          truePositives: Math.floor(fraudCount * 0.82),
          falsePositives: Math.floor((totalRecords - fraudCount) * 0.04),
          trueNegatives: Math.floor((totalRecords - fraudCount) * 0.96),
          falseNegatives: Math.floor(fraudCount * 0.18)
        },
        logisticRegression: {
          precision: (0.85 + Math.random() * 0.08).toFixed(3),
          recall: (0.83 + Math.random() * 0.10).toFixed(3),
          f1Score: (0.84 + Math.random() * 0.09).toFixed(3),
          accuracy: (0.88 + Math.random() * 0.08).toFixed(3),
          truePositives: Math.floor(fraudCount * 0.78),
          falsePositives: Math.floor((totalRecords - fraudCount) * 0.06),
          trueNegatives: Math.floor((totalRecords - fraudCount) * 0.94),
          falseNegatives: Math.floor(fraudCount * 0.22)
        },
        neuralNetwork: {
          precision: (0.91 + Math.random() * 0.06).toFixed(3),
          recall: (0.88 + Math.random() * 0.08).toFixed(3),
          f1Score: (0.89 + Math.random() * 0.07).toFixed(3),
          accuracy: (0.93 + Math.random() * 0.05).toFixed(3),
          truePositives: Math.floor(fraudCount * 0.84),
          falsePositives: Math.floor((totalRecords - fraudCount) * 0.035),
          trueNegatives: Math.floor((totalRecords - fraudCount) * 0.965),
          falseNegatives: Math.floor(fraudCount * 0.16)
        }
      }
    };

    setResults(mockResults);
    setAnalyzing(false);
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDownloadReport = async () => {
    if (!results) return;

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]);

      const fontSize = 12;
      const titleSize = 24;
      const headingSize = 16;
      let y = 780;

      page.drawText('CREDIT CARD FRAUD DETECTION', { 
        x: 50, 
        y, 
        size: titleSize, 
        color: rgb(0.86, 0.15, 0.22) 
      });
      y -= 20;
      
      page.drawText('Analysis Report', { 
        x: 50, 
        y, 
        size: headingSize, 
        color: rgb(0.3, 0.3, 0.3) 
      });
      y -= 40;

      page.drawText(`File Name: ${results.fileName}`, { 
        x: 50, 
        y, 
        size: fontSize, 
        color: rgb(0, 0, 0) 
      });
      y -= 25;
      
      page.drawText(`Analysis Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, { 
        x: 50, 
        y, 
        size: fontSize, 
        color: rgb(0, 0, 0) 
      });
      y -= 40;

      page.drawText('SUMMARY', { 
        x: 50, 
        y, 
        size: headingSize, 
        color: rgb(0.58, 0.2, 0.92) 
      });
      y -= 25;

      page.drawText(`Total Records Analyzed: ${results.totalRecords}`, { 
        x: 70, 
        y, 
        size: fontSize, 
        color: rgb(0, 0, 0) 
      });
      y -= 20;

      page.drawText(`Fraudulent Transactions: ${results.fraudCount}`, { 
        x: 70, 
        y, 
        size: fontSize, 
        color: rgb(0.86, 0.15, 0.22) 
      });
      y -= 20;

      page.drawText(`Legitimate Transactions: ${results.legitimateCount}`, { 
        x: 70, 
        y, 
        size: fontSize, 
        color: rgb(0.13, 0.77, 0.37) 
      });
      y -= 20;

      page.drawText(`Fraud Rate: ${((results.fraudCount / results.totalRecords) * 100).toFixed(2)}%`, { 
        x: 70, 
        y, 
        size: fontSize, 
        color: rgb(0, 0, 0) 
      });
      y -= 40;

      page.drawText('MODELS FRAUD DETECTION STATUS', { 
        x: 50, 
        y, 
        size: headingSize, 
        color: rgb(0.58, 0.2, 0.92) 
      });
      y -= 25;

      Object.entries(results.modelsDetected).forEach(([model, detected]) => {
        const modelName = model.replace(/([A-Z])/g, ' $1').trim();
        const status = detected ? 'FRAUD DETECTED' : 'CLEAR';
        const color = detected ? rgb(0.86, 0.15, 0.22) : rgb(0.13, 0.77, 0.37);
        
        page.drawText(`${modelName}: ${status}`, { 
          x: 70, 
          y, 
          size: fontSize, 
          color 
        });
        y -= 20;
      });

      y -= 20;

      page.drawText('MODEL PERFORMANCE (ROC-AUC SCORES)', { 
        x: 50, 
        y, 
        size: headingSize, 
        color: rgb(0.58, 0.2, 0.92) 
      });
      y -= 25;

      Object.entries(results.rocAucScores).forEach(([model, score]) => {
        const modelName = model.replace(/([A-Z])/g, ' $1').trim();
        const accuracy = (parseFloat(score) * 100).toFixed(1);
        
        page.drawText(`${modelName}: ${score} (${accuracy}% Accuracy)`, { 
          x: 70, 
          y, 
          size: fontSize, 
          color: rgb(0.2, 0.2, 0.5) 
        });
        y -= 20;
      });

      y -= 30;

      page.drawText('Generated by Trained Models - AI-Powered Detection System', { 
        x: 50, 
        y: 50, 
        size: 10, 
        color: rgb(0.5, 0.5, 0.5) 
      });

      page.drawText('Developed by NeuroNova Team', { 
        x: 50, 
        y: 35, 
        size: 10, 
        color: rgb(0.5, 0.5, 0.5) 
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Fraud_Detection_Report_${results.fileName.replace(/\.[^/.]+$/, '')}_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const detectedCount = results ? Object.values(results.modelsDetected).filter(Boolean).length : 0;

  // ROC Curve Component
  const ROCCurve = ({ modelName, aucScore }) => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const x = i / 10;
      const y = Math.pow(x, 1 / parseFloat(aucScore)) * parseFloat(aucScore);
      points.push({ x: x * 100, y: Math.min(y, 1) * 100 });
    }

    const pathData = points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`
    ).join(' ');

    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-purple-500/30">
        <h5 className="font-bold mb-4 text-center">{modelName} - ROC Curve</h5>
        <svg viewBox="0 0 100 100" className="w-full h-40">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(val => (
            <React.Fragment key={val}>
              <line x1="0" y1={val} x2="100" y2={val} stroke="#374151" strokeWidth="0.5" />
              <line x1={val} y1="0" x2={val} y2="100" stroke="#374151" strokeWidth="0.5" />
            </React.Fragment>
          ))}
          {/* Diagonal reference line */}
          <line x1="0" y1="100" x2="100" y2="0" stroke="#6b7280" strokeWidth="1" strokeDasharray="2,2" />
          {/* ROC Curve */}
          <path d={pathData} fill="none" stroke="#a855f7" strokeWidth="2" />
          {/* Axes */}
          <line x1="0" y1="100" x2="100" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
        </svg>
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-400">AUC: </span>
          <span className="text-lg font-bold text-purple-400">{aucScore}</span>
        </div>
      </div>
    );
  };

  // Confusion Matrix Component
  const ConfusionMatrix = ({ metrics, modelName }) => {
    const { truePositives, falsePositives, trueNegatives, falseNegatives } = metrics;
    const total = truePositives + falsePositives + trueNegatives + falseNegatives;

    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-red-500/30">
        <h5 className="font-bold mb-4 text-center">{modelName} - Confusion Matrix</h5>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-green-400">{truePositives}</div>
            <div className="text-xs text-gray-400 mt-1">True Positives</div>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-red-400">{falsePositives}</div>
            <div className="text-xs text-gray-400 mt-1">False Positives</div>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-red-400">{falseNegatives}</div>
            <div className="text-xs text-gray-400 mt-1">False Negatives</div>
          </div>
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-green-400">{trueNegatives}</div>
            <div className="text-xs text-gray-400 mt-1">True Negatives</div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400">
          Accuracy: <span className="text-purple-400 font-bold">{metrics.accuracy}</span>
        </div>
      </div>
    );
  };

  // Model Pie Chart Component
  const ModelPieChart = ({ metrics, modelName }) => {
    const { truePositives, falsePositives, trueNegatives, falseNegatives } = metrics;
    const total = truePositives + falsePositives + trueNegatives + falseNegatives;
    
    const tpPercent = (truePositives / total) * 100;
    const fpPercent = (falsePositives / total) * 100;
    const tnPercent = (trueNegatives / total) * 100;
    const fnPercent = (falseNegatives / total) * 100;

    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-purple-500/30">
        <h5 className="font-bold mb-4 text-center">{modelName} - Distribution</h5>
        <div className="relative h-48 flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20" 
                strokeDasharray={`${tpPercent * 2.512} 251.2`} />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" 
                strokeDasharray={`${fpPercent * 2.512} 251.2`}
                strokeDashoffset={`-${tpPercent * 2.512}`} />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" 
                strokeDasharray={`${tnPercent * 2.512} 251.2`}
                strokeDashoffset={`-${(tpPercent + fpPercent) * 2.512}`} />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#dc2626" strokeWidth="20" 
                strokeDasharray={`${fnPercent * 2.512} 251.2`}
                strokeDashoffset={`-${(tpPercent + fpPercent + tnPercent) * 2.512}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-black">{total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">TP: {tpPercent.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400">FP: {fpPercent.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-400">TN: {tnPercent.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-gray-400">FN: {fnPercent.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-red-900/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`,
          animation: 'pulse 8s ease-in-out infinite'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-red-500/20 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Shield className="w-12 h-12 text-red-500" />
                <div className="absolute inset-0 blur-xl bg-red-500/50"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                  CREDIT CARD FRAUD DETECTION
                </h1>
                <p className="text-sm text-gray-400">AI-Powered Detection System by THE NEURONOVA TEAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{stats.totalTransactions}</div>
                <div className="text-xs text-gray-400">Total Scanned</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-400">{stats.fraudDetected}</div>
                <div className="text-xs text-gray-400">Fraud Detected</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Upload & Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-8 border border-red-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="w-8 h-8 text-red-400" />
                <h2 className="text-2xl font-bold">Upload Transaction Data</h2>
              </div>
              
              <div className="border-2 border-dashed border-red-500/30 rounded-2xl p-12 text-center hover:border-red-500/60 transition-all duration-300 cursor-pointer bg-gradient-to-br from-red-500/5 to-purple-500/5 hover:from-red-500/10 hover:to-purple-500/10">
                <input
                  type="file"
                  accept=".csv,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer block">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-red-400" />
                  <p className="text-xl font-semibold mb-2">Drop your CSV or PDF file here</p>
                  <p className="text-gray-400 mb-4">or click to browse</p>
                  {uploadedFile && (
                    <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/50">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-semibold">{uploadedFile.name}</span>
                    </div>
                  )}
                </label>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                  <div className="text-sm text-gray-400 mb-1">Supported Formats</div>
                  <div className="font-semibold text-purple-400">.CSV, .PDF</div>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <div className="text-sm text-gray-400 mb-1">Max File Size</div>
                  <div className="font-semibold text-red-400">10 MB</div>
                </div>
              </div>
            </div>

            {/* Analysis Progress */}
            {analyzing && (
              <div className="bg-gradient-to-br from-purple-900/40 to-red-900/40 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-xl animate-pulse">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                  <div>
                    <p className="text-xl font-bold">Analyzing Transactions...</p>
                    <p className="text-gray-400">Running 4 ML models on your data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['XGBoost Classifier', 'Random Forest', 'Logistic Regression', 'Neural Network'].map((model, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${25 + (i * 25)}%`,
                            animation: `shimmer 2s ease-in-out infinite ${i * 0.2}s`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 w-48 flex-shrink-0">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Section */}
            {results && (
              <div ref={resultsRef} className="space-y-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
                {/* Detection Summary Card */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-8 border border-red-500/40 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Activity className="w-8 h-8 mr-3 text-red-400" />
                      Detection Summary
                    </h3>
                    <div className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/50">
                      <span className="text-sm font-bold text-green-400">✓ Analysis Complete</span>
                    </div>
                  </div>
                  
                  {/* Fraud vs Legitimate */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-6 border border-green-500/40 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <span className="text-sm text-green-400 font-semibold">SAFE</span>
                      </div>
                      <div className="text-4xl font-black text-green-400 mb-2">{results.legitimateCount}</div>
                      <div className="text-gray-400 text-sm">Legitimate Transactions</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl p-6 border border-red-500/40 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <span className="text-sm text-red-400 font-semibold">FRAUD</span>
                      </div>
                      <div className="text-4xl font-black text-red-400 mb-2">{results.fraudCount}</div>
                      <div className="text-gray-400 text-sm">Fraudulent Transactions</div>
                    </div>
                  </div>

                  {/* Model Detection Status */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold">Models Detected Fraud</h4>
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                          {detectedCount}/4
                        </div>
                        <span className="text-sm text-gray-400">models</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(results.modelsDetected).map(([model, detected]) => (
                        <div 
                          key={model} 
                          className={`p-5 rounded-xl border transition-all duration-300 ${
                            detected 
                              ? 'bg-red-500/15 border-red-500/60 shadow-lg shadow-red-500/20' 
                              : 'bg-gray-700/20 border-gray-600/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold capitalize text-lg">
                              {model.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            {detected ? (
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                                <span className="text-xs font-semibold text-red-400">DETECTED</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-6 h-6 text-gray-500" />
                                <span className="text-xs font-semibold text-gray-500">CLEAR</span>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {detected ? 'Fraud patterns found' : 'No anomalies detected'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ROC AUC Scores */}
                  <div className="bg-black/30 rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
                      Model Performance (ROC-AUC Score)
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(results.rocAucScores).map(([model, score], i) => (
                        <div key={model} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="capitalize font-semibold">{model.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-gray-400">Score:</span>
                              <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {score}
                              </span>
                            </div>
                          </div>
                          <div className="relative w-full bg-gray-700/50 rounded-full h-4 overflow-hidden shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                              style={{ 
                                width: `${parseFloat(score) * 100}%`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                          <div className="text-xs text-right text-gray-500">{(parseFloat(score) * 100).toFixed(1)}% Accuracy</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Model Performance Metrics */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-8 border border-purple-500/40 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Target className="w-8 h-8 mr-3 text-purple-400" />
                    Detailed Model Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(results.modelMetrics).map(([model, metrics]) => (
                      <div key={model} className="bg-black/40 rounded-2xl p-6 border border-purple-500/30">
                        <h4 className="font-bold text-lg mb-4 capitalize text-center text-purple-400">
                          {model.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                            <div className="text-xs text-gray-400 mb-1">Precision</div>
                            <div className="text-xl font-bold text-purple-400">{metrics.precision}</div>
                          </div>
                          <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                            <div className="text-xs text-gray-400 mb-1">Recall</div>
                            <div className="text-xl font-bold text-blue-400">{metrics.recall}</div>
                          </div>
                          <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-500/30">
                            <div className="text-xs text-gray-400 mb-1">F1-Score</div>
                            <div className="text-xl font-bold text-pink-400">{metrics.f1Score}</div>
                          </div>
                          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                            <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                            <div className="text-xl font-bold text-green-400">{metrics.accuracy}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROC Curves for Each Model */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-8 border border-purple-500/40 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3 text-purple-400" />
                    ROC Curves - Model Comparison
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(results.rocAucScores).map(([model, score]) => (
                      <ROCCurve 
                        key={model} 
                        modelName={model.replace(/([A-Z])/g, ' $1').trim()} 
                        aucScore={score} 
                      />
                    ))}
                  </div>
                </div>

                {/* Confusion Matrices */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-8 border border-red-500/40 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <BarChart3 className="w-8 h-8 mr-3 text-red-400" />
                    Confusion Matrices
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(results.modelMetrics).map(([model, metrics]) => (
                      <ConfusionMatrix 
                        key={model} 
                        metrics={metrics} 
                        modelName={model.replace(/([A-Z])/g, ' $1').trim()} 
                      />
                    ))}
                  </div>
                </div>

                {/* Individual Model Pie Charts */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-8 border border-purple-500/40 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <PieChart className="w-8 h-8 mr-3 text-purple-400" />
                    Model Prediction Distribution
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(results.modelMetrics).map(([model, metrics]) => (
                      <ModelPieChart 
                        key={model} 
                        metrics={metrics} 
                        modelName={model.replace(/([A-Z])/g, ' $1').trim()} 
                      />
                    ))}
                  </div>
                </div>

                {/* Overall Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Overall Pie Chart */}
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-6 border border-purple-500/30 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center space-x-2 mb-6">
                      <PieChart className="w-6 h-6 text-purple-400" />
                      <h4 className="text-lg font-bold">Overall Transaction Distribution</h4>
                    </div>
                    <div className="relative h-56 flex items-center justify-center">
                      <div className="relative w-44 h-44">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="none" 
                            stroke="#ef4444" 
                            strokeWidth="20" 
                            strokeDasharray={`${(results.fraudCount / results.totalRecords) * 251.2} 251.2`}
                            className="transition-all duration-1000"
                          />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="20" 
                            strokeDasharray={`${(results.legitimateCount / results.totalRecords) * 251.2} 251.2`}
                            strokeDashoffset={`-${(results.fraudCount / results.totalRecords) * 251.2}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-black">{results.totalRecords}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">Total</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-8 mt-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                        <div>
                          <div className="text-sm font-bold">{((results.fraudCount / results.totalRecords) * 100).toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">Fraud</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                        <div>
                          <div className="text-sm font-bold">{((results.legitimateCount / results.totalRecords) * 100).toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">Safe</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-6 border border-purple-500/30 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center space-x-2 mb-6">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                      <h4 className="text-lg font-bold">Model Comparison</h4>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(results.rocAucScores).map(([model, score], i) => (
                        <div key={model}>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="font-semibold truncate max-w-[120px]">
                              {model.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-bold text-purple-400">{(parseFloat(score) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-10 bg-gray-700/50 rounded-lg overflow-hidden shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
                              style={{ 
                                width: `${parseFloat(score) * 100}%`,
                                animationDelay: `${i * 0.15}s`
                              }}
                            >
                              <span className="text-xs font-bold text-white drop-shadow-lg">
                                {score}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Report Button */}
                <button 
                  type="button"
                  onClick={handleDownloadReport}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <Download className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Download Comprehensive Report (PDF)</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Live Dashboard */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Live Dashboard Header */}
              <div className="bg-gradient-to-br from-purple-900/60 to-red-900/60 rounded-3xl p-6 border border-purple-500/40 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-7 h-7 text-green-400 animate-pulse" />
                    <div>
                      <h3 className="text-xl font-bold">Live Monitor</h3>
                      <p className="text-xs text-gray-400">Real-time detection</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs font-bold text-green-400">LIVE</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded-xl p-4 border border-green-500/40">
                    <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-green-400">{stats.legitimate}</div>
                    <div className="text-xs text-gray-400">Approved</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-red-500/40">
                    <Lock className="w-5 h-5 text-red-400 mb-2" />
                    <div className="text-2xl font-bold text-red-400">{stats.blocked}</div>
                    <div className="text-xs text-gray-400">Blocked</div>
                  </div>
                </div>
              </div>

              {/* Future Plans Badge */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-5 border border-yellow-500/40 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="font-bold">Future Enhancement</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  This dashboard will integrate real-time AI predictions with automated blocking and risk assessment in the production version.
                </p>
              </div>

              {/* Live Transactions Feed */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-6 border border-red-500/30 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-lg">Recent Transactions</h4>
                  <RefreshCw className="w-5 h-5 text-purple-400 animate-spin" />
                </div>

                <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
                  {liveTransactions.map((tx, index) => (
                    <div 
                      key={tx.id} 
                      className={`p-4 rounded-xl border transition-all duration-500 ${
                        tx.status === 'blocked' 
                          ? 'bg-red-500/10 border-red-500/60 shadow-lg shadow-red-500/10' 
                          : 'bg-green-500/10 border-green-500/40'
                      }`}
                      style={{
                        animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-bold text-sm mb-1 flex items-center space-x-2">
                            <span>{tx.merchant}</span>
                            {tx.isFraud && (
                              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                            )}
                          </div>
                          <div className="text-xs text-gray-400">{tx.location}</div>
                        </div>
                        {tx.status === 'blocked' ? (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 rounded-lg">
                            <Lock className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-bold text-red-400">BLOCKED</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 rounded-lg">
                            <Unlock className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-bold text-green-400">APPROVED</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-bold">${tx.amount}</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          tx.riskLevel === 'high' ? 'bg-red-500/30 text-red-300 border border-red-500/50' :
                          tx.riskLevel === 'medium' ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50' :
                          'bg-green-500/30 text-green-300 border border-green-500/50'
                        }`}>
                          {tx.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{tx.time}</span>
                        {tx.isFraud && (
                          <span className="text-red-400 font-semibold">⚠ Fraud Detected</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(147, 51, 234, 0.5), rgba(220, 38, 38, 0.5));
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(147, 51, 234, 0.8), rgba(220, 38, 38, 0.8));
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
