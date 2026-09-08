"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

type Segment = {
  slug: string;
  aliases: string[];
  segmentKey?: string;
  label: string;
  eyebrow: string;
  title: string;
  text: string;
  tags?: string[];
  image: string;
  imageAlt: string;
};

const SEGMENTS: Segment[] = [
  {
    slug: "infantil",
    aliases: ["infantil", "educacaoinfantil", "ei"],
    segmentKey: "infantil",
    label: "Infantil",
    eyebrow: "a partir de 2 anos",
    title: "Educação Infantil",
    text: "O acolhimento é o ponto de partida para que cada criança se sinta segura e confiante em seus primeiros passos na vida escolar. As crianças aprendem com atividades do cotidiano, jogos pedagógicos e materiais sensoriais, desenvolvendo independência e autoconfiança desde cedo.",
    image: "/11.png",
    imageAlt: "Professora e aluna da Educação Infantil em atividade Montessori",
  },
  {
    slug: "fundamental-1",
    aliases: ["fundamental1", "fundamentali", "fund1", "fundi", "f1"],
    segmentKey: "fund1",
    label: "Fund. I",
    eyebrow: "anos iniciais",
    title: "Ensino Fundamental I",
    text: "Do primeiro ao quinto ano, a filosofia montessoriana se mantém por meio de atividades que estimulam a curiosidade, a autonomia e o trabalho em grupo, incentivando a leitura, a escrita e o raciocínio lógico. Tecnologia, música e educação socioemocional fazem parte da grade curricular do infantil ao quinto ano.",
    image: "/12.png",
    imageAlt: "Alunos do Ensino Fundamental I em sala de aula",
  },
  {
    slug: "fundamental-2",
    aliases: ["fundamental2", "fundamentalii", "fund2", "fundii", "f2"],
    segmentKey: "fund2",
    label: "Fund. II",
    eyebrow: "anos finais",
    title: "Ensino Fundamental II",
    text: "Do sexto ao nono ano, a proposta é ampliar o protagonismo do estudante, com projetos interdisciplinares e desafios que estimulam a pesquisa, a criatividade e a resolução de problemas — aproximando a teoria da prática.",
    image: "/10.png",
    imageAlt: "Aluno do Fundamental II em atividade de geometria",
  },
  {
    slug: "medio",
    aliases: ["medio", "ensinomedio", "em", "ensinomdio"],
    segmentKey: "medio",
    label: "Médio",
    eyebrow: "",
    title: "Ensino Médio",
    text: "O aprendizado se torna cada vez mais direcionado à vida adulta e aos objetivos individuais de cada estudante. Projetos e disciplinas eletivas valorizam a investigação, a argumentação e o pensamento crítico, preparando para os vestibulares, a vida acadêmica e o mercado de trabalho.",
    image: "/7.png",
    imageAlt: "Alunos do Ensino Médio estudando juntos com notebook",
  },
    {
    slug: "dombamais",
    aliases: ["dombamais", "domba", "domba-mais"],
    label: "Domba Mais",
    eyebrow: "",
    title: "Domba Mais",
    text: "Atividades no contraturno escolar, com professores especialistas em cada modalidade, participação em torneios, amistosos e festivais.",
    tags: [
      "Voleibol",
      "Basquetebol",
      "Futsal",
      "Handebol",
      "Ginástica artística",
      "Judô",
      "Kung-fu",
      "Hip-hop",
      "Ballet",
      "Xadrez",
      "Inglês",
      "Teatro",
    ],
    image: "/9.png",
    imageAlt: "Alunos do Ensino Médio estudando juntos com notebook",
  },
    {
    slug: "integral",
    aliases: ["integral", "ensinointegral", "ei", "ensinointegral"],
    label: "Integral",
    eyebrow: "",
    title: "Período Integral",
    text: "Espaço exclusivo com 2 casas (Infantil ao 1º ano e 2º ao 5º ano), unidas por um agradável quintal sensorial, com horta e pomar.",
    tags: [
      "Inglês Maker",
      "Atividades esportivas",
      "Educação financeira e empreendedorismo",
      "Educação ambiental e vida prática",
    ],
    image: "/13.png",
    imageAlt: "Alunos do Ensino Médio estudando juntos com notebook",
  },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(new RegExp("[^a-z0-9]", "g"), "");
}

function indexFromParam(raw: string | null) {
  if (!raw) return 0;
  const target = normalize(raw);
  const found = SEGMENTS.findIndex((s) => s.aliases.includes(target));
  return found === -1 ? 0 : found;
}

function goToForm(segment?: string) {
  trackEvent("clique_quero_saber_mais", { segmento: segment ?? "" });
  if (segment) {
    const select = document.getElementById("hero-form-segmento") as HTMLSelectElement | null;
    if (select) {
      select.value = segment;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  document.getElementById("matriculas")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Desloca `el` verticalmente proporcional à posição de scroll, criando um
 * efeito de paralaxe suave. Desativado quando o usuário prefere menos
 * movimento na tela.
 */
function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      el.style.transform = `translate3d(0, ${distance * speed}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return ref;
}

export default function SegmentSelector() {
  const searchParams = useSearchParams();
  const initialIndex = useMemo(
    () => indexFromParam(searchParams.get("seg")),
    [searchParams]
  );
  const [active, setActive] = useState(initialIndex);
  const current = SEGMENTS[active];

  const blobBackRef = useParallax<HTMLDivElement>(0.12);
  const blobFrontRef = useParallax<HTMLDivElement>(-0.08);
  const imageRef = useParallax<HTMLDivElement>(0.06);

  return (
    <section className="relative overflow-hidden bg-offwhite">
      <div
        ref={blobBackRef}
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-32 h-80 w-80 rounded-full bg-skyblue/20 blur-3xl will-change-transform"
      />
      <div
        ref={blobFrontRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl will-change-transform"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-red">
            Etapas de ensino
          </span>
          <h2 className="font-display mt-2 text-3xl text-navy sm:text-4xl">
            Conheça nossos segmentos de ensino
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Etapas de ensino"
          className="-mx-1 flex justify-center gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm ring-1 ring-navy/10 sm:justify-start"
        >
          {SEGMENTS.map((seg, i) => (
            <button
              key={seg.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={
                "shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold uppercase transition-all duration-300 " +
                (i === active
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/60 hover:bg-navy/5 hover:text-navy")
              }
            >
              {seg.label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 grid items-center gap-10 overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-navy/5 sm:p-8 md:grid-cols-2 md:gap-12">
          <div
            key={current.slug}
            className="animate-[fade-in_0.5s_ease-out]"
          >
            <h3 className="font-display text-2xl leading-tight text-navy sm:text-3xl">
              {current.title}{" "}
              {current.eyebrow && (
                <span className="text-lg text-red sm:text-xl">{current.eyebrow}</span>
              )}
            </h3>
            <p className="mt-4 text-charcoal/80">{current.text}</p>
            {current.tags && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => goToForm(current.segmentKey)}
              className="mt-6 rounded-full bg-navy px-6 py-3 text-sm font-bold uppercase text-white shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Quero saber mais
            </button>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg">
            <div ref={imageRef} className="absolute inset-[-10%] will-change-transform">
              <Image
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="animate-[fade-in_0.6s_ease-out] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
