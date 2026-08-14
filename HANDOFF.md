# Documento Oficial de Handoff (Entrega Técnica & Operacional)
## Projeto: RNA KPI Calculator — Rian Nicolau Advocacia

---

> **Cliente**: Rian Nicolau Advocacia • **OAB/CE 2.057**  
> **Desenvolvido por**: Tamar AI (AI Automation & Growth Engineering)  
> **URL Oficial de Produção**: [https://kpi.riannicolauadv.adv.br](https://kpi.riannicolauadv.adv.br)  
> **Repositório GitHub**: [github.com/riannicolauadvocacia09-max/app_kpi](https://github.com/riannicolauadvocacia09-max/app_kpi)  
> **Hospedagem**: Netlify (`app-kpi-rn.netlify.app` • CNAME no cPanel Hostgator)  
> **Data de Entrega**: 14 de Agosto de 2026

---

## 1. Resumo do Projeto

O **RNA KPI Calculator** é uma aplicação web e Progressive Web App (PWA) de inteligência de dados comerciais, gestão de tráfego pago (Meta Ads e Google Ads) e previsibilidade de honorários. A plataforma conecta-se ao vivo com as planilhas do escritório, mapeia gargalos de atendimento no WhatsApp e gera planos de ação semanais prescrevendo decisões com precisão matemática.

---

## 2. Arquitetura do Sistema (Padrão MVC)

O projeto foi estruturado no padrão **Model-View-Controller (MVC)** para garantir fácil manutenção, escalabilidade e separação de responsabilidades:

```
c:\Users\Rian Nicolau\Desktop\app-kpi\src\
├── models/                     # [M] Regras Matemáticas & Parsers de Dados
│   ├── kpiModel.ts             # Cálculos de CAC, LTV, ROAS, diagnósticos e cenários
│   └── googleSheetsModel.ts    # Parser de CSV e normalizador da Planilha Google
├── services/                   # Camada de Serviços HTTP
│   └── googleSheetsService.ts  # Conexão ao vivo com as tabelas públicas do Google
├── controllers/                # [C] Controller de Estado & Ações
│   └── useKpiController.ts     # Hook central que gerencia estados, inputs e syncing
├── views/                      # [V] Apresentação & Telas da Interface
│   ├── HeaderView.tsx          # Topo institucional com logo da marca e botões
│   ├── OverviewView.tsx        # Dashboard executivo, stat cards e Recharts
│   ├── GoogleSheetsModalView.tsx# Modal para link/ID do Google Sheets e sincronização
│   └── ...                     # Demais telas e componentes
└── App.tsx                     # Container Principal
```

---

## 3. Identidade Visual & Brand Guidelines

A aplicação foi construída em total conformidade com o **Manual da Marca da Rian Nicolau Advocacia**:

- **Azul Marinho Principal**: `#141831` (`RGB: 20 // 24 // 49`)
- **Dourado Ouro Accent**: `#F8B03B` (`RGB: 248 // 176 // 59`)
- **Tipografia**: `Bebas Neue` (marca e títulos) e `Inter` (corpo e tabelas de dados).
- **Logotipo Vetorial**: Componente `RnLogo` exibindo o monograma `RN | RIAN NICOLAU OAB/CE 2.057 ADVOCACIA`.

---

## 4. Integração com o Google Sheets

- **Planilha Oficial do Escritório**: `PLANILHA_COMERCIAL_RN_ADVOCACIA_2026_TRAFEGO_PAGO`
- **ID Padrão da Planilha**: `11DAw0_gtduCtPJYuhZM0iQ0tbaSYbGAF`
- **Abas Sincronizadas ao Vivo**: `RESUMO_MENSAL`, `CONTROLE_DIARIO`, `RESUMO_SEMANAL`.
- **Como Sincronizar**: Clique no botão **"Sincronizar Google Sheets"** no topo da tela ➔ Selecione a aba ➔ Clique em **"Sincronizar Agora"**.

---

## 5. Fluxo de Publicação e Manutenção (Deploy Contínuo)

A aplicação está configurada com **CI/CD Automático via GitHub ➔ Netlify**.

### Como atualizar o código em produção:
Qualquer alteração feita no código local é enviada para o GitHub e publicada no ar automaticamente em segundos:

```bash
# 1. Adicionar alterações
git add .

# 2. Criar o commit
git commit -m "feat: descrição da nova funcionalidade"

# 3. Enviar para a branch principal (Netlify faz o deploy automático)
git push origin main
```

---

## 6. Compliance & OAB (Provimento 205/2021)

- **Inscrição da Sociedade**: `OAB/CE 2.057` fixada nos cabeçalhos e rodapé.
- **Vedação de Gratuidade**: Textos normatizados sem uso de palavras proibidas ("grátis", "gratuito").
- **Disclaimer Institucional**: Fixado no rodapé:  
  *“Este conteúdo tem caráter informativo e não constitui aconselhamento jurídico individualizado.”*

---

> **Declaração de Handoff**: Projeto finalizado, testado, documentado e entregue com sucesso em produção no subdomínio oficial `https://kpi.riannicolauadv.adv.br`.
