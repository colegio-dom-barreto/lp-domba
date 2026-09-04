"use client";

import { useState, FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

const SEGMENTS: Record<string, { label: string; options: string[] }> = {
  infantil: {
    label: "Educação Infantil",
    options: [
      "2 anos - Infantil I",
      "3 anos - Infantil II",
      "4 anos - Infantil III",
      "5 anos - Infantil IV",
    ],
  },
  fund1: {
    label: "Ensino Fundamental I",
    options: ["1º Ano", "2º Ano", "3º Ano", "4º Ano", "5º Ano"],
  },
  fund2: {
    label: "Ensino Fundamental II",
    options: ["6º Ano", "7º Ano", "8º Ano", "9º Ano"],
  },
  medio: {
    label: "Ensino Médio",
    options: ["1ª Série", "2ª Série", "3ª Série"],
  },
};

type Status = "idle" | "sending" | "success" | "error";

export default function LeadForm({
  defaultSegment = "infantil",
  id = "matriculas",
}: {
  defaultSegment?: keyof typeof SEGMENTS;
  id?: string;
}) {
  const [segment, setSegment] = useState<keyof typeof SEGMENTS>(defaultSegment);
  const [status, setStatus] = useState<Status>("idle");

  const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot anti-spam: campo invisível que só um robô preenche
    if (data.get("website")) {
      setStatus("success");
      form.reset();
      return;
    }

    if (!endpoint) {
      console.error("NEXT_PUBLIC_LEADS_ENDPOINT não configurado.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    const payload = {
      segmento: SEGMENTS[segment].label,
      responsavel: data.get("responsavel"),
      email: data.get("email"),
      celular: data.get("celular"),
      aluno: data.get("aluno"),
      serieAno: data.get("serieAno"),
      origem: "LP matrículas",
      pagina: typeof window !== "undefined" ? window.location.href : "",
      data: new Date().toISOString(),
    };

    try {
      // Google Apps Script não devolve CORS legível: usamos no-cors
      // e tratamos qualquer envio sem erro de rede como sucesso.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      trackEvent("gerar_lead", { segmento: SEGMENTS[segment].label });
      setStatus("success");
      form.reset();
      setSegment(defaultSegment);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        role="status"
        className="rounded-sm border border-navy/20 bg-offwhite p-6 text-center"
      >
        <p className="font-display text-xl text-navy">Recebemos seu contato.</p>
        <p className="mt-1 text-sm text-charcoal/80">
          Nossa Central de Matrículas fala com você em breve para agendar a
          visita.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor={`${id}-segmento`}
          className="block text-sm font-semibold uppercase text-navy"
        >
          Etapa de interesse
        </label>
        <select
          id={`${id}-segmento`}
          value={segment}
          onChange={(e) => setSegment(e.target.value as keyof typeof SEGMENTS)}
          className="mt-1 w-full rounded-sm border border-navy/20 bg-white px-3 py-2 text-charcoal focus:border-red"
        >
          {Object.entries(SEGMENTS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

       <div>
        <label
          htmlFor={`${id}-serieAno`}
          className="block text-sm font-semibold uppercase text-navy"
        >
          {segment === "infantil" ? "Idade" : "Ano/Série"}
        </label>
        <select
          id={`${id}-serieAno`}
          name="serieAno"
          required
          className="mt-1 w-full rounded-sm border border-navy/20 bg-white px-3 py-2 text-charcoal focus:border-red"
        >
          {SEGMENTS[segment].options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>


      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-responsavel`}
          name="responsavel"
          label="Nome do responsável"
          required
        />
        <Field
          id={`${id}-email`}
          name="email"
          type="email"
          label="E-mail"
          required
        />
        <Field
          id={`${id}-celular`}
          name="celular"
          label="Celular / WhatsApp"
          required
        />
        <Field id={`${id}-aluno`} name="aluno" label="Nome do aluno" required />
      </div>

     
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-red px-6 py-3 font-bold uppercase text-white transition-colors hover:bg-navy disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Quero receber contato"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red">
          Não conseguimos enviar agora. Tente novamente ou chame no WhatsApp.
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold uppercase text-navy"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-sm border border-navy/20 bg-white px-3 py-2 text-charcoal focus:border-red"
      />
    </div>
  );
}
