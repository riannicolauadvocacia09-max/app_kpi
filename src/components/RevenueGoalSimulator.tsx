import React, { useState } from 'react';
import type { MarketingKpiInputs, ContractKpiInputs } from '../types/kpi';
import { formatCurrency, formatNumber } from '../lib/utils';
import { Compass, CheckCircle2 } from 'lucide-react';

interface RevenueGoalSimulatorProps {
  marketingInputs: MarketingKpiInputs;
  contractInputs: ContractKpiInputs;
}

export const RevenueGoalSimulator: React.FC<RevenueGoalSimulatorProps> = ({
  marketingInputs,
  contractInputs,
}) => {
  const [targetRevenue, setTargetRevenue] = useState<number>(100000);

  // Calculations
  const averageTicket = contractInputs.averageTicket || 5000;
  const requiredContracts = Math.ceil(targetRevenue / averageTicket);
  const closingRateDecimal = (marketingInputs.closingRate || 30) / 100;
  const consultationRateDecimal = (marketingInputs.consultationRate || 40) / 100;
  const qualifiedLeadRateDecimal = (marketingInputs.qualifiedLeadRate || 50) / 100;

  const requiredConsultations = Math.ceil(requiredContracts / closingRateDecimal);
  const requiredQualifiedLeads = Math.ceil(requiredConsultations / consultationRateDecimal);
  const requiredTotalLeads = Math.ceil(requiredQualifiedLeads / qualifiedLeadRateDecimal);
  const requiredAdBudget = requiredTotalLeads * (marketingInputs.costPerLead || 20);
  const netMargin = targetRevenue - requiredAdBudget;

  const quickGoals = [30000, 50000, 100000, 200000, 500000];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rna-slate-700/60 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-sans flex items-center gap-2">
            <Compass className="w-5 h-5 text-rna-gold-400" />
            Simulador de Metas de Faturamento Mensal
          </h2>
          <p className="text-xs text-slate-400">
            Descubra a infraestrutura de anúncios e volume de reuniões necessários para atingir sua meta financeira.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Goal Input & Quick Buttons */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-rna-slate-700/80 space-y-4">
          <h3 className="text-sm font-semibold text-rna-gold-300 uppercase tracking-wider">
            Definir Meta de Honorários Mensais
          </h3>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Meta Desejada (R$)
            </label>
            <div className="relative">
              <input
                type="number"
                min="5000"
                step="5000"
                value={targetRevenue}
                onChange={(e) => setTargetRevenue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl glass-input text-lg font-extrabold text-rna-gold-400"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={targetRevenue}
              onChange={(e) => setTargetRevenue(parseFloat(e.target.value) || 0)}
              className="w-full mt-3 accent-rna-gold-500 cursor-pointer"
            />
          </div>

          {/* Quick Select Buttons */}
          <div>
            <span className="text-xs text-slate-400 block mb-2 font-medium">Metas Rápidas:</span>
            <div className="flex flex-wrap gap-2">
              {quickGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setTargetRevenue(goal)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    targetRevenue === goal
                      ? 'bg-rna-gold-500 text-rna-navy-950 shadow-gold-sm'
                      : 'bg-rna-slate-800 text-slate-300 hover:bg-rna-slate-700'
                  }`}
                >
                  {formatCurrency(goal)}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-rna-slate-700/80 text-xs text-slate-400 space-y-1">
            <span className="text-slate-300 font-semibold block">Base de Cálculo Atual:</span>
            <p>• Ticket Médio: <strong className="text-slate-200">{formatCurrency(averageTicket)}</strong></p>
            <p>• Custo por Lead: <strong className="text-slate-200">{formatCurrency(marketingInputs.costPerLead)}</strong></p>
            <p>• Conversão Final: <strong className="text-slate-200">{((requiredContracts / requiredTotalLeads) * 100).toFixed(1)}%</strong></p>
          </div>
        </div>

        {/* Required Resources Output */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="glass-panel-gold p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rna-gold-300">
                  Investimento de Mídia Necessário
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white font-sans mt-1">
                  {formatCurrency(requiredAdBudget)} <span className="text-xs font-normal text-slate-300">/ mês em Ads</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Orçamento estimado de anúncios para gerar os {formatNumber(requiredTotalLeads)} leads necessários.
                </p>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-rna-gold-500/20 pt-3 sm:pt-0 sm:pl-6">
                <span className="text-xs text-slate-300 uppercase font-semibold">Margem Bruta Pós-Ads</span>
                <div className="text-2xl font-bold text-emerald-400 mt-0.5">
                  {formatCurrency(netMargin)}
                </div>
                <span className="text-[11px] text-slate-300">Retorno limpo após tráfego</span>
              </div>
            </div>
          </div>

          {/* Actionable Pipeline Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="glass-panel p-4 rounded-xl border-rna-slate-700/80">
              <span className="text-[11px] text-slate-400 font-medium">1. Contratos Fechados</span>
              <div className="text-xl font-bold text-rna-gold-400 mt-1">
                {requiredContracts} <span className="text-xs font-normal text-slate-400">contratos</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Necessários para atingir meta</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border-rna-slate-700/80">
              <span className="text-[11px] text-slate-400 font-medium">2. Consultas Agendadas</span>
              <div className="text-xl font-bold text-slate-100 mt-1">
                {requiredConsultations} <span className="text-xs font-normal text-slate-400">reuniões</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Com taxa de fechamento em {marketingInputs.closingRate}%</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border-rna-slate-700/80">
              <span className="text-[11px] text-slate-400 font-medium">3. Total de Leads</span>
              <div className="text-xl font-bold text-slate-100 mt-1">
                {requiredTotalLeads} <span className="text-xs font-normal text-slate-400">leads</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                {requiredQualifiedLeads} qualificados ({marketingInputs.qualifiedLeadRate}%)
              </span>
            </div>

          </div>

          {/* Executive Plan Note */}
          <div className="glass-panel p-4 rounded-2xl border border-rna-slate-700/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-rna-gold-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-slate-100 block">Plano de Execução Comercial:</span>
              <p>
                Para faturar <strong className="text-rna-gold-400">{formatCurrency(targetRevenue)}/mês</strong>, a equipe da Rian Nicolau Advocacia deve realizar em média{' '}
                <strong className="text-slate-100">{Math.ceil(requiredConsultations / 22)} reuniões comerciais por dia útil</strong> e fechar cerca de{' '}
                <strong className="text-slate-100">{(requiredContracts / 4).toFixed(1)} contratos por semana</strong>.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
