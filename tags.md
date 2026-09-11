# Tags e Google Tag Manager — Colégio Dom Barreto (LP Matrículas)

Este documento resume **tudo que já está implementado no código** (o que dispara eventos para o `dataLayer`) e o passo a passo para configurar isso dentro do **Google Tag Manager (GTM)**, já que o container ainda está vazio (sem tags criadas).

---

## 1. IDs já configurados no projeto (`.env`)

| Variável | Valor atual | Onde é usado |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | `GTM-5V323LWV` | Snippet do GTM injetado em `app/layout.tsx` (`<head>` + `<noscript>`) |
| `NEXT_PUBLIC_GA_ID` | `G-YV3RKBVVKP` | Script `gtag.js` carregado **diretamente** em `app/layout.tsx` |
| `NEXT_PUBLIC_LEADS_ENDPOINT` | URL do Google Apps Script | Envio do formulário de lead (`components/LeadForm.tsx`) |

⚠️ **Ponto de atenção importante:** hoje o site carrega o **GTM** *e também* o **gtag.js do GA4 diretamente**, configurando `gtag('config', 'G-YV3RKBVVKP')` fora do Tag Manager (`app/layout.tsx`, linhas 44-59). Isso significa que:

- O GA4 **já está recebendo pageviews automaticamente**, mesmo sem nenhuma tag configurada no GTM — porque o `gtag.js` direto faz isso sozinho.
- Se no futuro você criar uma **tag de Configuração do GA4 dentro do GTM** usando o mesmo Measurement ID, o GA4 vai contar o pageview **em dobro** (uma vez pelo script direto, outra pela tag do GTM).

**Recomendação:** escolha um dos dois caminhos:
- **Opção A (recomendada):** remover o bloco de `gtag.js` direto do `layout.tsx` e mover a configuração do GA4 inteiramente para dentro do GTM (cria a tag "Configuração do GA4" lá). Mais fácil de manter, tudo centralizado no GTM.
- **Opção B:** manter o `gtag.js` direto para o pageview base e usar o GTM **apenas** para os eventos customizados (cliques, scroll, lead, etc.), sem criar uma segunda tag de "Configuração GA4" no GTM (para não duplicar pageview).

Este documento assume a **Opção A**, por ser o padrão recomendado pelo Google e o mais fácil de escalar (Ads, Meta Pixel, etc. depois).

---

## 2. Como o dataLayer funciona neste site

Toda a instrumentação de eventos passa por uma única função central: `lib/analytics.ts`.

```ts
export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
  window.gtag?.("event", eventName, payload); // fallback direto, se o gtag.js estiver carregado
}
```

Ou seja: cada evento chega ao `dataLayer` como:

```js
{ event: "nome_do_evento", ...parametros }
```

O GTM escuta esses `push` no `dataLayer` através de **triggers do tipo "Custom Event"** com o nome exato do evento.

---

## 3. Inventário completo de eventos disparados pelo site

| Evento (`event`) | Onde é disparado | Parâmetros enviados | Quando dispara |
|---|---|---|---|
| `gtm.js` / pageview | Snippet padrão do GTM (automático) | — | Toda navegação inicial (SPA do Next não gera novos `gtm.js`, apenas o primeiro load) |
| `web_vitals` | `components/WebVitals.tsx` → `lib/analytics.ts` (`reportWebVitals`) | `metric_name` (CLS/LCP/FID/INP/TTFB), `metric_id`, `metric_value`, `metric_rating` (good/needs-improvement/poor), `metric_delta` | Automático, quando o Next mede cada métrica de Web Vitals |
| `scroll_depth` | `components/ScrollDepth.tsx` | `percentual` (25, 50, 75 ou 100) | Ao usuário rolar a página e atingir cada marco de profundidade |
| `clique_agendar_visita` | `components/Hero.tsx` | `local` (`"header"` ou `"hero"`) | Clique nos botões "Agendar visita" |
| `clique_whatsapp` | `components/Hero.tsx` e `components/WhatsappButton.tsx` | `local` (`"hero"` ou `"botao_flutuante"`) | Clique nos botões de WhatsApp |
| `clique_rede_social` | `components/Footer.tsx` | `rede` (`"facebook"`, `"instagram"`, `"youtube"`, `"site"`) | Clique nos ícones de redes sociais do rodapé |
| `clique_quero_saber_mais` | `components/SegmentSelector.tsx` | `segmento` (ex.: infantil, fundamental1, fundamental2, medio) | Clique em "Quero saber mais" no seletor de segmento |
| `gerar_lead` | `components/LeadForm.tsx` | `segmento` | Envio bem-sucedido do formulário de matrícula (lead) |
| `view_lp_whatsapp` | `components/PageViewTracker.tsx`, usado em `app/whatsapp/page.tsx` | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | Visualização da landing page específica `/whatsapp` (útil para campanhas de Click-to-WhatsApp) |

