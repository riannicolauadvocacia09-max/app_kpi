import type {
  MarketingKpiInputs,
  ContractKpiInputs,
  MarketingKpiResults,
  LtvResults,
  ScenarioPreset,
} from '../types/kpi';

export const DEFAULT_MARKETING_INPUTS: MarketingKpiInputs = {
  monthlyAdBudget: 6000,
  costPerLead: 20,
  qualifiedLeadRate: 50,
  consultationRate: 40,
  closingRate: 30,
};

export const DEFAULT_CONTRACT_INPUTS: ContractKpiInputs = {
  averageTicket: 6000,
  contractDurationMonths: 12,
  monthlyMaintenanceFee: 300,
};

export function calculateMarketingResults(
  marketing: MarketingKpiInputs,
  averageTicket: number
): MarketingKpiResults {
  const budget = marketing.monthlyAdBudget || 0;
  const cpl = marketing.costPerLead || 1;
  const totalLeads = budget / cpl;
  const qualifiedLeads = totalLeads * (marketing.qualifiedLeadRate / 100);
  const totalConsultations = qualifiedLeads * (marketing.consultationRate / 100);
  const totalContractsClosed = totalConsultations * (marketing.closingRate / 100);
  const costPerAcquisition = totalContractsClosed > 0 ? budget / totalContractsClosed : 0;
  const totalNewRevenue = totalContractsClosed * (averageTicket || 0);
  const roas = budget > 0 ? totalNewRevenue / budget : 0;
  const overallConversionRate = totalLeads > 0 ? (totalContractsClosed / totalLeads) * 100 : 0;

  return {
    totalLeads,
    qualifiedLeads,
    totalConsultations,
    totalContractsClosed,
    costPerAcquisition,
    totalNewRevenue,
    roas,
    overallConversionRate,
  };
}

export function calculateLtvResults(
  contract: ContractKpiInputs,
  costPerAcquisition: number,
  contractsClosed: number
): LtvResults {
  const ticket = contract.averageTicket || 0;
  const duration = contract.contractDurationMonths || 1;
  const monthlyFee = contract.monthlyMaintenanceFee || 0;
  const ltv = ticket + (monthlyFee * duration);

  const ltvCacRatio = costPerAcquisition > 0 ? ltv / costPerAcquisition : 0;
  const monthlyRevenuePerClient = (ticket / duration) + monthlyFee;
  const paybackMonths = (costPerAcquisition > 0 && monthlyRevenuePerClient > 0)
    ? costPerAcquisition / monthlyRevenuePerClient
    : 0;
  const monthlyRecurringRevenue = contractsClosed * monthlyFee;

  let healthStatus: LtvResults['healthStatus'] = 'Critico';
  if (ltvCacRatio >= 4.0) healthStatus = 'Excelente';
  else if (ltvCacRatio >= 3.0) healthStatus = 'Saudavel';
  else if (ltvCacRatio >= 1.5) healthStatus = 'Atencao';

  return {
    ltv,
    ltvCacRatio,
    paybackMonths,
    monthlyRecurringRevenue,
    healthStatus,
  };
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
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
      costPerLead: 20,
      qualifiedLeadRate: 50,
      consultationRate: 40,
      closingRate: 30,
    },
    contract: {
      averageTicket: 6000,
      contractDurationMonths: 12,
      monthlyMaintenanceFee: 300,
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
