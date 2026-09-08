import Image from "next/image";

export default function Programs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Período Integral{" "}
              <span className="block text-lg text-red sm:inline sm:text-xl">
                para se sentir em casa e em família
              </span>
            </h2>
            <p className="mt-4 text-charcoal/80">
              Espaço exclusivo com 2 casas (Infantil ao 1º ano e 2º ao 5º
              ano), unidas por um agradável quintal sensorial, com horta e
              pomar.
            </p>
            <ul className="mt-4 space-y-1 text-charcoal/85">
              {["Inglês", "Maker", "Atividades esportivas", "Educação financeira e empreendedorismo", "Educação ambiental e vida prática"].map(
                (i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    {i}
                  </li>
                )
              )}
            </ul>
            <p className="mt-3 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase text-navy">
              Vagas limitadas — consulte disponibilidade por faixa etária
            </p>
          </div>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src="/14.png"
              alt="Crianças brincando no período integral do Colégio Dom Barreto"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl md:order-2">
            <Image
              src="/9.png"
              alt="Aula de esportes do Domba+"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <Image
              src="/dombamais-azul.png"
              alt="Domba+"
              width={600}
              height={179}
              className="h-12 w-auto"
            />
            <p className="mt-2 text-sm font-semibold uppercase text-red">
              Escola de esportes, arte e cultura
            </p>
            <p className="mt-3 text-charcoal/80">
              Atividades no contraturno escolar, com professores
              especialistas em cada modalidade, participação em torneios,
              amistosos e festivais.
            </p>
            <p className="mt-3 font-display text-base leading-snug text-navy">
              Voleibol · Basquetebol · Futsal · Handebol · Ginástica artística
              · Judô · Kung-fu · Hip-hop · Ballet · Xadrez · Inglês · Teatro
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-3xl text-navy sm:text-4xl">
            Extracurriculares gratuitas
          </h2>
          <ul className="mt-4 grid gap-2 text-charcoal/85 sm:grid-cols-2">
            {[
              "Coral - 2º ao 5º ano do Fundamental",
              "PDL - Projeto Desenvolvendo Liderança - do 6º ao 9º ano",
              "Fanfarra - 3º ano do Fundamental à 3ª série do Ensino Médio",
              "Preparatório para Olimpíadas do Conhecimento",
              "Treinamento Esportivo - Ensino Médio (Gratuito)",
              "Plantões de dúvidas",
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
