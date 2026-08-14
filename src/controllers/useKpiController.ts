import { useState, useMemo } from 'react';
import type { MarketingKpiInputs, ContractKpiInputs } from '../types/kpi';
import {
  DEFAULT_MARKETING_INPUTS,
  DEFAULT_CONTRACT_INPUTS,
  calculateMarketingResults,
  calculateLtvResults,
} from '../models/kpiModel';
import { fetchGoogleSheetCsv, DEFAULT_SPREADSHEET_ID } from '../services/googleSheetsService';
import { parseGoogleSheetsCsv, convertMonthlyRowToInputs } from '../models/googleSheetsModel';

export function useKpiController() {
  const [marketingInputs, setMarketingInputs] = useState<MarketingKpiInputs>(DEFAULT_MARKETING_INPUTS);
  const [contractInputs, setContractInputs] = useState<ContractKpiInputs>(DEFAULT_CONTRACT_INPUTS);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string>(DEFAULT_SPREADSHEET_ID);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  // Derived Calculations
  const marketingResults = useMemo(() => {
    return calculateMarketingResults(marketingInputs, contractInputs.averageTicket);
  }, [marketingInputs, contractInputs.averageTicket]);

  const ltvResults = useMemo(() => {
    return calculateLtvResults(
      contractInputs,
      marketingResults.costPerAcquisition,
      marketingResults.totalContractsClosed
    );
  }, [contractInputs, marketingResults.costPerAcquisition, marketingResults.totalContractsClosed]);

  // Actions
  const updateMarketingInput = (key: keyof MarketingKpiInputs, value: number) => {
    setMarketingInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateContractInput = (key: keyof ContractKpiInputs, value: number) => {
    setContractInputs((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (marketing: MarketingKpiInputs, contract: ContractKpiInputs) => {
    setMarketingInputs(marketing);
    setContractInputs(contract);
  };

  const resetToDefault = () => {
    setMarketingInputs(DEFAULT_MARKETING_INPUTS);
    setContractInputs(DEFAULT_CONTRACT_INPUTS);
  };

  const openImportModal = () => setIsImportModalOpen(true);
  const closeImportModal = () => setIsImportModalOpen(false);

  // Live Google Sheets Synchronization
  const syncGoogleSheetsLive = async (targetId: string = spreadsheetId, sheetName: string = 'RESUMO_MENSAL') => {
    setIsSyncing(true);
    setSyncError(null);
    setSyncSuccessMessage(null);

    try {
      const csvText = await fetchGoogleSheetCsv(targetId, sheetName);
      const parsedRows = parseGoogleSheetsCsv(csvText);

      if (parsedRows.length === 0) {
        throw new Error('Nenhum dado válido encontrado na aba selecionada da planilha.');
      }

      // Pick the latest month or July 2026 row
      const targetRow = parsedRows.find((r) => r.monthName.toLowerCase().includes('julho')) || parsedRows[parsedRows.length - 1];
      const { marketing, contract } = convertMonthlyRowToInputs(targetRow, marketingInputs.monthlyAdBudget);

      applyPreset(marketing, contract);
      setSyncSuccessMessage(`Planilha sincronizada ao vivo! Dados de ${targetRow.monthName} aplicados.`);
      setTimeout(() => {
        setSyncSuccessMessage(null);
        closeImportModal();
      }, 1500);
    } catch (err: any) {
      setSyncError(err.message || 'Erro ao sincronizar com Google Sheets.');
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    // State
    marketingInputs,
    contractInputs,
    marketingResults,
    ltvResults,
    activeTab,
    isImportModalOpen,
    spreadsheetId,
    isSyncing,
    syncError,
    syncSuccessMessage,

    // Setters & Handlers
    setActiveTab,
    setSpreadsheetId,
    updateMarketingInput,
    updateContractInput,
    applyPreset,
    resetToDefault,
    openImportModal,
    closeImportModal,
    syncGoogleSheetsLive,
  };
}

export type KpiController = ReturnType<typeof useKpiController>;
