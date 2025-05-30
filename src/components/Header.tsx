
import React from 'react';
import { TrendingUp, Target, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Optimiseur Quadratique Contraint
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Optimisation de portefeuille avec contraintes linéaires
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-500" />
              <span>Minimise le risque</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Système KKT</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
