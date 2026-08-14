import React from 'react';
import type { MarketingKpiInputs, ContractKpiInputs, ScenarioPreset } from '../types/kpi';
import { Layers, Zap, Shield, Rocket, Check } from 'lucide-react';

interface ScenarioPresetsProps {
  currentMarketing: MarketingKpiInputs;
  currentContract: ContractKpiInputs;
  onApplyPreset: (marketing: MarketingKpiInputs, contract: ContractKpiInputs) => void;
}

export const ScenarioPresets: React.FC<ScenarioPresetsProps> = ({
  onApplyPreset,
}) => {
  const presets: ScenarioPreset[] = [
    {
      id: 'conservador',
      name: 'Perfil Conservador',
      description: 'Volume alto de leads com ticket médio moderado (ex: Previdenciário / Consumidor)',
      iconName: 'Shield',
      marketing: {
        monthlyAdBudget: 3000,
        costPerLead: 15,
        qualifiedLeadRate: 40,
        consultationRate: 35,
        closingRate: 25,
      },
      contract: {
        averageTicket: 3500,
        contractDurationMonths: 12,
        monthlyMaintenanceFee: 0,
      },
    },
    {
      id: 'moderado',
      name: 'Rian Nicolau Standard',
      description: 'Cível Específico, Trabalhista Estratégico e Família (Equilíbrio CPL e Conversão)',
      iconName: 'Zap',
      marketing: {
        monthlyAdBudget: 6000,
        costPerLead: 25,
        qualifiedLeadRate: 50,
        consultationRate: 45,
        closingRate: 35,
      },
      contract: {
        averageTicket: 7500,
        contractDurationMonths: 18,
        monthlyMaintenanceFee: 350,
      },
    },
    {
      id: 'agressivo',
      name: 'High-Ticket / Empresarial',
      description: 'Consultoria Corporativa, Planejamento Tributário e Societário (Alta Margem)',
      iconName: 'Rocket',
      marketing: {
        monthlyAdBudget: 12000,
        costPerLead: 45,
        qualifiedLeadRate: 60,
        consultationRate: 50,
        closingRate: 45,
      },
      contract: {
        averageTicket: 18000,
        contractDurationMonths: 24,
        monthlyMaintenanceFee: 1500,
      },
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-rna-gold-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-emerald-400" />;
      default: return <Layers className="w-5 h-5 text-rna-gold-400" />;
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-rna-slate-700/80 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 font-sans flex items-center gap-2">
            <Layers className="w-4 h-4 text-rna-gold-400" />
            Cenários & Benchmarks Pré-Configurados
          </h3>
          <p className="text-xs text-slate-400">
            Carregue métricas prontas com base no nicho de atuação da advocacia.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => onApplyPreset(preset.marketing, preset.contract)}
            className="group relative p-4 rounded-xl glass-panel border border-rna-slate-700 hover:border-rna-gold-500/60 hover:bg-rna-slate-800/80 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-rna-navy-950/80 border border-rna-slate-700">
                  {getIcon(preset.iconName)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rna-gold-400 group-hover:underline flex items-center gap-1">
                  Aplicar <Check className="w-3 h-3" />
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-rna-gold-300 transition-colors">
                {preset.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {preset.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-rna-slate-800 text-[11px] text-slate-300 space-y-0.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Investimento:</span>
                <span className="font-semibold text-slate-200">R$ {preset.marketing.monthlyAdBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ticket Médio:</span>
                <span className="font-semibold text-rna-gold-400">R$ {preset.contract.averageTicket.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
