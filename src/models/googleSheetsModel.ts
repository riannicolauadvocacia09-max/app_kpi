import type { MarketingKpiInputs, ContractKpiInputs } from '../types/kpi';

export interface MonthlyRowData {
  monthName: string;
  startDate: string;
  endDate: string;
  leadsReceived: number;
  respondents: number;
  qualified: number;
  consultations: number;
  contracts: number;
  closedValue: number;
}

export function parseGoogleSheetsCsv(csvText: string): MonthlyRowData[] {
  const lines = csvText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const results: MonthlyRowData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Match CSV columns (handling quotes if any)
    const cols = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map((c) => c.replace(/^\"|\"$/g, '').trim());
    
    if (cols.length >= 5) {
      const monthName = cols[0] || `Mês ${i}`;
      const leadsReceived = parseNumber(cols[3] || cols[2]);
      const respondents = parseNumber(cols[4] || '0');
      const qualified = parseNumber(cols[5] || '0');
      const consultations = parseNumber(cols[6] || '0');
      const contracts = parseNumber(cols[7] || '0');
      const closedValue = parseCurrency(cols[8] || '0');

      if (leadsReceived > 0 || qualified > 0 || contracts > 0) {
        results.push({
          monthName,
          startDate: cols[1] || '',
          endDate: cols[2] || '',
          leadsReceived,
          respondents,
          qualified,
          consultations,
          contracts,
          closedValue,
        });
      }
    }
  }

  return results;
}

export function convertMonthlyRowToInputs(
  row: MonthlyRowData,
  estimatedBudget: number = 5000
): { marketing: MarketingKpiInputs; contract: ContractKpiInputs } {
  const cpl = row.leadsReceived > 0 ? estimatedBudget / row.leadsReceived : 20;
  const qualRate = row.leadsReceived > 0 ? Math.round((row.qualified / row.leadsReceived) * 100) : 50;
  const consultRate = row.qualified > 0 ? Math.round((row.consultations / row.qualified) * 100) : 40;
  const closeRate = row.consultations > 0 ? Math.round((row.contracts / row.consultations) * 100) : 30;
  const ticket = row.contracts > 0 && row.closedValue > 0 ? Math.round(row.closedValue / row.contracts) : 6000;

  return {
    marketing: {
      monthlyAdBudget: estimatedBudget,
      costPerLead: Math.max(Math.round(cpl), 1),
      qualifiedLeadRate: Math.max(qualRate, 5),
      consultationRate: Math.max(consultRate, 5),
      closingRate: Math.max(closeRate, 5),
    },
    contract: {
      averageTicket: Math.max(ticket, 1000),
      contractDurationMonths: 12,
      monthlyMaintenanceFee: 300,
    },
  };
}

function parseNumber(val: string): number {
  if (!val) return 0;
  const clean = val.replace(/\D/g, '');
  return parseInt(clean, 10) || 0;
}

function parseCurrency(val: string): number {
  if (!val) return 0;
  const clean = val.replace(/[^0-9,.-]/g, '').replace(',', '.');
  return parseFloat(clean) || 0;
}
