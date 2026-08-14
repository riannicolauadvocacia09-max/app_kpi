import React from 'react';
import type { MarketingKpiInputs, MarketingKpiResults } from '../types/kpi';
import { formatNumber, formatPercent, formatCurrency } from '../lib/utils';
import { Filter, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SalesFunnelCalculatorProps {
  inputs: MarketingKpiInputs;
  results: MarketingKpiResults;
  averageTicket: number;
}

export const SalesFunnelCalculator: React.FC<SalesFunnelCalculatorProps> = ({
  inputs,
  results,
  averageTicket,
}) => {
  const steps = [
    {
      id: 'leads',
      title: '1. Total de Leads (Anúncios)',
      value: results.totalLeads,
      rate: '100%',
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-400',
      description: `Gerados a partir de ${formatCurrency(inputs.monthlyAdBudget)} investidos com CPL de ${formatCurrency(inputs.costPerLead)}.`,
      width: '100%',
    },
    {
      id: 'qualified',
      title: '2. Leads Qualificados',
      value: results.qualifiedLeads,
      rate: `${inputs.qualifiedLeadRate}% dos Leads`,
      color: 'from-rna-slate-600 to-rna-slate-700',
      textColor: 'text-rna-gold-400',
      description: `${formatNumber(results.totalLeads - results.qualifiedLeads)} leads desqualificados ou sem perfil de contratação.`,
      width: `${Math.max(inputs.qualifiedLeadRate, 25)}%`,
    },
    {
      id: 'consultations',
      title: '3. Consultas / Reuniões Agendadas',
      value: results.totalConsultations,
      rate: `${inputs.consultationRate}% dos Qualificados`,
      color: 'from-rna-gold-600 to-rna-gold-700',
      textColor: 'text-rna-gold-300',
      description: `${formatNumber(results.qualifiedLeads - results.totalConsultations)} leads qualificados não agendaram reunião.`,
      width: `${Math.max((results.totalConsultations / (results.totalLeads || 1)) * 100, 20)}%`,
    },
    {
      id: 'contracts',
      title: '4. Contratos Fechados',
      value: results.totalContractsClosed,
      rate: `${inputs.closingRate}% das Reuniões`,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-400',
      description: `Geram ${formatCurrency(results.totalNewRevenue)} em honorários iniciais com Ticket Médio de ${formatCurrency(averageTicket)}.`,
      width: `${Math.max((results.totalContractsClosed / (results.totalLeads || 1)) * 100, 15)}%`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rna-slate-700/60 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-sans flex items-center gap-2">
            <Filter className="w-5 h-5 text-rna-gold-400" />
            Funil de Conversão Comercial Jurídico
          </h2>
          <p className="text-xs text-slate-400">
            Mapeamento completo da jornada do prospect desde a primeira impressão no anúncio até a assinatura do contrato.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Funnel Stack */}
        <div className="lg:col-span-8 space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="glass-panel p-5 rounded-2xl border border-rna-slate-700/80 hover:border-rna-gold-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{step.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl font-extrabold text-white">{formatNumber(step.value)}</span>
                    <span className="block text-[11px] font-semibold text-rna-gold-400">{step.rate}</span>
                  </div>
                </div>

                {/* Funnel Progress Bar */}
                <div className="w-full bg-rna-navy-950 h-3 rounded-full overflow-hidden p-0.5 border border-rna-slate-700">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${step.color} transition-all duration-500`}
                    style={{ width: step.width }}
                  />
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center my-1">
                  <ChevronDown className="w-5 h-5 text-rna-gold-500/60 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Funnel Diagnostics & Bottleneck Insights */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="glass-panel-gold p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-rna-gold-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rna-gold-400" />
              Taxa Global de Conversão
            </h3>
            <div className="text-3xl font-black text-white font-sans mt-1">
              {formatPercent(results.overallConversionRate)}
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Proporção total de visitantes que chegam via tráfego e assinam contrato com o escritório.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-rna-slate-700/80 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Análise de Gargalos
            </h3>
            
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-rna-navy-950/60 border border-rna-slate-700">
                <span className="font-semibold text-slate-100 block mb-0.5">Atendimento Inicial (WhatsApp / Secretária):</span>
                {inputs.consultationRate < 40 ? (
                  <span className="text-amber-400">
                    Sua taxa de agendamento ({inputs.consultationRate}%) está abaixo do ideal (50%+). Melhore o tempo de resposta inicial no WhatsApp.
                  </span>
                ) : (
                  <span className="text-emerald-400">
                    Ótima taxa de agendamento ({inputs.consultationRate}%). Atendimento comercial ágil e eficiente!
                  </span>
                )}
              </div>

              <div className="p-3 rounded-lg bg-rna-navy-950/60 border border-rna-slate-700">
                <span className="font-semibold text-slate-100 block mb-0.5">Fechamento na Reunião:</span>
                {inputs.closingRate < 30 ? (
                  <span className="text-amber-400">
                    Taxa de fechamento em {inputs.closingRate}%. Apresente propostas com ancoragem de valor e casos de sucesso do escritório.
                  </span>
                ) : (
                  <span className="text-emerald-400">
                    Excelente conversão em reunião ({inputs.closingRate}%). Forte autoridade e técnica de fechamento jurídico!
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
