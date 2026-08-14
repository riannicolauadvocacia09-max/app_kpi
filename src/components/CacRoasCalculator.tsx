import React from 'react';
import type { MarketingKpiInputs, MarketingKpiResults } from '../types/kpi';
import { formatCurrency, formatPercent, formatNumber } from '../lib/utils';
import { DollarSign, Users, Target, UserCheck, Award, TrendingUp, HelpCircle } from 'lucide-react';

interface CacRoasCalculatorProps {
  inputs: MarketingKpiInputs;
  results: MarketingKpiResults;
  averageTicket: number;
  onChange: (key: keyof MarketingKpiInputs, value: number) => void;
}

export const CacRoasCalculator: React.FC<CacRoasCalculatorProps> = ({
  inputs,
  results,
  averageTicket,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rna-slate-700/60 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-sans flex items-center gap-2">
            <Target className="w-5 h-5 text-rna-gold-400" />
            Aquisição de Clientes (CAC & ROAS)
          </h2>
          <p className="text-xs text-slate-400">
            Calcule a eficiência do investimento em tráfego pago para atração de novos clientes jurídicos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls Panel */}
        <div className="lg:col-span-5 space-y-4 glass-panel p-5 rounded-2xl border border-rna-slate-700/80">
          <h3 className="text-sm font-semibold text-rna-gold-300 uppercase tracking-wider mb-3">
            Parâmetros de Campanha
          </h3>

          {/* Investimento Mensal */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-rna-gold-400" />
                Investimento Mensal Ads (R$)
              </label>
              <span className="text-xs font-bold text-rna-gold-400">{formatCurrency(inputs.monthlyAdBudget)}</span>
            </div>
            <input
              type="number"
              min="0"
              step="500"
              value={inputs.monthlyAdBudget}
              onChange={(e) => onChange('monthlyAdBudget', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg glass-input text-sm text-slate-100 font-medium"
            />
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={inputs.monthlyAdBudget}
              onChange={(e) => onChange('monthlyAdBudget', parseFloat(e.target.value) || 0)}
              className="w-full mt-2 accent-rna-gold-500 cursor-pointer"
            />
          </div>

          {/* Custo por Lead (CPL) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Custo por Lead - CPL (R$)</label>
              <span className="text-xs font-bold text-slate-200">{formatCurrency(inputs.costPerLead)}</span>
            </div>
            <input
              type="number"
              min="1"
              step="1"
              value={inputs.costPerLead}
              onChange={(e) => onChange('costPerLead', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg glass-input text-sm text-slate-100 font-medium"
            />
          </div>

          {/* % Leads Qualificados */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Taxa de Leads Qualificados (%)</label>
              <span className="text-xs font-bold text-slate-200">{inputs.qualifiedLeadRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={inputs.qualifiedLeadRate}
              onChange={(e) => onChange('qualifiedLeadRate', parseFloat(e.target.value) || 0)}
              className="w-full accent-rna-gold-500 cursor-pointer"
            />
          </div>

          {/* % Agendamento de Consulta */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Agendamento de Consultas (%)</label>
              <span className="text-xs font-bold text-slate-200">{inputs.consultationRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={inputs.consultationRate}
              onChange={(e) => onChange('consultationRate', parseFloat(e.target.value) || 0)}
              className="w-full accent-rna-gold-500 cursor-pointer"
            />
          </div>

          {/* % Taxa de Fechamento */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Taxa de Fechamento de Contrato (%)</label>
              <span className="text-xs font-bold text-slate-200">{inputs.closingRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={inputs.closingRate}
              onChange={(e) => onChange('closingRate', parseFloat(e.target.value) || 0)}
              className="w-full accent-rna-gold-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Results Cards Display */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* CAC Metric */}
          <div className="glass-panel-gold p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rna-gold-300">CAC (Custo por Cliente)</span>
                <span className="p-2 rounded-lg bg-rna-gold-500/20 text-rna-gold-400">
                  <UserCheck className="w-5 h-5" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                {formatCurrency(results.costPerAcquisition)}
              </div>
            </div>
            <p className="text-[11px] text-slate-300 mt-3 pt-2 border-t border-rna-gold-500/20">
              Custo total investido para fechar cada contrato advocatício.
            </p>
          </div>

          {/* ROAS Metric */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-rna-slate-700/80">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ROAS Médio</span>
                <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-sans">
                {results.roas.toFixed(2)}x
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-rna-slate-700">
              Para cada R$ 1,00 investido em Ads, retornam {formatCurrency(results.roas)} em contratos.
            </p>
          </div>

          {/* Volume de Leads */}
          <div className="glass-panel p-4 rounded-2xl border-rna-slate-700/80">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Total de Leads Mensais</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-slate-100 mt-1">
              {formatNumber(results.totalLeads)} <span className="text-xs font-normal text-slate-400">leads</span>
            </div>
            <div className="text-[11px] text-rna-gold-400 mt-1">
              {formatNumber(results.qualifiedLeads)} qualificados ({inputs.qualifiedLeadRate}%)
            </div>
          </div>

          {/* Contratos Fechados */}
          <div className="glass-panel p-4 rounded-2xl border-rna-slate-700/80">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Novos Contratos / Mês</span>
              <Award className="w-4 h-4 text-rna-gold-400" />
            </div>
            <div className="text-xl font-bold text-rna-gold-300 mt-1">
              {formatNumber(results.totalContractsClosed)} <span className="text-xs font-normal text-slate-400">contratos</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Ticket Médio Base: {formatCurrency(averageTicket)}
            </div>
          </div>

          {/* Summary Box */}
          <div className="sm:col-span-2 glass-panel p-4 rounded-2xl border border-rna-slate-700/80 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-rna-gold-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-slate-100 block">Diagnóstico de Aquisição:</span>
              <p>
                Sua taxa de conversão final (Lead → Contrato) é de{' '}
                <strong className="text-rna-gold-400">{formatPercent(results.overallConversionRate)}</strong>.
                {results.roas >= 3 ? (
                  <span className="text-emerald-400"> Excelente eficiência de anúncios! Seu retorno sobre investimento é altamente sustentável.</span>
                ) : results.roas >= 1.5 ? (
                  <span className="text-amber-400"> Campanha com retorno positivo. Otimize a qualificação de leads para expandir a margem.</span>
                ) : (
                  <span className="text-red-400"> Atenção: CAC elevado em relação ao retorno imediato. Revise o custo por lead ou aumente o ticket médio.</span>
                )}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
