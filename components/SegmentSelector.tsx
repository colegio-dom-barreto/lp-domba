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
    text: "Um primeiro passo seguro, acolhedor e cheio de descobertas. Na Educação Infantil, a criança aprende com as mãos, com os olhos, com o corpo — e se descobre capaz antes mesmo de saber que está aprendendo. Em um ambiente preparado para a exploração, o professor Montessori observa, orienta e confia no ritmo de cada um. É aqui que começa a confiança que dura a vida toda.",
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
    text: "A curiosidade que nasceu na Educação Infantil começa a virar conhecimento. Ler, escrever, calcular, resolver — cada conteúdo é apresentado de forma concreta, ligado ao que a criança já viveu. O pensamento se estrutura. A autonomia se consolida. E a criança descobre que aprender pode — e deve — ser prazeroso. Tecnologia, música e educação socioemocional fazem parte da grade curricular do infantil ao quinto ano.",
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
    text: "A fase mais complexa da formação tem um protagonista: o próprio aluno. É aqui que a teoria encontra o mundo real — em projetos que exigem pesquisa, debate e decisão. O jovem começa a descobrir quem ele é, o que defende e de onde vem sua força. Não por acaso, é também onde os valores se tornam escolhas.",
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
    text: "A formação se completa. O horizonte se abre. O jovem que chegou criança sai pronto — para a profissão que escolher, para o caminho que traçar, para o mundo que ainda está descobrindo. Nossa carga horária estendida dá espaço para a excelência acadêmica, complementada pelas disciplinas eletivas e treino esportivo gratuito. Mais do que preparar para o vestibular, o Domba prepara para a vida e para o que vier.",
    image: "/7.png",
    tags: [

      "Carga horária estendida – 36h (1ª e 2ª séries), 40h (3ª série)",
      "Treino esportivo gratuito para alunos que representam o colégio.",
      "Livros didáticos subsidiados para a 1ª série – consulte condições",
      "Aprovações de destaque nos vestibulares"

    ],
    imageAlt: "Alunos do Ensino Médio estudando juntos com notebook",
  },
  {
    slug: "dombamais",
    aliases: ["dombamais", "domba", "domba-mais"],
    label: "Domba Mais",
    eyebrow: "",
    title: "Domba Mais",
    text: "Mais que atividades, vínculos e descobertas de novos interesses. No contraturno do Domba+, o aluno descobre talentos que a sala de aula não mostraria. Com professores especialistas em cada modalidade e participação em torneios, festivais e apresentações, o Domba+ faz da escola um lugar onde o filho quer estar.",
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
    text: "Com duas casas organizadas por faixa etária, quintal sensorial, horta e pomar, no Integral do Domba a criança se sente em casa e em família. Com uma programação diversificada para complementar sua formação: inglês, maker, esportes, educação financeira, ambiental e vida prática — tudo com a qualidade e o olhar de quem conhece cada aluno pelo nome.",
    tags: [
      "Inglês",
      "Maker",
      "Atividades esportivas",
      "Educação financeira e empreendedorismo",
      "Educação ambiental e vida prática",
    ],
    image: "/14.png",
    imageAlt: "Alunos do Ensino Médio estudando juntos com notebook",
  },
  {
    slug: "extra-curriculares",
    aliases: ["extra-curriculares", "atividades-extras", "ae"],
    label: "Extra Curriculares",
    eyebrow: "",
    title: "Extra Curriculares Gratuitas",
    text: "Complementando a formação do aluno o Domba oferece uma variedade de atividades gratuitas (consulte disponibilidade de vagas).",
    tags: [
      "Coral - 2º ao 5º ano do Fundamental",
      "PDL - Projeto Desenvolvendo Liderança - do 6º ao 9º ano",
      "Fanfarra - 3º ano do Fundamental à 3ª série do Ensino Médio",
      "Preparatório para Olimpíadas do Conhecimento",
      "Treinamento Esportivo - Ensino Médio",
      "Plantões de dúvidas",
    ],
    image: "/extra.png",
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
            Uma jornada completa — dos 2 anos ao vestibular
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Etapas de ensino"
          className="-mx-1 flex justify-start gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm ring-1 ring-navy/10"
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
