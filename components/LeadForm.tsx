"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const SEGMENTS: Record<string, { label: string; options: string[] }> = {
  infantil: {
    label: "Educação Infantil",
    options: [
      "Infantil I - 2 anos",
      "Infantil II - 3 anos",
      "Infantil III - 4 anos",
      "Infantil IV - 5 anos",
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

type Status = "idle" | "success" | "error";

const SEGMENT_KEYS = Object.keys(SEGMENTS) as [
  keyof typeof SEGMENTS,
  ...(keyof typeof SEGMENTS)[],
];

const leadSchema = z.object({
  website: z.string().max(0).optional().or(z.literal("")),
  segmento: z.enum(SEGMENT_KEYS),
  serieAno: z.string().min(1, "Selecione a série/ano."),
  responsavel: z.string().trim().min(1, "Informe o nome do responsável."),
  email: z.email("Informe um e-mail válido."),
  celular: z
    .string()
    .trim()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Informe um celular válido."),
  aluno: z.string().trim().min(1, "Informe o nome do aluno."),
});

// Aplica a máscara (XX) XXXXX-XXXX (ou XXXX-XXXX para fixo) enquanto o usuário digita.
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type FormValues = z.infer<typeof leadSchema>;

export default function LeadForm({
  defaultSegment = "infantil",
  id = "matriculas",
  utms,
}: {
  defaultSegment?: keyof typeof SEGMENTS;
  id?: string;
  utms: {
    source: string | string[] | undefined;
    medium: string | string[] | undefined;
    campaign: string | string[] | undefined;
    content: string | string[] | undefined;
  };
}) {
  const [status, setStatus] = useState<Status>("idle");

  const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      website: "",
      segmento: defaultSegment,
      serieAno: "",
      responsavel: "",
      email: "",
      celular: "",
      aluno: "",
    },
  });

  const segment = useWatch({ control, name: "segmento" });

  const { onChange: celularOnChange, ...celularField } = register("celular");

  useEffect(() => {
    setValue("serieAno", SEGMENTS[segment].options[0]);
  }, [segment, setValue]);

  async function onSubmit(values: FormValues) {
    // honeypot anti-spam: campo invisível que só um robô preenche
    if (values.website) {
      setStatus("success");
      reset({ ...values, segmento: defaultSegment });
      return;
    }

    if (!endpoint) {
      console.error("NEXT_PUBLIC_LEADS_ENDPOINT não configurado.");
      setStatus("error");
      return;
    }

    const payload = {
      segmento: SEGMENTS[values.segmento].label,
      responsavel: values.responsavel,
      email: values.email,
      celular: values.celular,
      aluno: values.aluno,
      serieAno: values.serieAno,
      origem: "LP matrículas",
      utm_source: utms.source,
      utm_medium: utms.medium,
      utm_campaign: utms.campaign,
      utm_content: utms.content,
      pagina: typeof window !== "undefined" ? window.location.href : "",
      data: new Date().toISOString(),
    };
    try {
      console.log(payload);
      // Google Apps Script não devolve CORS legível: usamos no-cors
      // e tratamos qualquer envio sem erro de rede como sucesso.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      trackEvent("gerar_lead", { segmento: SEGMENTS[values.segmento].label });
      setStatus("success");
      reset({ ...values, segmento: defaultSegment });
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
        className="rounded-xs border border-navy/20 bg-offwhite p-6 text-center"
      >
        <p className="font-display text-xl text-navy">Recebemos seu contato.</p>
        <p className="mt-1 text-sm text-charcoal/80">
          Nossa Central de Matrículas entrará em contato com você em breve para agendar a visita.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
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
          className="mt-1 w-full rounded-xs border border-navy/20 bg-white px-3 py-2 text-charcoal focus:border-red"
          {...register("segmento")}
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
          className="mt-1 w-full rounded-xs border border-navy/20 bg-white px-3 py-2 text-charcoal focus:border-red"
          {...register("serieAno")}
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
          label="Nome do responsável"
          error={errors.responsavel}
          {...register("responsavel")}
        />
        <Field
          id={`${id}-email`}
          type="email"
          label="E-mail"
          error={errors.email}
          {...register("email")}
        />
        <Field
          id={`${id}-celular`}
          label="Celular / WhatsApp"
          type="tel"
          inputMode="tel"
          placeholder="(11) 91234-5678"
          maxLength={15}
          error={errors.celular}
          {...celularField}
          onChange={(e) => {
            e.target.value = formatPhone(e.target.value);
            celularOnChange(e);
          }}
        />
        <Field
          id={`${id}-aluno`}
          label="Nome do aluno"
          error={errors.aluno}
          {...register("aluno")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-red px-6 py-3 font-bold uppercase text-white transition-colors hover:bg-navy disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Quero receber contato"}
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
  label,
  type = "text",
  error,
  ref,
  ...rest
}: React.ComponentPropsWithRef<"input"> & {
  id: string;
  label: string;
  error?: { message?: string };
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold uppercase text-navy"
      >
        {label}
      </label>
      <input id={id} type={type} ref={ref} {...rest} className="mt-1 w-full rounded-xs border border-navy/20 bg-white px-3 py-2 text-charcoal focus:border-red" />
      {error?.message && (
        <p role="alert" className="mt-1 text-xs text-red">
          {error.message}
        </p>
      )}
    </div>
  );
}
