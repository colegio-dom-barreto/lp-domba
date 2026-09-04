"use client";

import Image from "next/image";
import ChevronBanner from "./ChevronBanner";

function goToForm(segment: string) {
  const select = document.getElementById("hero-form-segmento") as HTMLSelectElement | null;
  if (select) {
    select.value = segment;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
  document.getElementById("matriculas")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SegmentBlock({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  segmentKey,
  reverse,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  segmentKey: string;
  reverse?: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2 md:items-center">
      <div className={reverse ? "md:order-2" : ""}>
        <h3 className="font-display text-2xl leading-tight text-navy sm:text-3xl">
          {title} <span className="text-lg text-red sm:text-xl">{eyebrow}</span>
        </h3>
        <p className="mt-4 text-charcoal/80">{text}</p>
        <button
          onClick={() => goToForm(segmentKey)}
          className="mt-5 rounded-full border-2 border-navy px-5 py-2 text-sm font-bold uppercase text-navy hover:bg-navy hover:text-white"
        >
          Quero saber mais
        </button>
      </div>
      <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${reverse ? "md:order-1" : ""}`}>
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    </div>
  );
}

export default function Segments() {
  return (
    <section className="bg-white">
      <SegmentBlock
        segmentKey="infantil"
        eyebrow="a partir de 2 anos"
        title="Educação Infantil"
        text="O acolhimento é o ponto de partida para que cada criança se sinta segura e confiante em seus primeiros passos na vida escolar. As crianças aprendem com atividades do cotidiano, jogos pedagógicos e materiais sensoriais, desenvolvendo independência e autoconfiança desde cedo."
        image="/aluna-torre-rosa.jpg"
        imageAlt="Professora e aluna da Educação Infantil em atividade Montessori"
      />

      <ChevronBanner
        left="Aprendizado através da experiência concreta"
        right="Construção do pensamento abstrato"
        colorLeft="red"
        colorRight="gold"
      />

      <SegmentBlock
        segmentKey="fund1"
        eyebrow="anos iniciais"
        title="Ensino Fundamental I"
        text="Do primeiro ao quinto ano, a filosofia montessoriana se mantém por meio de atividades que estimulam a curiosidade, a autonomia e o trabalho em grupo, incentivando a leitura, a escrita e o raciocínio lógico. Tecnologia, música e educação socioemocional fazem parte da grade curricular do infantil ao quinto ano."
        image="/fundamental1-sala.jpg"
        imageAlt="Alunos do Ensino Fundamental I em sala de aula"
        reverse
      />

      <SegmentBlock
        segmentKey="fund2"
        eyebrow="anos finais"
        title="Ensino Fundamental II"
        text="Do sexto ao nono ano, a proposta é ampliar o protagonismo do estudante, com projetos interdisciplinares e desafios que estimulam a pesquisa, a criatividade e a resolução de problemas — aproximando a teoria da prática."
        image="/fundamental2-geometria.jpg"
        imageAlt="Aluno do Fundamental II em atividade de geometria"
      />

      <ChevronBanner
        left="Prática do conhecimento em projetos"
        right="Protagonismo e análise crítica do mundo"
        colorLeft="navy"
        colorRight="skyblue"
      />

      <SegmentBlock
        segmentKey="medio"
        eyebrow=""
        title="Ensino Médio"
        text="O aprendizado se torna cada vez mais direcionado à vida adulta e aos objetivos individuais de cada estudante. Projetos e disciplinas eletivas valorizam a investigação, a argumentação e o pensamento crítico, preparando para os vestibulares, a vida acadêmica e o mercado de trabalho."
        image="/ensino-medio-notebook.jpg"
        imageAlt="Alunos do Ensino Médio estudando juntos com notebook"
        reverse
      />
    </section>
  );
}
