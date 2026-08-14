import React from 'react';
import { RnLogo } from './RnLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-rna-slate-800 bg-rna-navy-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        
        {/* Official Brand Logo */}
        <RnLogo height={40} />

        <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
          Calculadora de KPIs e Previsibilidade Financeira desenvolvida para suporte estratégico na gestão comercial e otimização contínua de campanhas jurídicas.
        </p>

        {/* Mandatory OAB Disclaimer as per Brand Guidelines & OAB standard */}
        <p className="text-gray-500 text-xs max-w-md mx-auto italic border-t border-rna-slate-800/80 pt-3">
          Este conteúdo tem caráter informativo e não constitui aconselhamento jurídico individualizado.
        </p>

        <div className="text-[11px] text-slate-600 font-mono">
          © {new Date().getFullYear()} Rian Nicolau Advocacia • OAB/CE 2.057. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
