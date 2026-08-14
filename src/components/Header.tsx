import React, { useState, useEffect } from 'react';
import { RnLogo } from './RnLogo';
import { Download, RefreshCw, Smartphone, Sparkles, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenImportModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenImportModal, activeTab, setActiveTab }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral KPIs' },
    { id: 'marketing', label: 'CAC & ROAS' },
    { id: 'ltv', label: 'LTV & Métricas' },
    { id: 'funnel', label: 'Funil de Vendas' },
    { id: 'simulator', label: 'Simulador de Meta' },
    { id: 'action-plan', label: 'Plano de Ação & Decisões' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-rna-navy-950/85 backdrop-blur-md border-b border-rna-slate-700/60 shadow-navy-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          
          {/* Brand Official Logo */}
          <div className="flex items-center gap-4">
            <RnLogo height={44} />
            <div className="hidden sm:block h-8 w-[1px] bg-rna-slate-700" />
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold font-sans text-slate-100 tracking-tight">
                  KPI Calculator & Intelligence
                </h1>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-rna-gold-500/10 text-rna-gold-500 border border-rna-gold-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> RNA System
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Painel Estratégico de Tráfego Pago & Previsibilidade Jurídica
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <button
              onClick={onOpenImportModal}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-rna-gold-500/15 text-rna-gold-500 border border-rna-gold-500/40 hover:bg-rna-gold-500 hover:text-rna-navy-950 transition-all flex items-center gap-1.5 shadow-gold-sm"
              title="Importar dados da planilha de tráfego pago"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Importar Planilha
            </button>

            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-rna-gold-500 text-rna-navy-950 hover:bg-rna-gold-400 transition-all flex items-center gap-1.5 shadow-gold-sm"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Instalar App
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-rna-slate-800 text-slate-300 border border-rna-slate-700 hover:border-rna-gold-500/40 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-rna-gold-500" />
              Exportar PDF
            </button>

            <button
              onClick={onReset}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-rna-slate-800 text-slate-300 border border-rna-slate-700 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-300 transition-all flex items-center gap-1.5"
              title="Restaurar valores padrão"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-2 pt-1 border-t border-rna-slate-800/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-rna-gold-500/15 text-rna-gold-500 border border-rna-gold-500/40 shadow-gold-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-rna-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
