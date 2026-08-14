export interface MarketingKpiInputs {
  monthlyAdBudget: number;       // Investimento mensal em anúncios (Meta Ads, Google Ads)
  costPerLead: number;           // Custo por Lead médio
  qualifiedLeadRate: number;     // % de Leads Qualificados
  consultationRate: number;      // % de Leads Qualificados que agendam Reunião/Consulta
  closingRate: number;           // % de Consultas que convertem em Contrato Fechado
}

export interface ContractKpiInputs {
  averageTicket: number;         // Ticket Médio de Honorários (por contrato)
  contractDurationMonths: number;// Duração média do contrato / relacionamento em meses
  monthlyMaintenanceFee: number; // Fee mensal recorrente (se houver)
}

export interface MarketingKpiResults {
  totalLeads: number;
  qualifiedLeads: number;
  totalConsultations: number;
  totalContractsClosed: number;
  costPerAcquisition: number;    // CAC (Custo de Aquisição de Cliente)
  totalNewRevenue: number;       // Faturamento inicial dos novos contratos
  roas: number;                  // ROAS (Return on Ad Spend)
  overallConversionRate: number; // Conversion Lead -> Contrato Fechado (%)
}

export interface LtvResults {
  ltv: number;                   // Lifetime Value por cliente
  ltvCacRatio: number;           // Razão LTV / CAC
  paybackMonths: number;         // Meses para recuperar o CAC
  monthlyRecurringRevenue: number;// Receita Recorrente Mensal estimada (MRR)
  healthStatus: 'Critico' | 'Atencao' | 'Saudavel' | 'Excelente';
}

export interface GoalSimulatorInputs {
  targetMonthlyRevenue: number;  // Meta de Faturamento Mensal desejada
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  iconName: string;
  marketing: MarketingKpiInputs;
  contract: ContractKpiInputs;
}
