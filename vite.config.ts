import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'RNA KPI Calculator - Rian Nicolau Advocacia',
        short_name: 'RNA KPI',
        description: 'Calculadora de KPIs e Previsibilidade Financeira Jurídica',
        theme_color: '#0B1B2B',
        background_color: '#08121E',
        display: 'standalone',
        orientation: 'portrait-primary',
      }
    })
  ]
})
