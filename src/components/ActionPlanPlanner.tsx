import React from 'react';
import type { MarketingKpiInputs, MarketingKpiResults, LtvResults } from '../types/kpi';
import { formatCurrency } from '../lib/utils';
import { CheckSquare, Sparkles } from 'lucide-react';

interface ActionPlanPlannerProps {
  marketingInputs: MarketingKpiInputs;
  marketingResults: MarketingKpiResults;
  ltvResults: LtvResults;
}

export interface ActionItem {
  id: string;
  category: 'Ads' | 'Atendimento' | 'Qualificação' | 'Escala';
  priority: 'critico' | 'atencao' | 'sucesso';
  title: string;
  problem: string;
  solution: string;
}

export const ActionPlanPlanner: React.FC<ActionPlanPlannerProps> = ({
  marketingInputs,
  marketingResults,
  ltvResults,
}) => {
  const cpl = marketingInputs.costPerLead;
  const qualRate = marketingInputs.qualifiedLeadRate;
  const closeRate = marketingInputs.closingRate;
  const cac = marketingResults.costPerAcquisition;
  const roas = marketingResults.roas;

  // Generate prescriptive action items based on official PDF decision matrix
  const generateActionItems = (): ActionItem[] => {
    const items: ActionItem[] = [];

    // 1. CPL Diagnosis
    if (cpl > 35) {
      items.push({
        id: 'cpl-high',
        category: 'Ads',
        priority: 'critico',
        title: 'Troca de Anúncios / Criativos Cansados (CPL Alto)',
        problem: `Seu CPL está em ${formatCurrency(cpl)}, acima da meta saudável (máx. R$ 35,00).`,
        solution: 'Troque as imagens/vídeos dos anúncios (criativo fadigado) ou revise a segmentação de cidade/idade no Meta Ads.',
      });
    } else if (cpl <= 20) {
      items.push({
        id: 'cpl-excelent',
        category: 'Ads',
        priority: 'sucesso',
        title: 'Custo por Lead Excelente',
        problem: `CPL atual de ${formatCurrency(cpl)} está em nível excelente (< R$ 20,00).`,
        solution: 'Manter os criativos atuais rodando e monitorar para que o leilão não suba.',
      });
    }

    // 2. Qualification Rate Diagnosis
    if (qualRate < 35) {
      items.push({
        id: 'qual-low',
        category: 'Qualificação',
        priority: 'critico',
        title: 'Filtro de Anúncio Genérico (Qualificação < 35%)',
        problem: `Apenas ${qualRate}% dos leads têm perfil aproveitável. Muito curioso entrando no WhatsApp.`,
        solution: 'Deixe o texto do anúncio mais específico no filtro de entrada (ex: troque "somos advogados previdenciários" por "Seu BPC-TEA foi negado em Icó/CE?").',
      });
    } else if (qualRate >= 60) {
      items.push({
        id: 'qual-high',
        category: 'Qualificação',
        priority: 'sucesso',
        title: 'Alta Precisão de Público (Qualificação >= 60%)',
        problem: `Qualificação em ${qualRate}%. Anúncio atrai o público exato do escritório.`,
        solution: 'Se o volume total de leads estiver baixo, considere aumentar ligeiramente o orçamento mensal.',
      });
    }

    // 3. Closing Rate & WhatsApp Response Time Diagnosis
    if (closeRate < 15) {
      items.push({
        id: 'close-low',
        category: 'Atendimento',
        priority: 'critico',
        title: 'Gargalo no Atendimento / WhatsApp (Fechamento < 15%)',
        problem: `Sua taxa de fechamento está em ${closeRate}%, abaixo do ideal saudável (15% a 25%). O problema NÃO é o anúncio!`,
        solution: 'Verifique o tempo de resposta no WhatsApp (ideal < 15 min em horário comercial), revise o script de atendimento da Dra. Fernanda/atendente e reforce a taxa de comparência nas reuniões.',
      });
    } else if (closeRate >= 18) {
      items.push({
        id: 'close-high',
        category: 'Atendimento',
        priority: 'sucesso',
        title: 'Excelente Eficiência Comercial (Fechamento >= 18%)',
        problem: `Taxa de fechamento em ${closeRate}%. Atendimento com alta taxa de conversão em reunião.`,
        solution: 'Manter a rapidez no WhatsApp e registrar os principais motivos de objeção para treinamento contínuo.',
      });
    }

    // 4. CAC vs Middle Funnel Diagnosis
    if (cac > 2000 && cpl <= 35) {
      items.push({
        id: 'cac-mid-funnel',
        category: 'Atendimento',
        priority: 'critico',
        title: 'CAC Elevado com CPL Bom (Gargalo de Meio de Funil)',
        problem: `CAC em ${formatCurrency(cac)}, mas o CPL está dentro da meta (${formatCurrency(cpl)}).`,
        solution: 'NÃO desative os anúncios do Meta/Google Ads! O lead está sendo gerado barato, mas morrendo no atendimento ou follow-up do WhatsApp.',
      });
    }

    // 5. Scaling Opportunity Diagnosis
    if (roas >= 3.0 && qualRate >= 35 && closeRate >= 15) {
      items.push({
        id: 'scale-green',
        category: 'Escala',
        priority: 'sucesso',
        title: 'Sinal Verde para Escala de Orçamento (+20% a +50%)',
        problem: `ROAS em ${roas.toFixed(2)}x com LTV/CAC de ${ltvResults.ltvCacRatio.toFixed(2)}x. Todas as etapas do funil estão saudáveis!`,
        solution: 'Pode escalar o orçamento mensal de anúncios com total segurança na reunião de sexta-feira.',
      });
    }

    return items;
  };

  const actionItems = generateActionItems();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rna-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-rna-gold-500" />
              Plano de Ação Semanal & Decisões Inteligentes
            </h2>
            <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-rna-gold-500/20 text-rna-gold-500 border border-rna-gold-500/30">
              Rotina de Sexta-Feira
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Recomendações prescritivas geradas automaticamente sem adivinhação, baseadas na matriz de decisão do escritório.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rna-slate-800 text-slate-200 border border-rna-slate-700 hover:border-rna-gold-500/50 transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-rna-gold-500" />
          Imprimir Planner Semanal
        </button>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {actionItems.map((item) => {
          const isCritical = item.priority === 'critico';
          const isSuccess = item.priority === 'sucesso';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isCritical
                  ? 'glass-panel border-red-500/40 bg-red-950/20'
                  : isSuccess
                  ? 'glass-panel-gold border-emerald-500/40 bg-emerald-950/20'
                  : 'glass-panel border-amber-500/40 bg-amber-950/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  
                  {/* Category & Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                        isCritical
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : isSuccess
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {isCritical ? '🔴 Ação Crítica' : isSuccess ? '🟢 Sinal Verde' : '🟡 Otimização'} • {item.category}
                    </span>
                  </div>

                  {/* Action Title */}
                  <h3 className="text-base font-bold text-slate-100">{item.title}</h3>

                  {/* Problem & Solution Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-rna-navy-950/80 border border-rna-slate-800 text-xs space-y-1">
                      <span className="font-bold text-slate-300 block">Diagnóstico de Origem:</span>
                      <p className="text-slate-400">{item.problem}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-rna-navy-950/80 border border-rna-slate-800 text-xs space-y-1">
                      <span className="font-bold text-rna-gold-400 block">Decisão & Ação Recomendada:</span>
                      <p className="text-slate-200">{item.solution}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Guide Box */}
      <div className="glass-panel p-5 rounded-2xl border border-rna-slate-700/80 space-y-3">
        <h3 className="text-sm font-bold text-rna-gold-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Checklist da Reunião de Sexta-Feira (Rotina Semanal)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-rna-navy-950/70 border border-rna-slate-800 space-y-1">
            <span className="font-semibold text-slate-100 block">1. Preencher a Planilha</span>
            <p className="text-slate-400">Puxar os números da semana no botão "Importar Planilha" ou preencher CPL, CAC, Qualificação e Fechamento.</p>
          </div>

          <div className="p-3 rounded-xl bg-rna-navy-950/70 border border-rna-slate-800 space-y-1">
            <span className="font-semibold text-slate-100 block">2. Comparar com a Semana Anterior</span>
            <p className="text-slate-400">Verificar se o CPL subiu, se a qualificação manteve estável e se o atendimento respondeu no tempo limite.</p>
          </div>

          <div className="p-3 rounded-xl bg-rna-navy-950/70 border border-rna-slate-800 space-y-1">
            <span className="font-semibold text-slate-100 block">3. Tomada de Decisão Sem Adivinhação</span>
            <p className="text-slate-400">Executar apenas as ações recomendadas neste plano sem mexer em campanhas que já estão saudáveis.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
