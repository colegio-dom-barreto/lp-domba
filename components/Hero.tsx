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
    src: "/capa/bia-lp.png",
    alt: "Ex-aluna do Colégio Dom Barreto segurando uma foto de quando era criança na escola",
  },
  {
    src: "/capa/pedro-lp.png",
    alt: "Ex-aluno do Colégio Dom Barreto, Rafael, segurando uma foto de quando era criança na escola",
  },
    {
    src: "/rafael-LP.png",
    alt: "Ex-aluno do Colégio Dom Barreto, Rafael, segurando uma foto de quando era criança na escola",
  },
  
];

const HERO_IMAGE_INTERVAL_MS = 4000;


export default function Hero({ utms }: { utms: { source: string | string[] | undefined; medium: string | string[] | undefined; campaign: string | string[] | undefined; content: string | string[] | undefined } }) {
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
          Comece a história do seu filho aqui 
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
            Há 73 anos, o Domba forma pessoas que sabem onde querem chegar, e que chegam lá com integridade e valores. Da Educação Infantil ao Ensino Médio, em Campinas.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#matriculas"
              onClick={() => trackEvent("clique_agendar_visita", { local: "hero" })}
              className="rounded-full bg-gold px-7 py-3.5 font-bold text-navy shadow-lg shadow-gold/25 transition-transform hover:scale-[1.03]"
            >
              Comece a história do seu filho aqui 
            </a>
            {/*
            <a
              href="https://wa.me/551931136780?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20Matr%C3%ADculas%20e%20quero%20agendar%20uma%20visita."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("clique_whatsapp", { local: "hero" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 fill-white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.05 21.785h-.004a9.87 9.87 0 0 1-4.988-1.365l-.358-.213-3.712.973.99-3.617-.233-.371a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.436-9.884 9.822-9.884a9.79 9.79 0 0 1 6.955 2.881 9.79 9.79 0 0 1 2.877 6.964c-.003 5.45-4.437 9.884-9.838 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.86 11.86 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
            */}
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
                className={`object-contain object-bottom drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${index === activeImage ? "opacity-100" : "opacity-0"
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
            Comece a história do seu filho aqui 
          </h2>
          <p className="mt-1 text-sm text-charcoal/70">
            Preencha seus dados e nossa equipe entrará em contato para tirar suas dúvidas e agendar uma visita.
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
