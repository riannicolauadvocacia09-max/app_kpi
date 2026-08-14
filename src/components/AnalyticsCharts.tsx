import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import type { MarketingKpiResults, LtvResults } from '../types/kpi';
import { formatCurrency } from '../lib/utils';
import { BarChart2, TrendingUp } from 'lucide-react';

interface AnalyticsChartsProps {
  monthlyAdBudget: number;
  marketingResults: MarketingKpiResults;
  ltvResults: LtvResults;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  monthlyAdBudget,
  marketingResults,
  ltvResults,
}) => {

  // 6-Month Projection Data
  const projectionData = [1, 2, 3, 4, 5, 6].map((month) => {
    const scaleFactor = 1 + (month - 1) * 0.15; // 15% monthly scale
    const budget = monthlyAdBudget * scaleFactor;
    const revenue = marketingResults.totalNewRevenue * scaleFactor;
    const profit = revenue - budget;

    return {
      month: `Mês ${month}`,
      Investimento: Math.round(budget),
      Faturamento: Math.round(revenue),
      Lucro: Math.round(profit),
    };
  });

  // LTV vs CAC Comparison Data
  const ltvCacData = [
    {
      name: 'Métrica',
      CAC: Math.round(marketingResults.costPerAcquisition),
      LTV: Math.round(ltvResults.ltv),
    },
  ];

  const customTooltipFormatter = (value: any) => [formatCurrency(Number(value)), ''];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 6-Month Scaling Projection Chart */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-rna-slate-700/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-sans flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rna-gold-400" />
                Projeção de Escala Financeira (6 Meses)
              </h3>
              <p className="text-xs text-slate-400">
                Comparativo mensal entre Investimento em Ads, Faturamento e Lucro Limpo Pós-Tráfego.
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D42" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickFormatter={(v) => `R$${v / 1000}k`} tickLine={false} />
                <Tooltip
                  formatter={customTooltipFormatter}
                  contentStyle={{ backgroundColor: '#0B1B2B', borderColor: '#1E2D42', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Investimento" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Area type="monotone" dataKey="Faturamento" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="Lucro" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorProfit)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LTV vs CAC Multiplier Chart */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-rna-slate-700/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-sans flex items-center gap-2 mb-1">
              <BarChart2 className="w-4 h-4 text-rna-gold-400" />
              Razão LTV vs CAC
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Proporção de retorno em valor total por cliente em relação ao investimento inicial de aquisição.
            </p>

            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ltvCacData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D42" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickFormatter={(v) => `R$${v}`} tickLine={false} />
                  <Tooltip
                    formatter={customTooltipFormatter}
                    contentStyle={{ backgroundColor: '#0B1B2B', borderColor: '#1E2D42', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="CAC" fill="#EF4444" radius={[6, 6, 0, 0]} maxBarSize={45} />
                  <Bar dataKey="LTV" fill="#D4AF37" radius={[6, 6, 0, 0]} maxBarSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rna-navy-950/80 border border-rna-slate-700 text-center">
            <span className="text-[11px] text-slate-400 block">Retorno Multiplicador</span>
            <span className="text-lg font-black text-rna-gold-400">
              {ltvResults.ltvCacRatio.toFixed(2)}x LTV/CAC
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
