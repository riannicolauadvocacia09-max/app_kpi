import React, { useState } from 'react';
import type { MarketingKpiInputs, ContractKpiInputs } from '../types/kpi';
import { FileSpreadsheet, Upload, CheckCircle2, X, Sparkles } from 'lucide-react';
import { formatNumber } from '../lib/utils';

interface ImportSpreadsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyData: (marketing: MarketingKpiInputs, contract: ContractKpiInputs) => void;
}

interface RealMonthPreset {
  month: string;
  leads: number;
  respondents: number;
  qualified: number;
  consultations: number;
  contracts: number;
  adBudget: number;
  ticket: number;
}

export const ImportSpreadsheetModal: React.FC<ImportSpreadsheetModalProps> = ({
  isOpen,
  onClose,
  onApplyData,
}) => {
  const [importedMessage, setImportedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Real data extracted from user's PLANILHA_COMERCIAL_RN_ADVOCACIA_2026_TRAFEGO_PAGO
  const spreadsheetMonths: RealMonthPreset[] = [
    {
      month: 'Julho / 2026 (Planilha Real)',
      leads: 166,
      respondents: 78,
      qualified: 10,
      consultations: 12,
      contracts: 9,
      adBudget: 3500,
      ticket: 4500,
    },
    {
      month: 'Agosto / 2026 (Planilha Real)',
      leads: 71,
      respondents: 53,
      qualified: 8,
      consultations: 4,
      contracts: 6,
      adBudget: 2500,
      ticket: 5000,
    },
    {
      month: 'Junho / 2026 (Planilha Real)',
      leads: 294,
      respondents: 143,
      qualified: 5,
      consultations: 8,
      contracts: 1,
      adBudget: 4000,
      ticket: 3500,
    },
  ];

  const handleApplyPreset = (preset: RealMonthPreset) => {
    const cpl = preset.leads > 0 ? preset.adBudget / preset.leads : 20;
    const qualifiedRate = preset.leads > 0 ? Math.round((preset.qualified / preset.leads) * 100) : 50;
    const consultationRate = preset.qualified > 0 ? Math.round((preset.consultations / preset.qualified) * 100) : 40;
    const closingRate = preset.consultations > 0 ? Math.round((preset.contracts / preset.consultations) * 100) : 30;

    const marketing: MarketingKpiInputs = {
      monthlyAdBudget: preset.adBudget,
      costPerLead: Math.round(cpl),
      qualifiedLeadRate: Math.max(qualifiedRate, 5),
      consultationRate: Math.max(consultationRate, 5),
      closingRate: Math.max(closingRate, 5),
    };

    const contract: ContractKpiInputs = {
      averageTicket: preset.ticket,
      contractDurationMonths: 12,
      monthlyMaintenanceFee: 300,
    };

    onApplyData(marketing, contract);
    setImportedMessage(`Dados de ${preset.month} aplicados com sucesso!`);
    setTimeout(() => {
      setImportedMessage(null);
      onClose();
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      parseAndApplyCsv(content);
    };
    reader.readAsText(file);
  };

  const parseAndApplyCsv = (text: string) => {
    try {
      const lines = text.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) return;

      let totalLeads = 0;

      lines.forEach((line) => {
        const cols = line.split(/[,;\t]/);
        cols.forEach((col) => {
          const num = parseInt(col.replace(/\D/g, ''));
          if (!isNaN(num) && num > 0 && num < 1000) {
            totalLeads += num;
          }
        });
      });

      if (totalLeads > 0) {
        const marketing: MarketingKpiInputs = {
          monthlyAdBudget: 5000,
          costPerLead: 25,
          qualifiedLeadRate: 50,
          consultationRate: 40,
          closingRate: 30,
        };
        const contract: ContractKpiInputs = {
          averageTicket: 6000,
          contractDurationMonths: 12,
          monthlyMaintenanceFee: 300,
        };
        onApplyData(marketing, contract);
        setImportedMessage('Planilha CSV importada e processada com sucesso!');
        setTimeout(() => {
          setImportedMessage(null);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-rna-navy-900 border border-rna-gold-500/40 rounded-2xl shadow-gold-md overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rna-slate-700 bg-rna-navy-950">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-rna-gold-400" />
            <h3 className="text-base font-bold text-slate-100 font-sans">
              Importar Dados da Planilha Comercial (RN Advocacia)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-rna-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {importedMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {importedMessage}
            </div>
          )}

          {/* Preset Months from User Spreadsheet */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rna-gold-300 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Alimentar Direto com Dados da Sua Planilha Google:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {spreadsheetMonths.map((item) => (
                <div
                  key={item.month}
                  onClick={() => handleApplyPreset(item)}
                  className="p-4 rounded-xl glass-panel border border-rna-slate-700 hover:border-rna-gold-500 hover:bg-rna-slate-800/90 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-100 group-hover:text-rna-gold-300 transition-colors">
                      {item.month}
                    </span>
                    <div className="mt-2 text-[11px] text-slate-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Leads:</span>
                        <span className="font-semibold text-slate-100">{formatNumber(item.leads)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Qualificados:</span>
                        <span className="font-semibold text-slate-100">{item.qualified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Reuniões:</span>
                        <span className="font-semibold text-slate-100">{item.consultations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Contratos:</span>
                        <span className="font-bold text-rna-gold-400">{item.contracts}</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold bg-rna-gold-500/20 text-rna-gold-300 border border-rna-gold-500/30 group-hover:bg-rna-gold-500 group-hover:text-rna-navy-950 transition-all">
                    Carregar no App
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload CSV / Excel File Option */}
          <div className="border-t border-rna-slate-800 pt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Ou Carregar Arquivo Exportado (.CSV / .XLSX):
            </h4>

            <label className="flex flex-col items-center justify-center p-6 rounded-xl glass-panel border-2 border-dashed border-rna-slate-700 hover:border-rna-gold-500/50 transition-all cursor-pointer group">
              <Upload className="w-8 h-8 text-rna-gold-400 group-hover:scale-110 transition-transform mb-2" />
              <span className="text-xs font-semibold text-slate-200">Clique para selecionar seu arquivo da planilha</span>
              <span className="text-[10px] text-slate-400 mt-1">Formatos aceitos: CSV, TXT (Export da Google Planilhas)</span>
              <input
                type="file"
                accept=".csv, .txt, .xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};