**Evento mais importante para conversão:** `gerar_lead` — é o evento que representa um lead qualificado enviado pelo formulário. Esse é o principal candidato a virar **conversão no GA4** e **conversão no Google Ads**.

---

## 4. Passo a passo: configurar o GTM do zero

### 4.1 Confirmar o container
1. Acesse [tagmanager.google.com](https://tagmanager.google.com).
2. Confirme que existe um container com o ID **`GTM-5V323LWV`** (o mesmo do `.env`). Se ainda não existir, crie um container do tipo **Web** com esse mesmo ID de destino (ou gere um novo e atualize o `.env`).

### 4.2 Criar as Variáveis (Variables)
No GTM, vá em **Variáveis → Novo** e crie uma **Variável de Camada de Dados (Data Layer Variable)** para cada parâmetro que você quer usar nas tags/triggers. Nomeie de forma consistente, por exemplo:

| Nome da variável no GTM | Nome da variável no Data Layer |
|---|---|
| `DLV - local` | `local` |
| `DLV - rede` | `rede` |
| `DLV - segmento` | `segmento` |
| `DLV - percentual` | `percentual` |
| `DLV - metric_name` | `metric_name` |
| `DLV - metric_value` | `metric_value` |
| `DLV - metric_rating` | `metric_rating` |
| `DLV - utm_source` | `utm_source` |
| `DLV - utm_medium` | `utm_medium` |
| `DLV - utm_campaign` | `utm_campaign` |
| `DLV - utm_content` | `utm_content` |

Também ative as **Variáveis internas** padrão: `Page URL`, `Page Path`, `Referrer`, `Click URL`, `Click Text` (em **Variáveis → Configurar**).

### 4.3 Criar os Triggers (Acionadores)
Vá em **Acionadores → Novo → Evento personalizado** e crie um trigger para cada evento da tabela da seção 3. Exemplo:

- Nome: `CE - gerar_lead`
- Tipo: Evento personalizado
- Nome do evento: `gerar_lead`
- Dispara em: Todos os eventos personalizados

Repita para: `clique_agendar_visita`, `clique_whatsapp`, `clique_rede_social`, `clique_quero_saber_mais`, `scroll_depth`, `web_vitals`, `view_lp_whatsapp`.

### 4.4 Criar a tag de Configuração do GA4
1. **Tags → Nova → Google Analytics: Configuração do GA4**.
2. **ID de mensuração:** `G-YV3RKBVVKP`.
3. **Acionamento:** `All Pages` (Initialization / pageview padrão).
4. Nomeie como `GA4 - Configuração`.

> Depois de publicar essa tag, remova o script `gtag.js` direto do `app/layout.tsx` (linhas 44-59) para evitar pageview duplicado — veja seção 1.

### 4.5 Criar as tags de Evento do GA4
Para **cada evento** da tabela da seção 3, crie uma tag:

1. **Tags → Nova → Google Analytics: Evento do GA4**.
2. **Tag de configuração:** selecione a `GA4 - Configuração` criada acima.
3. **Nome do evento:** use o mesmo nome do evento (ex.: `gerar_lead`, `clique_whatsapp`, etc.) ou um nome padronizado em inglês, se preferir (ex.: `generate_lead`).
4. **Parâmetros do evento:** mapeie os parâmetros usando as variáveis criadas no passo 4.2. Exemplo para `gerar_lead`:
   - `segmento` → `{{DLV - segmento}}`
5. **Acionamento:** o trigger correspondente criado no passo 4.3 (ex.: `CE - gerar_lead`).

Tags sugeridas:

| Tag GTM | Nome do evento no GA4 | Trigger | Parâmetros |
|---|---|---|---|
| `GA4 - Gerar Lead` | `gerar_lead` | `CE - gerar_lead` | `segmento` |
| `GA4 - Clique Agendar Visita` | `clique_agendar_visita` | `CE - clique_agendar_visita` | `local` |
| `GA4 - Clique WhatsApp` | `clique_whatsapp` | `CE - clique_whatsapp` | `local` |
| `GA4 - Clique Rede Social` | `clique_rede_social` | `CE - clique_rede_social` | `rede` |
| `GA4 - Quero Saber Mais` | `clique_quero_saber_mais` | `CE - clique_quero_saber_mais` | `segmento` |
| `GA4 - Scroll Depth` | `scroll_depth` | `CE - scroll_depth` | `percentual` |
| `GA4 - Web Vitals` | `web_vitals` | `CE - web_vitals` | `metric_name`, `metric_value`, `metric_rating` |
| `GA4 - View LP WhatsApp` | `view_lp_whatsapp` | `CE - view_lp_whatsapp` | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` |

### 4.6 Marcar `gerar_lead` como conversão no GA4
1. No **GA4** (não no GTM): **Administrador → Eventos**.
2. Depois que o evento `gerar_lead` começar a aparecer (pode levar até 24h ou aparecer em tempo real em **Relatórios → Tempo real**), ative o toggle **"Marcar como conversão"** ao lado dele.

### 4.7 (Opcional, recomendado) Google Ads — conversão de lead
Se houver campanhas no Google Ads:
1. **Tags → Nova → Rastreamento de Conversão do Google Ads**.
2. Informe **ID de conversão** e **rótulo de conversão** (gerados no Google Ads em Ferramentas → Conversões → Nova conversão → Site).
3. **Acionamento:** o mesmo `CE - gerar_lead`.
4. Isso permite otimizar campanhas do Google Ads diretamente pelo evento de lead do formulário.

### 4.8 Testar no modo Preview
1. No GTM, clique em **Preview**, informe a URL do site (produção ou local).
2. Isso abre o **Tag Assistant** conectado ao site.
3. Navegue pela LP: clique nos botões de WhatsApp, "Agendar Visita", role a página, envie o formulário de teste.
4. Confirme na aba **Summary** do Tag Assistant que cada evento (`clique_whatsapp`, `scroll_depth`, `gerar_lead`, etc.) aparece na timeline e que as tags correspondentes dispararam ("Tags Fired").
5. Confirme no **GA4 → Relatórios → Tempo real** que os eventos estão chegando com os parâmetros certos.

### 4.9 Publicar
1. Volte ao GTM, clique em **Enviar (Submit)**.
2. Dê um nome de versão (ex.: "v1 - Tags iniciais GA4 + eventos LP matrículas") e uma descrição.
3. Clique em **Publicar**.

---

## 5. Checklist resumido

- [ ] Confirmar/criar container GTM `GTM-5V323LWV`
- [ ] Criar variáveis de Data Layer (seção 4.2)
- [ ] Criar triggers de evento personalizado para os 8 eventos (seção 4.3)
- [ ] Criar tag de Configuração do GA4 (seção 4.4)
- [ ] Remover `gtag.js` direto do `layout.tsx` após a tag de Configuração estar publicada (evitar pageview duplicado)
- [ ] Criar as 8 tags de evento do GA4 (seção 4.5)
- [ ] Marcar `gerar_lead` como conversão no GA4 (seção 4.6)
- [ ] (Opcional) Criar tag de conversão do Google Ads para `gerar_lead` (seção 4.7)
- [ ] Testar tudo em modo Preview (seção 4.8)
- [ ] Publicar o container (seção 4.9)

---

## 6. Referência rápida de arquivos do código

| Arquivo | Papel |
|---|---|
| `app/layout.tsx` | Injeta o snippet do GTM e (hoje) o `gtag.js` direto do GA4 |
| `lib/analytics.ts` | Função central `trackEvent()` que envia tudo pro `dataLayer` |
| `components/WebVitals.tsx` | Dispara `web_vitals` |
| `components/ScrollDepth.tsx` | Dispara `scroll_depth` |
| `components/Hero.tsx` | Dispara `clique_agendar_visita` e `clique_whatsapp` |
| `components/WhatsappButton.tsx` | Dispara `clique_whatsapp` (botão flutuante) |
| `components/Footer.tsx` | Dispara `clique_rede_social` |
| `components/SegmentSelector.tsx` | Dispara `clique_quero_saber_mais` |
| `components/LeadForm.tsx` | Dispara `gerar_lead` no envio do formulário |
| `components/PageViewTracker.tsx` | Dispara `view_lp_whatsapp` (e pode ser reutilizado em outras páginas) |
