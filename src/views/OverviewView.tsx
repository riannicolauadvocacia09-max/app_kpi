import React from 'react';
import type { MarketingKpiInputs, ContractKpiInputs, MarketingKpiResults, LtvResults } from '../types/kpi';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { CacRoasCalculator } from '../components/CacRoasCalculator';
import { LtvCalculator } from '../components/LtvCalculator';
import { ActionPlanPlanner } from '../components/ActionPlanPlanner';
import { formatCurrency } from '../lib/utils';
import { Users, DollarSign, Award, TrendingUp } from 'lucide-react';

interface OverviewViewProps {
  marketingInputs: MarketingKpiInputs;
  contractInputs: ContractKpiInputs;
  marketingResults: MarketingKpiResults;
  ltvResults: LtvResults;
  onMarketingChange: (key: keyof MarketingKpiInputs, value: number) => void;
  onContractChange: (key: keyof ContractKpiInputs, value: number) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  marketingInputs,
  contractInputs,
  marketingResults,
  ltvResults,
  onMarketingChange,
  onContractChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Top Overview KPI Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: CAC */}
        <div className="glass-panel p-5 rounded-2xl border-rna-slate-700/80 hover:border-rna-gold-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">CAC Médio</span>
            <Users className="w-4 h-4 text-rna-gold-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatCurrency(marketingResults.costPerAcquisition)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Custo por Contrato Fechado</span>
        </div>

        {/* Card 2: LTV */}
        <div className="glass-panel p-5 rounded-2xl border-rna-slate-700/80 hover:border-rna-gold-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">LTV por Cliente</span>
            <DollarSign className="w-4 h-4 text-rna-gold-400" />
          </div>
          <div className="text-2xl font-extrabold text-rna-gold-300">
            {formatCurrency(ltvResults.ltv)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Receita Total no Ciclo</span>
        </div>

        {/* Card 3: LTV/CAC Ratio */}
        <div className="glass-panel-gold p-5 rounded-2xl">
          <div className="flex items-center justify-between text-rna-gold-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">LTV / CAC Ratio</span>
            <Award className="w-4 h-4 text-rna-gold-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {ltvResults.ltvCacRatio.toFixed(2)}x
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">Benchmark Ideal: &gt; 3,0x</span>
        </div>

        {/* Card 4: ROAS */}
        <div className="glass-panel p-5 rounded-2xl border-rna-slate-700/80 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">ROAS Anúncios</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {marketingResults.roas.toFixed(2)}x
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Retorno em Honorários Iniciais</span>
        </div>

      </div>

      {/* Action Plan Component */}
      <ActionPlanPlanner
        marketingInputs={marketingInputs}
        marketingResults={marketingResults}
        ltvResults={ltvResults}
      />

      {/* Interactive Charts Section */}
      <AnalyticsCharts
        monthlyAdBudget={marketingInputs.monthlyAdBudget}
        marketingResults={marketingResults}
        ltvResults={ltvResults}
      />

      {/* Split Calculators View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CacRoasCalculator
          inputs={marketingInputs}
          results={marketingResults}
          averageTicket={contractInputs.averageTicket}
          onChange={onMarketingChange}
        />
        <LtvCalculator
          contractInputs={contractInputs}
          ltvResults={ltvResults}
          cac={marketingResults.costPerAcquisition}
          onChange={onContractChange}
        />
      </div>

    </div>
  );
};
