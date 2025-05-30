
import React, { useRef } from 'react';
import { Upload, Play, FileText, Sliders } from 'lucide-react';

interface InputPanelProps {
  targetReturn: number;
  setTargetReturn: (value: number) => void;
  csvData: any;
  setCsvData: (file: File) => void;
  onOptimize: () => void;
  isOptimizing: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  targetReturn,
  setTargetReturn,
  csvData,
  setCsvData,
  onOptimize,
  isOptimizing
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvData(file);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
        <Sliders className="w-5 h-5 mr-2 text-indigo-500" />
        Configuration
      </h2>

      {/* CSV Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Données des Actifs (CSV)
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />

          {csvData ? (
            <div className="flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-700">{csvData.name}</span>
            </div>
          ) : (
            <div>
              <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">
                Cliquez pour télécharger votre fichier CSV
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Format: Date, Asset1, Asset2, ...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Target Return Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Rendement Cible Annuel: {(targetReturn * 100).toFixed(1)}%
        </label>
        <div className="relative">
          <input
            type="range"
            min="0.02"
            max="0.20"
            step="0.005"
            value={targetReturn}
            onChange={(e) => setTargetReturn(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-green-200 to-red-200 rounded-lg appearance-none cursor-pointer custom-slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>2%</span>
            <span>Conservateur</span>
            <span>Agressif</span>
            <span>20%</span>
          </div>
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={onOptimize}
        disabled={!csvData || isOptimizing}
        className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
          !csvData || isOptimizing
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`}
      >
        {isOptimizing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Optimisation en cours...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Optimiser le Portefeuille</span>
          </>
        )}
      </button>

      <style>{`
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          border: 2px solid white;
        }

        .custom-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};
