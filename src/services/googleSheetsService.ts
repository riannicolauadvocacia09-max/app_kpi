/**
 * Google Sheets Integration Service
 * Fetches live CSV data directly from Google Sheets public GViz export endpoints.
 */

export const DEFAULT_SPREADSHEET_ID = '11DAw0_gtduCtPJYuhZM0iQ0tbaSYbGAF';

export interface FetchedSheetData {
  sheetName: string;
  csvText: string;
}

export async function fetchGoogleSheetCsv(
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID,
  sheetName: string = 'RESUMO_MENSAL'
): Promise<string> {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const url = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Falha ao conectar com a Planilha Google (Status HTTP ${response.status})`);
    }
    const csvText = await response.text();
    return csvText;
  } catch (error: any) {
    console.error('Erro ao buscar planilha:', error);
    throw new Error(error.message || 'Não foi possível buscar a planilha do Google.');
  }
}

export function extractSpreadsheetId(urlOrId: string): string {
  if (!urlOrId) return DEFAULT_SPREADSHEET_ID;
  const match = urlOrId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return urlOrId.trim();
}
