"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import LeadForm from "./LeadForm";
import { trackEvent } from "@/lib/analytics";


const TRUST_ITEMS = [
  { icon: GraduationCap, label: "73 anos de tradição" },
  { icon: Sparkles, label: "Método Montessori" },
  { icon: BookOpen, label: "Infantil ao Ensino Médio" },
];

const HERO_IMAGES = [
  {
    src: "/capa/1.png",
    alt: "Ex-aluna do Colégio Dom Barreto segurando uma foto de quando era criança na escola",
  },
  {
    src: "/capa/2.png",
    alt: "Ex-aluno do Colégio Dom Barreto, Rafael, segurando uma foto de quando era criança na escola",
  },
  {
    src: "/capa/3.png",
    alt: "Ex-aluno do Colégio Dom Barreto, Pedro, segurando uma foto de quando era criança na escola",
  },
];

const HERO_IMAGE_INTERVAL_MS = 4000;


export default function Hero( { utms }: { utms: { source: string | string[] | undefined; medium: string | string[] | undefined; campaign: string | string[] | undefined; content: string | string[] | undefined } }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, HERO_IMAGE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {/* fundo: glows coloridos + grid de pontos, dão o clima "moderno" sem depender de imagem */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-skyblue/30 blur-[110px]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[130px]" />
        <div className="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-red/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Image
          src="/LOGO-maisHORIZONTAL.png"
          alt="Colégio Dom Barreto"
          width={220}
          height={107}
          className="h-20 w-auto sm:h-20"
          priority
        />
        <a
          href="#matriculas"
          onClick={() => trackEvent("clique_agendar_visita", { local: "header" })}
          className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy shadow-lg shadow-gold/20 transition-transform hover:scale-105 sm:block"
        >
          Agende sua visita
        </a>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pb-14 pt-4 md:grid-cols-2 md:gap-6 md:pb-24 md:pt-8">
        {/* painel de texto */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-gold ring-1 ring-white/15 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Matrículas 2027 abertas
          </span>

          <h1 className="font-display mt-4 text-4xl leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]">
            Fortes por dentro.
            <br />
            <span className="text-gold">Livres</span> para ir longe.
          </h1>

          <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
            Da Educação Infantil ao Ensino Médio, formamos alunos prontos
            para qualquer desafio — com 73 anos de tradição e Método
            Montessori, em Campinas.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#matriculas"
              onClick={() => trackEvent("clique_agendar_visita", { local: "hero" })}
              className="rounded-full bg-gold px-7 py-3.5 font-bold text-navy shadow-lg shadow-gold/25 transition-transform hover:scale-[1.03]"
            >
              Agende sua visita
            </a>
            <a
              href="https://wa.me/551931136780?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20Matr%C3%ADculas%20e%20quero%20agendar%20uma%20visita."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("clique_whatsapp", { local: "hero" })}
              className="rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
            >
              Falar no WhatsApp
            </a>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold" aria-hidden />
                <span className="text-sm font-medium text-white/85">{label}</span>
              </div>
            ))}
          </dl>
        </div>

        {/* foto real da campanha, recorte flutuando sobre o fundo com glow + badges de conquistas */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="absolute inset-x-6 inset-y-10 rounded-full" />

          <div className="relative aspect-4/5">
            {HERO_IMAGES.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 40vw, 80vw"
                className={`object-contain object-bottom drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${
                  index === activeImage ? "opacity-100" : "opacity-0"
                }`}
                priority={index === 0}
              />
            ))}

            {/* Seu comentário aqui
            <div className="absolute -left-4 top-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-8">
              <Trophy className="h-6 w-6 shrink-0 text-red" aria-hidden />
              <div className="leading-tight">
                <p className="font-display text-xl text-navy">146</p>
                <p className="text-[11px] font-semibold uppercase text-charcoal/60">
                  medalhistas em 2025
                </p>
              </div>
            </div>
             */}
 
  
          </div>
        </div>
      </div>

      {/* form flutuante, ancora a jornada de matrícula logo abaixo da dobra */}
      <div
        id="matriculas"
        className="relative z-10 mx-auto max-w-2xl px-6 pb-14 md:pb-20"
      >
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Agende sua visita
          </h2>
          <p className="mt-1 text-sm text-charcoal/70">
            Preencha e a Central de Matrículas entra em contato com você.
          </p>
          <div className="mt-5">
            <LeadForm id="hero-form" defaultSegment="infantil" utms={utms} />
          </div>
        </div>
      </div>

      <div className="flex h-1.5 w-full">
        <span className="flex-1 bg-gold" />
        <span className="flex-1 bg-red" />
        <span className="flex-1 bg-navy" />
      </div>
    </section>
  );
}
