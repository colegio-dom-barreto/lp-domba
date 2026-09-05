# LP Matrículas — Dom Barreto (Next.js)

Reconstrução da página `/matriculas-abertas-2` fora do WordPress, para rodar
100% estática em CDN (Vercel) e aguentar tráfego de campanha sem depender do
PHP/banco do WordPress.

## Atualização: campanha "Fortes por dentro. Livres para ir longe."

- **Hero reconstruído** com a mesma mensagem e foto real da campanha (a foto
  da ex-aluna em frente ao colégio), com o headline recriado como texto
  vivo/responsivo — não é a imagem do anúncio "achatada", então o texto
  reflui e escala corretamente em qualquer tela.
- **Fonte trocada**: em vez da manuscrita tipo marcador do folder impresso,
  os títulos agora usam a mesma família sans bold e arredondada dos
  criativos da campanha (Poppins ExtraBold/900) — visual mais moderno e
  também mais legível em telas pequenas. Cores, brasão, chevrons e fotos do
  folder continuam os mesmos.
- **Nova seção "Essa é a campanha que te trouxe até aqui"** logo após o
  Hero, mostrando os dois anúncios originais completos
  (`public/campanha-anuncio-menina.jpg` e `public/campanha-anuncio-menino.jpg`)
  lado a lado — reforça o reconhecimento de quem chegou pelo anúncio.

## Identidade visual

Reconstruída a partir do `folder-Domba-web.pdf` que vocês enviaram — não do
site antigo:

- **Cores exatas** extraídas por pixel do PDF: navy `#06396E`, vermelho
  `#BE1716`, dourado `#FFCC00`, azul-claro `#4CAAE0`.
- **Brasão e logotipo** extraídos do próprio PDF em alta resolução, com fundo
  transparente, em `public/brasao-dombarreto.png` e
  `public/logo-dombarreto.png`.
- **Fotos** também extraídas do PDF (capa, salas, Montessori, período
  integral, esportes, conquistas) — já estão em `public/`.
- **Fonte dos títulos**: o folder usa uma fonte manuscrita tipo marcador, em
  caixa alta. Usei `Permanent Marker` (Google Fonts) como aproximação mais
  próxima disponível gratuitamente. **Se vocês tiverem o arquivo da fonte
  original** da identidade (pedir pro estúdio que fez o folder), troque em
  `app/layout.tsx` para ficar pixel-perfect.
- **Faixas chevron** entre os blocos de segmento (vermelho→dourado para
  Infantil/Fund I, navy→azul-claro para Fund II/Médio) recriadas em
  `components/ChevronBanner.tsx`, iguais às do folder.

## O que mudou em relação à página atual

- **4 formulários → 1 formulário** com um seletor de "etapa de interesse".
  Mesmo resultado para o time de matrículas, um único componente pra manter,
  menos JS carregado.
- **Joinchat (plugin) → botão wa.me simples**, sem script de terceiro pesado.
- **Elementor/PHP → HTML estático servido por CDN.** Isso é o que resolve a
  lentidão: não tem banco de dados nem PHP sendo executado a cada visita.
- Formulário grava direto numa **Google Sheet** + dispara **e-mail** — sem
  precisar de CRM ou backend próprio (ajustável depois se vocês adotarem um
  CRM).

## 1. Rodar localmente

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## 2. Configurar o recebimento de leads (Google Apps Script)

Está tudo documentado em `apps-script/Code.gs`, resumindo:

1. Crie uma Google Sheet com os cabeçalhos:
   `data | segmento | responsavel | email | celular | aluno | serieAno | pagina`
2. Extensões → Apps Script → cole o conteúdo de `Code.gs`.
3. Troque `NOTIFY_EMAIL` pelo e-mail da Central de Matrículas.
4. Implantar → Nova implantação → tipo **App da Web**, executar como você,
   acesso **Qualquer pessoa**.
5. Copie a URL `.../exec` e cole em `NEXT_PUBLIC_LEADS_ENDPOINT` no `.env.local`
   (e depois nas variáveis de ambiente do Vercel).

Isso leva ~10 minutos e já resolve "onde os leads caem" sem precisar de CRM.

## 3. Deploy no Vercel

1. Suba este projeto num repositório (GitHub/GitLab).
2. Em vercel.com → New Project → importe o repositório.
3. Em Settings → Environment Variables, adicione:
   - `NEXT_PUBLIC_GTM_ID`
   - `NEXT_PUBLIC_LEADS_ENDPOINT`
4. Deploy.

## 4. Apontar o subdomínio (matriculas.domba.com.br)

