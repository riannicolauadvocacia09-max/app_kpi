# RNA KPI Calculator — Rian Nicolau Advocacia

> **Aplicação Web & PWA de Inteligência de Métricas, CAC, LTV, ROAS e Previsibilidade Financeira Jurídica**  
> **Escritório**: Rian Nicolau Advocacia • **OAB/CE 2.057**

---

## 📌 Apresentação do Projetos

O **RNA KPI Calculator** é um painel estratégico desenvolvido para otimização contínua de campanhas de tráfego pago (Meta Ads e Google Ads), acompanhamento de metas financeiras e diagnóstico sem adivinhação para a gestão da **Rian Nicolau Advocacia**.

---

## 🎨 Identidade Visual Institucional (Brand Guidelines)

A interface foi estruturada em consonância com o **Manual de Identidade Visual** do escritório:
- **Azul Marinho Oficial**: `#141831` (`RGB: 20, 24, 49` | `CMYK: 94%, 96%, 58%, 49%`)
- **Dourado Ouro Accent**: `#F8B03B` (`RGB: 248, 176, 59` | `CMYK: 0%, 42%, 85%, 0%`)
- **Tipografia**: `Bebas Neue` (Logotipo e Títulos) & `Inter` (Leitura de Dados e Tabelas)
- **Monograma Vetorial**: `RN | RIAN NICOLAU OAB/CE 2.057 ADVOCACIA`

---

## 🛠️ Funcionalidades Principais

- **Dashboard de Visão Geral**: Cards de CAC Médio, LTV por Cliente, Razão LTV/CAC e ROAS.
- **Calculadora CAC & ROAS**: Simulação em tempo real de investimento, CPL, qualificação e taxas de conversão.
- **Calculadora de LTV (Lifetime Value)**: Análise de contrato em 12, 24 ou 36 meses com badge de saúde operacional.
- **Funil de Conversão Comercial**: Identificação de gargalos na jornada do lead (WhatsApp / Agendamentos).
- **Simulador de Metas de Faturamento**: Engenharia reversa de metas mensais (ex: R$ 100.000/mês), calculando a cota diária de reuniões e investimento em mídia.
- **Plano de Ação Semanal & Decisões**: Matriz de decisão automática prescrevendo ajustes de criativos, tempo de resposta no WhatsApp ou sinal verde para escala.
- **Sincronização ao Vivo com Google Sheets**: Conexão direta com a planilha comercial do escritório (`PLANILHA_COMERCIAL_RN_ADVOCACIA_2026_TRAFEGO_PAGO`).
- **Relatório PDF & PWA**: Exportação de relatórios para reunião de sócios e suporte para instalação em smartphones/PC.

---

## 🏗️ Arquitetura MVC (Model-View-Controller)

```
src/
├── models/                     # [M] Regras Matemáticas & Parsers de Dados
│   ├── kpiModel.ts
│   └── googleSheetsModel.ts
├── services/                   # Camada de Serviços de Conexão HTTP
│   └── googleSheetsService.ts
├── controllers/                # [C] Controller de Estado & Ações
│   └── useKpiController.ts
├── views/                      # [V] Interface & Componentes de Tela
│   ├── HeaderView.tsx
│   ├── OverviewView.tsx
│   ├── GoogleSheetsModalView.tsx
│   └── ...
└── App.tsx                     # Container Principal
```

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Gerar bundle de produção
npm run build
```

---

## 🛡️ Compliance OAB

Desenvolvido sob as diretrizes do **Provimento OAB 205/2021**:
- Inclusão do registro da sociedade **OAB/CE 2.057**.
- Isenção de termos de oferta gratuita.
- Disclaimer institucional: *"Este conteúdo tem caráter informativo e não constitui aconselhamento jurídico individualizado."*
