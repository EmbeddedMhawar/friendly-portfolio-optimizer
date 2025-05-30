
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { InputPanel } from '../components/InputPanel';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { AdvancedOptions } from '../components/AdvancedOptions';
import { StepIndicator } from '../components/StepIndicator';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [targetReturn, setTargetReturn] = useState(0.08);
  const [csvData, setCsvData] = useState(null);
  const [results, setResults] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleOptimize = () => {
    // Simulate optimization process
    setCurrentStep(2);
    setTimeout(() => {
      const mockResults = {
        weights: [
          { asset: 'AAPL', weight: 0.35, color: '#6366f1' },
          { asset: 'GOOGL', weight: 0.25, color: '#8b5cf6' },
          { asset: 'MSFT', weight: 0.20, color: '#06b6d4' },
          { asset: 'TSLA', weight: 0.15, color: '#10b981' },
          { asset: 'AMZN', weight: 0.05, color: '#f59e0b' }
        ],
        expectedReturn: targetReturn,
        volatility: 0.12,
        sharpeRatio: 0.67,
        constraintsMet: true
      };
      setResults(mockResults);
      setCurrentStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <StepIndicator currentStep={currentStep} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel
              targetReturn={targetReturn}
              setTargetReturn={setTargetReturn}
              csvData={csvData}
              setCsvData={setCsvData}
              onOptimize={handleOptimize}
              isOptimizing={currentStep === 2}
            />
            
            <div className="mt-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full text-left px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/80 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Paramètres Avancés</span>
                  <span className={`transform transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </div>
              </button>
              
              {showAdvanced && (
                <div className="mt-4">
                  <AdvancedOptions />
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <ResultsDashboard results={results} isLoading={currentStep === 2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
