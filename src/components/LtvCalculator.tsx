import React from 'react';
import type { ContractKpiInputs, LtvResults } from '../types/kpi';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, BarChart3, Clock, DollarSign, Activity } from 'lucide-react';

interface LtvCalculatorProps {
  contractInputs: ContractKpiInputs;
  ltvResults: LtvResults;
  cac: number;
  onChange: (key: keyof ContractKpiInputs, value: number) => void;
}

export const LtvCalculator: React.FC<LtvCalculatorProps> = ({
  contractInputs,
  ltvResults,
  cac,
  onChange,
}) => {
  const getHealthBadge = (status: LtvResults['healthStatus']) => {
    switch (status) {
      case 'Excelente':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Excelente (&gt; 4.0x)</span>;
      case 'Saudavel':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Saudável (3.0x - 4.0x)</span>;
      case 'Atencao':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Atenção (1.5x - 3.0x)</span>;
      case 'Critico':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">Crítico (&lt; 1.5x)</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rna-slate-700/60 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-sans flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-rna-gold-400" />
            Lifetime Value (LTV) & Retorno do Cliente
          </h2>
          <p className="text-xs text-slate-400">
            Analise o valor total gerado por cliente ao longo do ciclo contratual e a saúde do ecossistema comercial.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-5 glass-panel p-5 rounded-2xl border border-rna-slate-700/80">
          <h3 className="text-sm font-semibold text-rna-gold-300 uppercase tracking-wider mb-2">
            Estrutura de Honorários
          </h3>

          {/* Ticket Médio Inicial */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-rna-gold-400" />
                Ticket Médio Inicial (R$)
              </label>
              <span className="text-xs font-bold text-rna-gold-400">{formatCurrency(contractInputs.averageTicket)}</span>
            </div>
            <input
              type="number"
              min="500"
              step="500"
              value={contractInputs.averageTicket}
              onChange={(e) => onChange('averageTicket', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg glass-input text-sm text-slate-100 font-medium"
            />
          </div>

          {/* Fee Mensal Recorrente */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Retainer / Fee Mensal Recorrente (R$)</label>
              <span className="text-xs font-bold text-slate-200">{formatCurrency(contractInputs.monthlyMaintenanceFee)}</span>
            </div>
            <input
              type="number"
              min="0"
              step="250"
              value={contractInputs.monthlyMaintenanceFee}
              onChange={(e) => onChange('monthlyMaintenanceFee', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg glass-input text-sm text-slate-100 font-medium"
            />
          </div>

          {/* Duração Média do Contrato */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Duração do Contrato (Meses)
              </label>
              <span className="text-xs font-bold text-slate-200">{contractInputs.contractDurationMonths} meses</span>
            </div>
            <input
              type="range"
              min="1"
              max="48"
              step="1"
              value={contractInputs.contractDurationMonths}
              onChange={(e) => onChange('contractDurationMonths', parseInt(e.target.value) || 1)}
              className="w-full accent-rna-gold-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Ratio & LTV Banner */}
          <div className="glass-panel-gold p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-rna-gold-300 mb-1">
                  Lifetime Value (LTV Total)
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-sans">
                  {formatCurrency(ltvResults.ltv)}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Receita total estimada por contrato fechado durante {contractInputs.contractDurationMonths} meses.
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end border-t sm:border-t-0 sm:border-l border-rna-gold-500/20 pt-3 sm:pt-0 sm:pl-6">
                <div className="text-xs text-slate-300 uppercase font-semibold">Razão LTV / CAC</div>
                <div className="text-3xl font-extrabold text-rna-gold-300 mt-0.5">
                  {ltvResults.ltvCacRatio.toFixed(2)}x
                </div>
                <div className="mt-2">{getHealthBadge(ltvResults.healthStatus)}</div>
              </div>
            </div>
          </div>

          {/* Secondary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Payback Time */}
            <div className="glass-panel p-5 rounded-2xl border-rna-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Payback (Retorno do CAC)</span>
                <Clock className="w-4 h-4 text-rna-gold-400" />
              </div>
              <div className="text-2xl font-bold text-slate-100">
                {ltvResults.paybackMonths.toFixed(1)} <span className="text-xs font-normal text-slate-400">meses</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Tempo necessário para o cliente pagar o custo de aquisição ({formatCurrency(cac)}).
              </p>
            </div>

            {/* Recorrência Mensal */}
            <div className="glass-panel p-5 rounded-2xl border-rna-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Fee Recorrente Mensal</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                {formatCurrency(contractInputs.monthlyMaintenanceFee)}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Entrada fixa mensal recorrente gerada no escritório.
              </p>
            </div>

          </div>

          {/* Strategic Guidance Box */}
          <div className="glass-panel p-4 rounded-2xl border border-rna-slate-700/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-rna-gold-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-slate-100 block">Benchmark Advocacia Rian Nicolau:</span>
              <p>
                O padrão de excelência para advocacia corporativa/especializada indica que a relação{' '}
                <strong className="text-rna-gold-400">LTV/CAC deve ser superior a 3,0x</strong>. Com os valores atuais (
                <strong className="text-slate-100">{ltvResults.ltvCacRatio.toFixed(2)}x</strong>), seu modelo de cobrança garante
                {ltvResults.ltvCacRatio >= 3
                  ? ' alta previsibilidade e excelente margem para expansão com investimento em tráfego.'
                  : ' estabilidade, mas pode ser otimizado adicionando honorários de êxito ou retenção contratual mais longa.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
