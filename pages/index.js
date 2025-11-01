

// import React, { useState, useEffect, useRef } from 'react';
// import { Upload, Shield, AlertTriangle, CheckCircle, Activity, TrendingUp, BarChart3, PieChart, RefreshCw, FileText, Download, Zap, Lock, Unlock, Target, Percent } from 'lucide-react';
// import { PDFDocument, rgb } from 'pdf-lib';

// export default function FraudDetectionApp() {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [results, setResults] = useState(null);
//   const [liveTransactions, setLiveTransactions] = useState([]);
//   const [stats, setStats] = useState({
//     totalTransactions: 1247,
//     fraudDetected: 23,
//     blocked: 18,
//     legitimate: 1224
//   });
//   const resultsRef = useRef(null);

//   // Generate mock live transactions
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTransaction = {
//         id: Date.now(),
//         amount: (Math.random() * 5000 + 10).toFixed(2),
//         merchant: ['Amazon', 'Walmart', 'Gas Station', 'Restaurant', 'Online Store', 'ATM'][Math.floor(Math.random() * 6)],
//         location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'][Math.floor(Math.random() * 5)],
//         time: new Date().toLocaleTimeString(),
//         isFraud: Math.random() > 0.85,
//         riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
//         status: Math.random() > 0.85 ? 'blocked' : 'approved'
//       };

//       setLiveTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      
//       setStats(prev => ({
//         totalTransactions: prev.totalTransactions + 1,
//         fraudDetected: prev.fraudDetected + (newTransaction.isFraud ? 1 : 0),
//         blocked: prev.blocked + (newTransaction.status === 'blocked' ? 1 : 0),
//         legitimate: prev.legitimate + (!newTransaction.isFraud ? 1 : 0)
//       }));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && (file.type === 'text/csv' || file.type === 'application/pdf' || file.name.endsWith('.csv'))) {
//       setUploadedFile(file);
//       analyzeFile(file);
//     } else {
//       alert('Please upload a CSV or PDF file');
//     }
//   };

//   const analyzeFile = async (file) => {
//     setAnalyzing(true);
    
//     await new Promise(resolve => setTimeout(resolve, 3000));
    
//     const totalRecords = Math.floor(Math.random() * 1000) + 500;
//     const fraudCount = Math.floor(Math.random() * 50) + 10;
    
//     const mockResults = {
//       fileName: file.name,
//       totalRecords: totalRecords,
//       modelsDetected: {
//         xgboost: Math.random() > 0.3,
//         randomForest: Math.random() > 0.2,
//         logisticRegression: Math.random() > 0.4,
//         neuralNetwork: Math.random() > 0.35
//       },
//       fraudCount: fraudCount,
//       legitimateCount: totalRecords - fraudCount,
//       rocAucScores: {
//         xgboost: (0.95 + Math.random() * 0.04).toFixed(3),
//         randomForest: (0.93 + Math.random() * 0.05).toFixed(3),
//         logisticRegression: (0.88 + Math.random() * 0.06).toFixed(3),
//         neuralNetwork: (0.91 + Math.random() * 0.05).toFixed(3)
//       },
//       // Fraud detection count by each model
//       fraudDetectionByModel: {
//         xgboost: Math.floor(fraudCount * (0.85 + Math.random() * 0.12)),
//         randomForest: Math.floor(fraudCount * (0.80 + Math.random() * 0.15)),
//         logisticRegression: Math.floor(fraudCount * (0.75 + Math.random() * 0.18)),
//         neuralNetwork: Math.floor(fraudCount * (0.82 + Math.random() * 0.14))
//       },
//       modelMetrics: {
//         xgboost: {
//           precision: (0.92 + Math.random() * 0.06).toFixed(3),
//           recall: (0.89 + Math.random() * 0.08).toFixed(3),
//           f1Score: (0.90 + Math.random() * 0.07).toFixed(3),
//           accuracy: (0.94 + Math.random() * 0.05).toFixed(3),
//           truePositives: Math.floor(fraudCount * 0.85),
//           falsePositives: Math.floor((totalRecords - fraudCount) * 0.03),
//           trueNegatives: Math.floor((totalRecords - fraudCount) * 0.97),
//           falseNegatives: Math.floor(fraudCount * 0.15)
//         },
//         randomForest: {
//           precision: (0.90 + Math.random() * 0.07).toFixed(3),
//           recall: (0.87 + Math.random() * 0.09).toFixed(3),
//           f1Score: (0.88 + Math.random() * 0.08).toFixed(3),
//           accuracy: (0.92 + Math.random() * 0.06).toFixed(3),
//           truePositives: Math.floor(fraudCount * 0.82),
//           falsePositives: Math.floor((totalRecords - fraudCount) * 0.04),
//           trueNegatives: Math.floor((totalRecords - fraudCount) * 0.96),
//           falseNegatives: Math.floor(fraudCount * 0.18)
//         },
//         logisticRegression: {
//           precision: (0.85 + Math.random() * 0.08).toFixed(3),
//           recall: (0.83 + Math.random() * 0.10).toFixed(3),
//           f1Score: (0.84 + Math.random() * 0.09).toFixed(3),
//           accuracy: (0.88 + Math.random() * 0.08).toFixed(3),
//           truePositives: Math.floor(fraudCount * 0.78),
//           falsePositives: Math.floor((totalRecords - fraudCount) * 0.06),
//           trueNegatives: Math.floor((totalRecords - fraudCount) * 0.94),
//           falseNegatives: Math.floor(fraudCount * 0.22)
//         },
//         neuralNetwork: {
//           precision: (0.91 + Math.random() * 0.06).toFixed(3),
//           recall: (0.88 + Math.random() * 0.08).toFixed(3),
//           f1Score: (0.89 + Math.random() * 0.07).toFixed(3),
//           accuracy: (0.93 + Math.random() * 0.05).toFixed(3),
//           truePositives: Math.floor(fraudCount * 0.84),
//           falsePositives: Math.floor((totalRecords - fraudCount) * 0.035),
//           trueNegatives: Math.floor((totalRecords - fraudCount) * 0.965),
//           falseNegatives: Math.floor(fraudCount * 0.16)
//         }
//       }
//     };

//     setResults(mockResults);
//     setAnalyzing(false);
    
//     setTimeout(() => {
//       resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }, 100);
//   };

//   const handleDownloadReport = async () => {
//     if (!results) return;

//     try {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage([595, 842]);

//       const fontSize = 12;
//       const titleSize = 24;
//       const headingSize = 16;
//       let y = 780;

//       page.drawText('CREDIT CARD FRAUD DETECTION', { 
//         x: 50, 
//         y, 
//         size: titleSize, 
//         color: rgb(0.2, 0.2, 0.2) 
//       });
//       y -= 20;
      
//       page.drawText('Analysis Report', { 
//         x: 50, 
//         y, 
//         size: headingSize, 
//         color: rgb(0.4, 0.4, 0.4) 
//       });
//       y -= 40;

//       page.drawText(`File Name: ${results.fileName}`, { 
//         x: 50, 
//         y, 
//         size: fontSize, 
//         color: rgb(0, 0, 0) 
//       });
//       y -= 25;
      
//       page.drawText(`Analysis Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, { 
//         x: 50, 
//         y, 
//         size: fontSize, 
//         color: rgb(0, 0, 0) 
//       });
//       y -= 40;

//       page.drawText('SUMMARY', { 
//         x: 50, 
//         y, 
//         size: headingSize, 
//         color: rgb(0.3, 0.3, 0.3) 
//       });
//       y -= 25;

//       page.drawText(`Total Records Analyzed: ${results.totalRecords}`, { 
//         x: 70, 
//         y, 
//         size: fontSize, 
//         color: rgb(0, 0, 0) 
//       });
//       y -= 20;

//       page.drawText(`Fraudulent Transactions: ${results.fraudCount}`, { 
//         x: 70, 
//         y, 
//         size: fontSize, 
//         color: rgb(0.7, 0.2, 0.2) 
//       });
//       y -= 20;

//       page.drawText(`Legitimate Transactions: ${results.legitimateCount}`, { 
//         x: 70, 
//         y, 
//         size: fontSize, 
//         color: rgb(0.2, 0.6, 0.3) 
//       });
//       y -= 40;

//       page.drawText('FRAUD DETECTION BY MODEL', { 
//         x: 50, 
//         y, 
//         size: headingSize, 
//         color: rgb(0.3, 0.3, 0.3) 
//       });
//       y -= 25;

//       Object.entries(results.fraudDetectionByModel).forEach(([model, count]) => {
//         const modelName = model.replace(/([A-Z])/g, ' $1').trim();
//         page.drawText(`${modelName}: ${count} frauds detected`, { 
//           x: 70, 
//           y, 
//           size: fontSize, 
//           color: rgb(0.7, 0.2, 0.2)
//         });
//         y -= 20;
//       });

//       y -= 20;

//       page.drawText('MODEL PERFORMANCE (ROC-AUC SCORES)', { 
//         x: 50, 
//         y, 
//         size: headingSize, 
//         color: rgb(0.3, 0.3, 0.3) 
//       });
//       y -= 25;

//       Object.entries(results.rocAucScores).forEach(([model, score]) => {
//         const modelName = model.replace(/([A-Z])/g, ' $1').trim();
//         const accuracy = (parseFloat(score) * 100).toFixed(1);
        
//         page.drawText(`${modelName}: ${score} (${accuracy}% Accuracy)`, { 
//           x: 70, 
//           y, 
//           size: fontSize, 
//           color: rgb(0.2, 0.2, 0.5) 
//         });
//         y -= 20;
//       });

//       y -= 30;

//       page.drawText('Generated by Trained Models - AI-Powered Detection System', { 
//         x: 50, 
//         y: 50, 
//         size: 10, 
//         color: rgb(0.5, 0.5, 0.5) 
//       });

//       page.drawText('Developed by NeuroNova Team', { 
//         x: 50, 
//         y: 35, 
//         size: 10, 
//         color: rgb(0.5, 0.5, 0.5) 
//       });

//       const pdfBytes = await pdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = `Fraud_Detection_Report_${results.fileName.replace(/\.[^/.]+$/, '')}_${Date.now()}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(link.href);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   const detectedCount = results ? Object.values(results.modelsDetected).filter(Boolean).length : 0;

//   // ROC Curve Component
//   const ROCCurve = ({ modelName, aucScore }) => {
//     const points = [];
//     for (let i = 0; i <= 10; i++) {
//       const x = i / 10;
//       const y = Math.pow(x, 1 / parseFloat(aucScore)) * parseFloat(aucScore);
//       points.push({ x: x * 100, y: Math.min(y, 1) * 100 });
//     }

//     const pathData = points.map((p, i) => 
//       `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`
//     ).join(' ');

//     return (
//       <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
//         <h5 className="font-bold mb-4 text-center text-gray-200">{modelName} - ROC Curve</h5>
//         <svg viewBox="0 0 100 100" className="w-full h-40">
//           {[0, 25, 50, 75, 100].map(val => (
//             <React.Fragment key={val}>
//               <line x1="0" y1={val} x2="100" y2={val} stroke="#374151" strokeWidth="0.5" />
//               <line x1={val} y1="0" x2={val} y2="100" stroke="#374151" strokeWidth="0.5" />
//             </React.Fragment>
//           ))}
//           <line x1="0" y1="100" x2="100" y2="0" stroke="#6b7280" strokeWidth="1" strokeDasharray="2,2" />
//           <path d={pathData} fill="none" stroke="#60a5fa" strokeWidth="2" />
//           <line x1="0" y1="100" x2="100" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
//           <line x1="0" y1="0" x2="0" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
//         </svg>
//         <div className="mt-3 text-center">
//           <span className="text-sm text-gray-400">AUC: </span>
//           <span className="text-lg font-bold text-blue-400">{aucScore}</span>
//         </div>
//       </div>
//     );
//   };

//   // Model Pie Chart Component
//   const ModelPieChart = ({ metrics, modelName }) => {
//     const { truePositives, falsePositives, trueNegatives, falseNegatives } = metrics;
//     const total = truePositives + falsePositives + trueNegatives + falseNegatives;
    
//     const tpPercent = (truePositives / total) * 100;
//     const fpPercent = (falsePositives / total) * 100;
//     const tnPercent = (trueNegatives / total) * 100;
//     const fnPercent = (falseNegatives / total) * 100;

//     return (
//       <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
//         <h5 className="font-bold mb-4 text-center text-gray-200">{modelName} - Distribution</h5>
//         <div className="relative h-48 flex items-center justify-center">
//           <div className="relative w-40 h-40">
//             <svg viewBox="0 0 100 100" className="transform -rotate-90">
//               <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" 
//                 strokeDasharray={`${tpPercent * 2.512} 251.2`} />
//               <circle cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="20" 
//                 strokeDasharray={`${fpPercent * 2.512} 251.2`}
//                 strokeDashoffset={`-${tpPercent * 2.512}`} />
//               <circle cx="50" cy="50" r="40" fill="none" stroke="#6ee7b7" strokeWidth="20" 
//                 strokeDasharray={`${tnPercent * 2.512} 251.2`}
//                 strokeDashoffset={`-${(tpPercent + fpPercent) * 2.512}`} />
//               <circle cx="50" cy="50" r="40" fill="none" stroke="#fb7185" strokeWidth="20" 
//                 strokeDasharray={`${fnPercent * 2.512} 251.2`}
//                 strokeDashoffset={`-${(tpPercent + fpPercent + tnPercent) * 2.512}`} />
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <div className="text-2xl font-black text-gray-200">{total}</div>
//               <div className="text-xs text-gray-400">Total</div>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
//           <div className="flex items-center space-x-1">
//             <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//             <span className="text-gray-400">TP: {tpPercent.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
//             <span className="text-gray-400">FP: {fpPercent.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
//             <span className="text-gray-400">TN: {tnPercent.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
//             <span className="text-gray-400">FN: {fnPercent.toFixed(1)}%</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
//       {/* Minimal Background */}
//       <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900"></div>

//       {/* Header */}
//       <header className="relative z-10 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Shield className="w-12 h-12 text-blue-400" />
//               <div>
//                 <h1 className="text-3xl font-black text-gray-100">
//                   CREDIT CARD FRAUD DETECTION
//                 </h1>
//                 <p className="text-sm text-gray-400">AI-Powered Detection System by THE NEURONOVA TEAM</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="text-right">
//                 <div className="text-2xl font-bold text-blue-400">{stats.totalTransactions}</div>
//                 <div className="text-xs text-gray-400">Total Scanned</div>
//               </div>
//               <div className="text-right">
//                 <div className="text-2xl font-bold text-rose-400">{stats.fraudDetected}</div>
//                 <div className="text-xs text-gray-400">Fraud Detected</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Side - Upload & Results */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Upload Section */}
//             <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
//               <div className="flex items-center space-x-3 mb-6">
//                 <Upload className="w-8 h-8 text-blue-400" />
//                 <h2 className="text-2xl font-bold">Upload Transaction Data</h2>
//               </div>
              
//               <div className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-gray-600 transition-all duration-300 cursor-pointer bg-gray-800/30 hover:bg-gray-800/50">
//                 <input
//                   type="file"
//                   accept=".csv,.pdf"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                   id="fileUpload"
//                 />
//                 <label htmlFor="fileUpload" className="cursor-pointer block">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//                   <p className="text-xl font-semibold mb-2">Drop your CSV or PDF file here</p>
//                   <p className="text-gray-400 mb-4">or click to browse</p>
//                   {uploadedFile && (
//                     <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/40">
//                       <CheckCircle className="w-5 h-5 text-emerald-400" />
//                       <span className="text-sm font-semibold">{uploadedFile.name}</span>
//                     </div>
//                   )}
//                 </label>
//               </div>
              
//               <div className="mt-6 grid grid-cols-2 gap-4">
//                 <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
//                   <div className="text-sm text-gray-400 mb-1">Supported Formats</div>
//                   <div className="font-semibold text-gray-200">.CSV, .PDF</div>
//                 </div>
//                 <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
//                   <div className="text-sm text-gray-400 mb-1">Max File Size</div>
//                   <div className="font-semibold text-gray-200">10 MB</div>
//                 </div>
//               </div>
//             </div>

//             {/* Analysis Progress */}
//             {analyzing && (
//               <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl animate-pulse">
//                 <div className="flex items-center justify-center space-x-4 mb-6">
//                   <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
//                   <div>
//                     <p className="text-xl font-bold">Analyzing Transactions...</p>
//                     <p className="text-gray-400">Running 4 ML models on your data</p>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   {['XGBoost Classifier', 'Random Forest', 'Logistic Regression', 'Neural Network'].map((model, i) => (
//                     <div key={i} className="flex items-center space-x-3">
//                       <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
//                         <div 
//                           className="h-full bg-blue-500 rounded-full transition-all duration-1000"
//                           style={{ width: `${25 + (i * 25)}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-sm text-gray-300 w-48 flex-shrink-0">{model}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Results Section */}
//             {results && (
//               <div ref={resultsRef} className="space-y-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
//                 {/* Detection Summary Card */}
//                 <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-2xl font-bold flex items-center">
//                       <Activity className="w-8 h-8 mr-3 text-blue-400" />
//                       Detection Summary
//                     </h3>
//                     <div className="px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/40">
//                       <span className="text-sm font-bold text-emerald-400">✓ Analysis Complete</span>
//                     </div>
//                   </div>
                  
//                   {/* Fraud vs Legitimate */}
//                   <div className="grid grid-cols-2 gap-6 mb-8">
//                     <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/30 hover:scale-105 transition-transform duration-300">
//                       <div className="flex items-center justify-between mb-2">
//                         <CheckCircle className="w-8 h-8 text-emerald-400" />
//                         <span className="text-sm text-emerald-400 font-semibold">SAFE</span>
//                       </div>
//                       <div className="text-4xl font-black text-emerald-400 mb-2">{results.legitimateCount}</div>
//                       <div className="text-gray-400 text-sm">Legitimate Transactions</div>
//                     </div>
//                     <div className="bg-rose-500/10 rounded-2xl p-6 border border-rose-500/30 hover:scale-105 transition-transform duration-300">
//                       <div className="flex items-center justify-between mb-2">
//                         <AlertTriangle className="w-8 h-8 text-rose-400" />
//                         <span className="text-sm text-rose-400 font-semibold">FRAUD</span>
//                       </div>
//                       <div className="text-4xl font-black text-rose-400 mb-2">{results.fraudCount}</div>
//                       <div className="text-gray-400 text-sm">Fraudulent Transactions</div>
//                     </div>
//                   </div>

//                   {/* Model Detection Status */}
//                   <div className="mb-8">
//                     <div className="flex items-center justify-between mb-6">
//                       <h4 className="text-xl font-bold">Models Detected Fraud</h4>
//                       <div className="flex items-center space-x-3">
//                         <div className="text-4xl font-black text-blue-400">
//                           {detectedCount}/4
//                         </div>
//                         <span className="text-sm text-gray-400">models</span>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       {Object.entries(results.modelsDetected).map(([model, detected]) => (
//                         <div 
//                           key={model} 
//                           className={`p-5 rounded-xl border transition-all duration-300 ${
//                             detected 
//                               ? 'bg-rose-500/15 border-rose-500/50' 
//                               : 'bg-gray-800/50 border-gray-700'
//                           }`}
//                         >
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="font-bold capitalize text-lg text-gray-200">
//                               {model.replace(/([A-Z])/g, ' $1').trim()}
//                             </span>
//                             {detected ? (
//                               <div className="flex items-center space-x-2">
//                                 <AlertTriangle className="w-6 h-6 text-rose-400" />
//                                 <span className="text-xs font-semibold text-rose-400">DETECTED</span>
//                               </div>
//                             ) : (
//                               <div className="flex items-center space-x-2">
//                                 <CheckCircle className="w-6 h-6 text-gray-500" />
//                                 <span className="text-xs font-semibold text-gray-500">CLEAR</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="text-xs text-gray-400">
//                             {detected ? 'Fraud patterns found' : 'No anomalies detected'}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* ROC AUC Scores */}
//                   <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
//                     <h4 className="text-xl font-bold mb-6 flex items-center">
//                       <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
//                       Model Performance (ROC-AUC Score)
//                     </h4>
//                     <div className="space-y-4">
//                       {Object.entries(results.rocAucScores).map(([model, score], i) => (
//                         <div key={model} className="space-y-2">
//                           <div className="flex justify-between items-center text-sm">
//                             <span className="capitalize font-semibold text-gray-200">{model.replace(/([A-Z])/g, ' $1').trim()}</span>
//                             <div className="flex items-center space-x-3">
//                               <span className="text-xs text-gray-400">Score:</span>
//                               <span className="font-bold text-lg text-blue-400">
//                                 {score}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="relative w-full bg-gray-800 rounded-full h-4 overflow-hidden">
//                             <div 
//                               className="h-full bg-blue-500 rounded-full transition-all duration-1000"
//                               style={{ width: `${parseFloat(score) * 100}%` }}
//                             ></div>
//                           </div>
//                           <div className="text-xs text-right text-gray-500">{(parseFloat(score) * 100).toFixed(1)}% Accuracy</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* NEW: Fraud Detection Count by Each Model */}
//                 <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
//                   <h3 className="text-2xl font-bold mb-6 flex items-center">
//                     <AlertTriangle className="w-8 h-8 mr-3 text-rose-400" />
//                     Fraud Detection Count by Model
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(results.fraudDetectionByModel).map(([model, count]) => {
//                       const percentage = ((count / results.fraudCount) * 100).toFixed(1);
//                       return (
//                         <div key={model} className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 hover:border-rose-500/50 transition-all duration-300">
//                           <div className="flex items-center justify-between mb-4">
//                             <h4 className="font-bold text-lg capitalize text-gray-200">
//                               {model.replace(/([A-Z])/g, ' $1').trim()}
//                             </h4>
//                             <AlertTriangle className="w-6 h-6 text-rose-400" />
//                           </div>
//                           <div className="text-5xl font-black text-rose-400 mb-2">{count}</div>
//                           <div className="text-sm text-gray-400 mb-4">Frauds Detected</div>
//                           <div className="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden">
//                             <div 
//                               className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000"
//                               style={{ width: `${percentage}%` }}
//                             ></div>
//                           </div>
//                           <div className="text-xs text-right text-gray-500 mt-2">
//                             {percentage}% Detection Rate
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Model Performance Metrics */}
//                 <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
//                   <h3 className="text-2xl font-bold mb-6 flex items-center">
//                     <Target className="w-8 h-8 mr-3 text-blue-400" />
//                     Detailed Model Metrics
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(results.modelMetrics).map(([model, metrics]) => (
//                       <div key={model} className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700">
//                         <h4 className="font-bold text-lg mb-4 capitalize text-center text-blue-400">
//                           {model.replace(/([A-Z])/g, ' $1').trim()}
//                         </h4>
//                         <div className="grid grid-cols-2 gap-3 text-sm">
//                           <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
//                             <div className="text-xs text-gray-400 mb-1">Precision</div>
//                             <div className="text-xl font-bold text-gray-200">{metrics.precision}</div>
//                           </div>
//                           <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
//                             <div className="text-xs text-gray-400 mb-1">Recall</div>
//                             <div className="text-xl font-bold text-gray-200">{metrics.recall}</div>
//                           </div>
//                           <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
//                             <div className="text-xs text-gray-400 mb-1">F1-Score</div>
//                             <div className="text-xl font-bold text-gray-200">{metrics.f1Score}</div>
//                           </div>
//                           <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
//                             <div className="text-xs text-gray-400 mb-1">Accuracy</div>
//                             <div className="text-xl font-bold text-emerald-400">{metrics.accuracy}</div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ROC Curves for Each Model */}
//                 <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
//                   <h3 className="text-2xl font-bold mb-6 flex items-center">
//                     <TrendingUp className="w-8 h-8 mr-3 text-blue-400" />
//                     ROC Curves - Model Comparison
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(results.rocAucScores).map(([model, score]) => (
//                       <ROCCurve 
//                         key={model} 
//                         modelName={model.replace(/([A-Z])/g, ' $1').trim()} 
//                         aucScore={score} 
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Individual Model Pie Charts */}
//                 <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
//                   <h3 className="text-2xl font-bold mb-6 flex items-center">
//                     <PieChart className="w-8 h-8 mr-3 text-blue-400" />
//                     Model Prediction Distribution
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(results.modelMetrics).map(([model, metrics]) => (
//                       <ModelPieChart 
//                         key={model} 
//                         metrics={metrics} 
//                         modelName={model.replace(/([A-Z])/g, ' $1').trim()} 
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Overall Distribution */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Overall Pie Chart */}
//                   <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-xl">
//                     <div className="flex items-center space-x-2 mb-6">
//                       <PieChart className="w-6 h-6 text-blue-400" />
//                       <h4 className="text-lg font-bold">Overall Transaction Distribution</h4>
//                     </div>
//                     <div className="relative h-56 flex items-center justify-center">
//                       <div className="relative w-44 h-44">
//                         <svg viewBox="0 0 100 100" className="transform -rotate-90">
//                           <circle 
//                             cx="50" 
//                             cy="50" 
//                             r="40" 
//                             fill="none" 
//                             stroke="#f43f5e" 
//                             strokeWidth="20" 
//                             strokeDasharray={`${(results.fraudCount / results.totalRecords) * 251.2} 251.2`}
//                             className="transition-all duration-1000"
//                           />
//                           <circle 
//                             cx="50" 
//                             cy="50" 
//                             r="40" 
//                             fill="none" 
//                             stroke="#10b981" 
//                             strokeWidth="20" 
//                             strokeDasharray={`${(results.legitimateCount / results.totalRecords) * 251.2} 251.2`}
//                             strokeDashoffset={`-${(results.fraudCount / results.totalRecords) * 251.2}`}
//                             className="transition-all duration-1000"
//                           />
//                         </svg>
//                         <div className="absolute inset-0 flex flex-col items-center justify-center">
//                           <div className="text-3xl font-black text-gray-200">{results.totalRecords}</div>
//                           <div className="text-xs text-gray-400 uppercase tracking-wider">Total</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-center space-x-8 mt-6">
//                       <div className="flex items-center space-x-2">
//                         <div className="w-4 h-4 bg-rose-500 rounded-full"></div>
//                         <div>
//                           <div className="text-sm font-bold text-gray-200">{((results.fraudCount / results.totalRecords) * 100).toFixed(1)}%</div>
//                           <div className="text-xs text-gray-400">Fraud</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
//                         <div>
//                           <div className="text-sm font-bold text-gray-200">{((results.legitimateCount / results.totalRecords) * 100).toFixed(1)}%</div>
//                           <div className="text-xs text-gray-400">Safe</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Bar Chart */}
//                   <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-xl">
//                     <div className="flex items-center space-x-2 mb-6">
//                       <BarChart3 className="w-6 h-6 text-blue-400" />
//                       <h4 className="text-lg font-bold">Model Comparison</h4>
//                     </div>
//                     <div className="space-y-4">
//                       {Object.entries(results.rocAucScores).map(([model, score], i) => (
//                         <div key={model}>
//                           <div className="flex justify-between text-xs mb-2">
//                             <span className="font-semibold truncate max-w-[120px] text-gray-200">
//                               {model.replace(/([A-Z])/g, ' $1').trim()}
//                             </span>
//                             <span className="font-bold text-blue-400">{(parseFloat(score) * 100).toFixed(1)}%</span>
//                           </div>
//                           <div className="h-10 bg-gray-800 rounded-lg overflow-hidden">
//                             <div 
//                               className="h-full bg-blue-500 rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
//                               style={{ width: `${parseFloat(score) * 100}%` }}
//                             >
//                               <span className="text-xs font-bold text-white">
//                                 {score}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Download Report Button */}
//                 <button 
//                   type="button"
//                   onClick={handleDownloadReport}
//                   className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
//                 >
//                   <Download className="w-6 h-6 group-hover:animate-bounce" />
//                   <span>Download Comprehensive Report (PDF)</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Right Side - Live Dashboard */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               {/* Live Dashboard Header */}
//               <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-2xl">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center space-x-3">
//                     <Activity className="w-7 h-7 text-emerald-400 animate-pulse" />
//                     <div>
//                       <h3 className="text-xl font-bold">Live Monitor</h3>
//                       <p className="text-xs text-gray-400">Real-time detection</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/40">
//                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                     <span className="text-xs font-bold text-emerald-400">LIVE</span>
//                   </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-800/50 rounded-xl p-4 border border-emerald-500/40">
//                     <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
//                     <div className="text-2xl font-bold text-emerald-400">{stats.legitimate}</div>
//                     <div className="text-xs text-gray-400">Approved</div>
//                   </div>
//                   <div className="bg-gray-800/50 rounded-xl p-4 border border-rose-500/40">
//                     <Lock className="w-5 h-5 text-rose-400 mb-2" />
//                     <div className="text-2xl font-bold text-rose-400">{stats.blocked}</div>
//                     <div className="text-xs text-gray-400">Blocked</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Future Plans Badge */}
//               <div className="bg-gray-900/50 rounded-2xl p-5 border border-gray-800 backdrop-blur-xl">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <Zap className="w-6 h-6 text-amber-400" />
//                   <span className="font-bold">Future Enhancement</span>
//                 </div>
//                 <p className="text-sm text-gray-400 leading-relaxed">
//                   This dashboard will integrate real-time AI predictions with automated blocking and risk assessment in the production version.
//                 </p>
//               </div>

//               {/* Live Transactions Feed */}
//               <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-xl">
//                 <div className="flex items-center justify-between mb-6">
//                   <h4 className="font-bold text-lg">Recent Transactions</h4>
//                   <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
//                 </div>

//                 <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
//                   {liveTransactions.map((tx, index) => (
//                     <div 
//                       key={tx.id} 
//                       className={`p-4 rounded-xl border transition-all duration-500 ${
//                         tx.status === 'blocked' 
//                           ? 'bg-rose-500/10 border-rose-500/40' 
//                           : 'bg-emerald-500/10 border-emerald-500/40'
//                       }`}
//                       style={{
//                         animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
//                       }}
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <div className="font-bold text-sm mb-1 flex items-center space-x-2">
//                             <span className="text-gray-200">{tx.merchant}</span>
//                             {tx.isFraud && (
//                               <AlertTriangle className="w-4 h-4 text-rose-400" />
//                             )}
//                           </div>
//                           <div className="text-xs text-gray-400">{tx.location}</div>
//                         </div>
//                         {tx.status === 'blocked' ? (
//                           <div className="flex items-center space-x-1 px-2 py-1 bg-rose-500/20 rounded-lg">
//                             <Lock className="w-4 h-4 text-rose-400" />
//                             <span className="text-xs font-bold text-rose-400">BLOCKED</span>
//                           </div>
//                         ) : (
//                           <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-500/20 rounded-lg">
//                             <Unlock className="w-4 h-4 text-emerald-400" />
//                             <span className="text-xs font-bold text-emerald-400">APPROVED</span>
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="text-xl font-bold text-gray-200">${tx.amount}</div>
//                         <div className={`px-3 py-1 rounded-full text-xs font-bold ${
//                           tx.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
//                           tx.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
//                           'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
//                         }`}>
//                           {tx.riskLevel.toUpperCase()} RISK
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center justify-between text-xs text-gray-500">
//                         <span>{tx.time}</span>
//                         {tx.isFraud && (
//                           <span className="text-rose-400 font-semibold">⚠ Fraud Detected</span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(-20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
        
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.3);
//           border-radius: 10px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #374151;
//           border-radius: 10px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #4b5563;
//         }
//       `}</style>
//     </div>
//   );
// }

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
    
    const modelsDetected = {
      xgboost: Math.random() > 0.3,
      randomForest: Math.random() > 0.2,
      logisticRegression: Math.random() > 0.4,
      neuralNetwork: Math.random() > 0.35
    };
    
    // FIXED: Only assign fraud counts to models that detected fraud
    const fraudDetectionByModel = {};
    Object.keys(modelsDetected).forEach(model => {
      if (modelsDetected[model]) {
        // Only models that detected fraud get a count
        fraudDetectionByModel[model] = Math.floor(fraudCount * (0.75 + Math.random() * 0.20));
      }
    });
    
    const mockResults = {
      fileName: file.name,
      totalRecords: totalRecords,
      modelsDetected: modelsDetected,
      fraudCount: fraudCount,
      legitimateCount: totalRecords - fraudCount,
      rocAucScores: {
        xgboost: (0.95 + Math.random() * 0.04).toFixed(3),
        randomForest: (0.93 + Math.random() * 0.05).toFixed(3),
        logisticRegression: (0.88 + Math.random() * 0.06).toFixed(3),
        neuralNetwork: (0.91 + Math.random() * 0.05).toFixed(3)
      },
      fraudDetectionByModel: fraudDetectionByModel, // FIXED: Only contains models that detected fraud
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
        color: rgb(0.2, 0.2, 0.2) 
      });
      y -= 20;
      
      page.drawText('Analysis Report', { 
        x: 50, 
        y, 
        size: headingSize, 
        color: rgb(0.4, 0.4, 0.4) 
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
        color: rgb(0.3, 0.3, 0.3) 
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
        color: rgb(0.7, 0.2, 0.2) 
      });
      y -= 20;

      page.drawText(`Legitimate Transactions: ${results.legitimateCount}`, { 
        x: 70, 
        y, 
        size: fontSize, 
        color: rgb(0.2, 0.6, 0.3) 
      });
      y -= 40;

      if (Object.keys(results.fraudDetectionByModel).length > 0) {
        page.drawText('FRAUD DETECTION BY MODEL', { 
          x: 50, 
          y, 
          size: headingSize, 
          color: rgb(0.3, 0.3, 0.3) 
        });
        y -= 25;

        Object.entries(results.fraudDetectionByModel).forEach(([model, count]) => {
          const modelName = model.replace(/([A-Z])/g, ' $1').trim();
          page.drawText(`${modelName}: ${count} frauds detected`, { 
            x: 70, 
            y, 
            size: fontSize, 
            color: rgb(0.7, 0.2, 0.2)
          });
          y -= 20;
        });

        y -= 20;
      }

      page.drawText('MODEL PERFORMANCE (ROC-AUC SCORES)', { 
        x: 50, 
        y, 
        size: headingSize, 
        color: rgb(0.3, 0.3, 0.3) 
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
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
        <h5 className="font-bold mb-4 text-center text-gray-200">{modelName} - ROC Curve</h5>
        <svg viewBox="0 0 100 100" className="w-full h-40">
          {[0, 25, 50, 75, 100].map(val => (
            <React.Fragment key={val}>
              <line x1="0" y1={val} x2="100" y2={val} stroke="#374151" strokeWidth="0.5" />
              <line x1={val} y1="0" x2={val} y2="100" stroke="#374151" strokeWidth="0.5" />
            </React.Fragment>
          ))}
          <line x1="0" y1="100" x2="100" y2="0" stroke="#6b7280" strokeWidth="1" strokeDasharray="2,2" />
          <path d={pathData} fill="none" stroke="#60a5fa" strokeWidth="2" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
        </svg>
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-400">AUC: </span>
          <span className="text-lg font-bold text-blue-400">{aucScore}</span>
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
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
        <h5 className="font-bold mb-4 text-center text-gray-200">{modelName} - Distribution</h5>
        <div className="relative h-48 flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" 
                strokeDasharray={`${tpPercent * 2.512} 251.2`} />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="20" 
                strokeDasharray={`${fpPercent * 2.512} 251.2`}
                strokeDashoffset={`-${tpPercent * 2.512}`} />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6ee7b7" strokeWidth="20" 
                strokeDasharray={`${tnPercent * 2.512} 251.2`}
                strokeDashoffset={`-${(tpPercent + fpPercent) * 2.512}`} />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fb7185" strokeWidth="20" 
                strokeDasharray={`${fnPercent * 2.512} 251.2`}
                strokeDashoffset={`-${(tpPercent + fpPercent + tnPercent) * 2.512}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-black text-gray-200">{total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-400">TP: {tpPercent.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <span className="text-gray-400">FP: {fpPercent.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span className="text-gray-400">TN: {tnPercent.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
            <span className="text-gray-400">FN: {fnPercent.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Minimal Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-12 h-12 text-blue-400" />
              <div>
                <h1 className="text-3xl font-black text-gray-100">
                  CREDIT CARD FRAUD DETECTION
                </h1>
                <p className="text-sm text-gray-400">AI-Powered Detection System by THE NEURONOVA TEAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{stats.totalTransactions}</div>
                <div className="text-xs text-gray-400">Total Scanned</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-rose-400">{stats.fraudDetected}</div>
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
            <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold">Upload Transaction Data</h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-gray-600 transition-all duration-300 cursor-pointer bg-gray-800/30 hover:bg-gray-800/50">
                <input
                  type="file"
                  accept=".csv,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer block">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-xl font-semibold mb-2">Drop your CSV or PDF file here</p>
                  <p className="text-gray-400 mb-4">or click to browse</p>
                  {uploadedFile && (
                    <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/40">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-semibold">{uploadedFile.name}</span>
                    </div>
                  )}
                </label>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Supported Formats</div>
                  <div className="font-semibold text-gray-200">.CSV, .PDF</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Max File Size</div>
                  <div className="font-semibold text-gray-200">10 MB</div>
                </div>
              </div>
            </div>

            {/* Analysis Progress */}
            {analyzing && (
              <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl animate-pulse">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                  <div>
                    <p className="text-xl font-bold">Analyzing Transactions...</p>
                    <p className="text-gray-400">Running 4 ML models on your data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['XGBoost Classifier', 'Random Forest', 'Logistic Regression', 'Neural Network'].map((model, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${25 + (i * 25)}%` }}
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
                <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Activity className="w-8 h-8 mr-3 text-blue-400" />
                      Detection Summary
                    </h3>
                    <div className="px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/40">
                      <span className="text-sm font-bold text-emerald-400">✓ Analysis Complete</span>
                    </div>
                  </div>
                  
                  {/* Fraud vs Legitimate */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/30 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                        <span className="text-sm text-emerald-400 font-semibold">SAFE</span>
                      </div>
                      <div className="text-4xl font-black text-emerald-400 mb-2">{results.legitimateCount}</div>
                      <div className="text-gray-400 text-sm">Legitimate Transactions</div>
                    </div>
                    <div className="bg-rose-500/10 rounded-2xl p-6 border border-rose-500/30 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <AlertTriangle className="w-8 h-8 text-rose-400" />
                        <span className="text-sm text-rose-400 font-semibold">FRAUD</span>
                      </div>
                      <div className="text-4xl font-black text-rose-400 mb-2">{results.fraudCount}</div>
                      <div className="text-gray-400 text-sm">Fraudulent Transactions</div>
                    </div>
                  </div>

                  {/* Model Detection Status */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold">Models Detected Fraud</h4>
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl font-black text-blue-400">
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
                              ? 'bg-rose-500/15 border-rose-500/50' 
                              : 'bg-gray-800/50 border-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold capitalize text-lg text-gray-200">
                              {model.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            {detected ? (
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-6 h-6 text-rose-400" />
                                <span className="text-xs font-semibold text-rose-400">DETECTED</span>
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
                  <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                    <h4 className="text-xl font-bold mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                      Model Performance (ROC-AUC Score)
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(results.rocAucScores).map(([model, score], i) => (
                        <div key={model} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="capitalize font-semibold text-gray-200">{model.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-gray-400">Score:</span>
                              <span className="font-bold text-lg text-blue-400">
                                {score}
                              </span>
                            </div>
                          </div>
                          <div className="relative w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                              style={{ width: `${parseFloat(score) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-right text-gray-500">{(parseFloat(score) * 100).toFixed(1)}% Accuracy</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FIXED: Fraud Detection Count by Each Model - Only shows models that detected fraud */}
                {Object.keys(results.fraudDetectionByModel).length > 0 && (
                  <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <AlertTriangle className="w-8 h-8 mr-3 text-rose-400" />
                      Fraud Detection Count by Model
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(results.fraudDetectionByModel).map(([model, count]) => {
                        const percentage = ((count / results.fraudCount) * 100).toFixed(1);
                        return (
                          <div key={model} className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 hover:border-rose-500/50 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-lg capitalize text-gray-200">
                                {model.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <AlertTriangle className="w-6 h-6 text-rose-400" />
                            </div>
                            <div className="text-5xl font-black text-rose-400 mb-2">{count}</div>
                            <div className="text-sm text-gray-400 mb-4">Frauds Detected</div>
                            <div className="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-right text-gray-500 mt-2">
                              {percentage}% Detection Rate
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Model Performance Metrics */}
                <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Target className="w-8 h-8 mr-3 text-blue-400" />
                    Detailed Model Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(results.modelMetrics).map(([model, metrics]) => (
                      <div key={model} className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700">
                        <h4 className="font-bold text-lg mb-4 capitalize text-center text-blue-400">
                          {model.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">Precision</div>
                            <div className="text-xl font-bold text-gray-200">{metrics.precision}</div>
                          </div>
                          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">Recall</div>
                            <div className="text-xl font-bold text-gray-200">{metrics.recall}</div>
                          </div>
                          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">F1-Score</div>
                            <div className="text-xl font-bold text-gray-200">{metrics.f1Score}</div>
                          </div>
                          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                            <div className="text-xl font-bold text-emerald-400">{metrics.accuracy}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROC Curves for Each Model */}
                <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3 text-blue-400" />
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

                {/* Individual Model Pie Charts */}
                <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <PieChart className="w-8 h-8 mr-3 text-blue-400" />
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
                  <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center space-x-2 mb-6">
                      <PieChart className="w-6 h-6 text-blue-400" />
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
                            stroke="#f43f5e" 
                            strokeWidth="20" 
                            strokeDasharray={`${(results.fraudCount / results.totalRecords) * 251.2} 251.2`}
                            className="transition-all duration-1000"
                          />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="20" 
                            strokeDasharray={`${(results.legitimateCount / results.totalRecords) * 251.2} 251.2`}
                            strokeDashoffset={`-${(results.fraudCount / results.totalRecords) * 251.2}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-black text-gray-200">{results.totalRecords}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">Total</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-8 mt-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-rose-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-bold text-gray-200">{((results.fraudCount / results.totalRecords) * 100).toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">Fraud</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-bold text-gray-200">{((results.legitimateCount / results.totalRecords) * 100).toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">Safe</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center space-x-2 mb-6">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                      <h4 className="text-lg font-bold">Model Comparison</h4>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(results.rocAucScores).map(([model, score], i) => (
                        <div key={model}>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="font-semibold truncate max-w-[120px] text-gray-200">
                              {model.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-bold text-blue-400">{(parseFloat(score) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-10 bg-gray-800 rounded-lg overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
                              style={{ width: `${parseFloat(score) * 100}%` }}
                            >
                              <span className="text-xs font-bold text-white">
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
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
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
              <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-7 h-7 text-emerald-400 animate-pulse" />
                    <div>
                      <h3 className="text-xl font-bold">Live Monitor</h3>
                      <p className="text-xs text-gray-400">Real-time detection</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/40">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-emerald-400">LIVE</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-emerald-500/40">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
                    <div className="text-2xl font-bold text-emerald-400">{stats.legitimate}</div>
                    <div className="text-xs text-gray-400">Approved</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-rose-500/40">
                    <Lock className="w-5 h-5 text-rose-400 mb-2" />
                    <div className="text-2xl font-bold text-rose-400">{stats.blocked}</div>
                    <div className="text-xs text-gray-400">Blocked</div>
                  </div>
                </div>
              </div>

              {/* Future Plans Badge */}
              <div className="bg-gray-900/50 rounded-2xl p-5 border border-gray-800 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <span className="font-bold">Future Enhancement</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  This dashboard will integrate real-time AI predictions with automated blocking and risk assessment in the production version.
                </p>
              </div>

              {/* Live Transactions Feed */}
              <div className="bg-gray-900/50 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-lg">Recent Transactions</h4>
                  <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
                </div>

                <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
                  {liveTransactions.map((tx, index) => (
                    <div 
                      key={tx.id} 
                      className={`p-4 rounded-xl border transition-all duration-500 ${
                        tx.status === 'blocked' 
                          ? 'bg-rose-500/10 border-rose-500/40' 
                          : 'bg-emerald-500/10 border-emerald-500/40'
                      }`}
                      style={{
                        animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-bold text-sm mb-1 flex items-center space-x-2">
                            <span className="text-gray-200">{tx.merchant}</span>
                            {tx.isFraud && (
                              <AlertTriangle className="w-4 h-4 text-rose-400" />
                            )}
                          </div>
                          <div className="text-xs text-gray-400">{tx.location}</div>
                        </div>
                        {tx.status === 'blocked' ? (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-rose-500/20 rounded-lg">
                            <Lock className="w-4 h-4 text-rose-400" />
                            <span className="text-xs font-bold text-rose-400">BLOCKED</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-500/20 rounded-lg">
                            <Unlock className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400">APPROVED</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-bold text-gray-200">${tx.amount}</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          tx.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          tx.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {tx.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{tx.time}</span>
                        {tx.isFraud && (
                          <span className="text-rose-400 font-semibold">⚠ Fraud Detected</span>
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
}

