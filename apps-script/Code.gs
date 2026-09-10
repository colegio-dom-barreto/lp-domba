/**
 * COMO USAR:
 * 1. Crie uma Google Sheet nova. Na primeira linha, adicione os cabeçalhos:
 *    data | segmento | responsavel | email | celular | aluno | serieAno | pagina
 * 2. Extensões > Apps Script. Cole este código substituindo o padrão.
 * 3. Troque NOTIFY_EMAIL abaixo pelo e-mail que deve receber cada lead.
 * 4. Implantar > Nova implantação > tipo "App da Web".
 *    - Executar como: Eu (sua conta)
 *    - Quem tem acesso: Qualquer pessoa
 * 5. Copie a URL gerada (termina em /exec) e coloque em
 *    NEXT_PUBLIC_LEADS_ENDPOINT no .env do Next.js.
 */

const NOTIFY_EMAIL = "matricula@colegiodombarreto.com.br";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const body = JSON.parse(e.postData.contents);

  sheet.appendRow([
    body.data || new Date().toISOString(),
    body.segmento || "",
    body.responsavel || "",
    body.email || "",
    body.celular || "",
    body.aluno || "",
    body.serieAno || "",
    body.pagina || "",
    body.utm_source || "",
    body.utm_medium || "",
    body.utm_campaign || "",
    body.utm_content || "",
  ]);

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: `Novo lead - ${body.segmento || "Matrículas"} - ${body.aluno || ""}`,
      body:
        `Novo contato pela LP de matrículas:\n\n` +
        `Responsável: ${body.responsavel}\n` +
        `E-mail: ${body.email}\n` +
        `Celular: ${body.celular}\n` +
        `Aluno: ${body.aluno}\n` +
        `Segmento: ${body.segmento}\n` +
        `Ano/Série: ${body.serieAno}\n` +
        `Página: ${body.pagina}\n` +
        `utm_content: ${body.utm_content}\n` +
        `utm_campaign: ${body.utm_campaign}\n` +
        `utm_medium: ${body.utm_medium}\n` +
        `utm_source: ${body.utm_source}\n`,

    });
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}