Como vocês optaram por subdomínio (mais rápido que reescrever a URL atual):

1. No Vercel, em Settings → Domains, adicione `matriculas.domba.com.br`.
2. O Vercel mostra um registro **CNAME** para criar. No painel de DNS onde o
   domínio `domba.com.br` está hospedado, crie:
   - Tipo: `CNAME`
   - Nome: `matriculas`
   - Valor: `cname.vercel-dns.com`
3. Propaga geralmente em minutos, pode levar até algumas horas.
4. Os anúncios (Google Ads/Meta) devem apontar para
   `https://matriculas.domba.com.br`.

> Isso não interfere no restante do site em WordPress — só cria um novo
> subdomínio, o `domba.com.br` continua igual.

## 5. Antes de ligar a campanha (checklist)

- [ ] Trocar `PHONE` em `components/WhatsappButton.tsx` pelo número real
      (formato `55` + DDD + número, só dígitos).
- [ ] Conferir se o `NEXT_PUBLIC_GTM_ID` é o container certo e se as tags de
      conversão (Google Ads / Meta Pixel) estão publicadas dentro do GTM.
- [ ] Testar os 4 fluxos de segmento (Infantil, Fund I, Fund II, Médio) de
      ponta a ponta e conferir se a linha aparece na planilha + chega o e-mail.
- [ ] Rodar o Lighthouse (Chrome DevTools) na versão publicada — a meta é
      90+ em performance mobile.
- [ ] Adicionar fotos reais do colégio (a página atual carrega os banners via
      background-image do Elementor; não vieram no conteúdo extraído — troque
      os placeholders de `public/` pelas imagens reais em `.webp`).
- [ ] Testar em um celular real, não só no simulador do navegador.

## Estrutura

```
app/            rota principal (App Router)
components/     seções da página + formulário
lib/analytics.ts   helper para eventos do GTM/dataLayer
apps-script/    código do backend de leads (Google Apps Script)
```

## Analytics (GTM + GA4)

O app não carrega gtag.js direto — todo evento é empurrado para
`window.dataLayer` via `trackEvent()` (`lib/analytics.ts`) e quem decide o que
fazer com cada evento é o container do GTM (`NEXT_PUBLIC_GTM_ID`, hoje
`GTM-5C5S23PJ`). Isso evita contagem duplicada e permite trocar/ligar
propriedades de analytics (GA4, Ads, Meta Pixel) sem mexer no código.

Eventos disparados hoje pelo app:

| Evento                  | Quando dispara                              | Parâmetros                    |
| ------------------------ | -------------------------------------------- | ------------------------------ |
| `gerar_lead`             | envio bem-sucedido do formulário             | `segmento`                     |
| `clique_whatsapp`        | clique em qualquer link/botão do WhatsApp    | `local` (`hero`/`botao_flutuante`) |
| `clique_agendar_visita`  | clique nos CTAs "Agende sua visita"          | `local` (`header`/`hero`)      |
| `clique_quero_saber_mais`| clique em "Quero saber mais" por segmento    | `segmento`                     |
| `clique_rede_social`     | clique nos links do rodapé                   | `rede` (`facebook`/`instagram`/`youtube`) |
| `scroll_depth`           | usuário rola 25/50/75/100% da página         | `percentual`                   |
| `web_vitals`             | métricas de Core Web Vitals (LCP, CLS, etc.) | `metric_name`, `metric_value`, `metric_rating`, `metric_id`, `metric_delta` |

### Ligando isso ao GA4 (ainda não configurado — falta o Measurement ID)

Ainda não existe uma propriedade GA4 criada para este projeto. Quando ela
existir, **não** é necessário mexer no código — configure dentro do próprio
GTM:

1. Crie a propriedade GA4 no [Google Analytics](https://analytics.google.com)
   e copie o Measurement ID (`G-XXXXXXX`).
2. No [GTM](https://tagmanager.google.com), dentro do container
   `GTM-5C5S23PJ`:
   - Crie uma tag **Google Analytics: GA4 Configuration** com esse
     Measurement ID, trigger "All Pages".
   - Para cada evento da tabela acima, crie um **Custom Event Trigger**
     (nome do evento = valor da coluna "Evento") e uma tag **GA4 Event**
     apontando para a tag de configuração, mapeando os parâmetros via
     variáveis de camada de dados (Data Layer Variable) com o mesmo nome dos
     parâmetros da tabela.
3. Publique o container e confira no GA4 → DebugView (ou no próprio Preview
   do GTM) se os eventos chegam.

Não é necessário nenhuma variável de ambiente nova para isso — o GA4 vive
inteiramente dentro do container do GTM.
