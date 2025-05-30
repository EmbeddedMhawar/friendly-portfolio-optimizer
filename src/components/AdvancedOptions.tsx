
import React, { useState } from 'react';
import { Settings, Zap, Brain, Calculator } from 'lucide-react';

export const AdvancedOptions = () => {
  const [optimizationType, setOptimizationType] = useState('portfolio');
  const [solverMethod, setSolverMethod] = useState('lu');
  const [constraints, setConstraints] = useState({
    nonNegativity: true,
    sumToOne: true,
    customConstraints: false
  });

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-indigo-500" />
        Options Avancées
      </h3>

      {/* Optimization Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Type d'Optimisation
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { value: 'portfolio', label: 'Optimisation de Portefeuille', icon: Calculator },
            { value: 'svm', label: 'Support Vector Machine', icon: Brain },
            { value: 'lqr', label: 'Régulateur Linéaire Quadratique', icon: Zap },
            { value: 'resource', label: 'Allocation de Ressources', icon: Settings }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setOptimizationType(option.value)}
              className={`p-3 rounded-lg text-left flex items-center space-x-3 transition-all duration-200 ${
                optimizationType === option.value
                  ? 'bg-indigo-100 border-2 border-indigo-300 text-indigo-800'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <option.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Solver Method */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Méthode de Résolution
        </label>
        <select
          value={solverMethod}
          onChange={(e) => setSolverMethod(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        >
          <option value="lu">Décomposition LU</option>
          <option value="cholesky">Décomposition de Cholesky</option>
          <option value="qr">Décomposition QR</option>
          <option value="svd">Décomposition SVD</option>
        </select>
      </div>

      {/* Constraints */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Contraintes
        </label>
        <div className="space-y-3">
          {[
            { key: 'nonNegativity', label: 'Non-négativité des poids' },
            { key: 'sumToOne', label: 'Somme des poids = 1' },
            { key: 'customConstraints', label: 'Contraintes personnalisées' }
          ].map((constraint) => (
            <label key={constraint.key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={constraints[constraint.key as keyof typeof constraints]}
                onChange={(e) => setConstraints(prev => ({
                  ...prev,
                  [constraint.key]: e.target.checked
                }))}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">{constraint.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* KKT System Parameters */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Paramètres du Système KKT</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-600 mb-1">Tolérance</label>
            <input
              type="number"
              defaultValue="1e-8"
              className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Max Itérations</label>
            <input
              type="number"
              defaultValue="1000"
              className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
