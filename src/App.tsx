import { useKpiController } from './controllers/useKpiController';
import { HeaderView } from './views/HeaderView';
import { OverviewView } from './views/OverviewView';
import { CacRoasCalculator } from './components/CacRoasCalculator';
import { LtvCalculator } from './components/LtvCalculator';
import { SalesFunnelCalculator } from './components/SalesFunnelCalculator';
import { RevenueGoalSimulator } from './components/RevenueGoalSimulator';
import { ActionPlanPlanner } from './components/ActionPlanPlanner';
import { ScenarioPresets } from './components/ScenarioPresets';
import { GoogleSheetsModalView } from './views/GoogleSheetsModalView';
import { Footer } from './components/Footer';

export function App() {
  const controller = useKpiController();

  return (
    <div className="min-h-screen bg-rna-navy-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Glow Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rna-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* [V] Header View */}
      <HeaderView
        onReset={controller.resetToDefault}
        onOpenImportModal={controller.openImportModal}
        activeTab={controller.activeTab}
        setActiveTab={controller.setActiveTab}
      />

      {/* [V] Live Google Sheets Sync Modal View */}
      <GoogleSheetsModalView
        isOpen={controller.isImportModalOpen}
        onClose={controller.closeImportModal}
        onApplyData={controller.applyPreset}
        onSyncLive={controller.syncGoogleSheetsLive}
        isSyncing={controller.isSyncing}
        syncError={controller.syncError}
        syncSuccessMessage={controller.syncSuccessMessage}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10">
        
        {/* Preset Scenarios Strip */}
        <ScenarioPresets
          currentMarketing={controller.marketingInputs}
          currentContract={controller.contractInputs}
          onApplyPreset={controller.applyPreset}
        />

        {/* Tab 1: Visão Geral / Dashboard Overview */}
        {controller.activeTab === 'overview' && (
          <OverviewView
            marketingInputs={controller.marketingInputs}
            contractInputs={controller.contractInputs}
            marketingResults={controller.marketingResults}
            ltvResults={controller.ltvResults}
            onMarketingChange={controller.updateMarketingInput}
            onContractChange={controller.updateContractInput}
          />
        )}

        {/* Tab 2: CAC & ROAS */}
        {controller.activeTab === 'marketing' && (
          <CacRoasCalculator
            inputs={controller.marketingInputs}
            results={controller.marketingResults}
            averageTicket={controller.contractInputs.averageTicket}
            onChange={controller.updateMarketingInput}
          />
        )}

        {/* Tab 3: LTV */}
        {controller.activeTab === 'ltv' && (
          <LtvCalculator
            contractInputs={controller.contractInputs}
            ltvResults={controller.ltvResults}
            cac={controller.marketingResults.costPerAcquisition}
            onChange={controller.updateContractInput}
          />
        )}

        {/* Tab 4: Funil de Vendas */}
        {controller.activeTab === 'funnel' && (
          <SalesFunnelCalculator
            inputs={controller.marketingInputs}
            results={controller.marketingResults}
            averageTicket={controller.contractInputs.averageTicket}
          />
        )}

        {/* Tab 5: Simulador de Metas */}
        {controller.activeTab === 'simulator' && (
          <RevenueGoalSimulator
            marketingInputs={controller.marketingInputs}
            contractInputs={controller.contractInputs}
          />
        )}

        {/* Tab 6: Plano de Ação & Decisões */}
        {controller.activeTab === 'action-plan' && (
          <ActionPlanPlanner
            marketingInputs={controller.marketingInputs}
            marketingResults={controller.marketingResults}
            ltvResults={controller.ltvResults}
          />
        )}

      </main>

      {/* [V] Footer View */}
      <Footer />
    </div>
  );
}

export default App;
