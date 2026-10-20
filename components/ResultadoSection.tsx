import { ArrowRight } from "lucide-react";

// Foto usada enquanto o aluno ainda não tiver a própria.
const FOTO_PADRAO = "/assets/gallery/aprov-medicina.webp";

type Aprovado = {
  /** Nome do aluno como deve aparecer no card. */
  nome: string;
  /**
   * Caminho da foto dentro de /public (ex.: "/assets/gallery/joao-silva.webp").
   * Recomendado: .webp com fundo transparente, ~400×480px, aluno enquadrado da cintura pra cima.
   * Se omitido, usa FOTO_PADRAO.
   */
  foto?: string;
};

// ✏️ Edite aqui: um objeto por aprovado, na ordem em que devem aparecer.
const APROVADOS: Aprovado[] = [
  { nome: "Alexandra", foto: "/assets/gallery/1.png" },
  { nome: "Amanda", foto: "/assets/gallery/2.png" },
  { nome: "Ana Beatriz", foto: "/assets/gallery/3.png" },
  { nome: "Arthur", foto: "/assets/gallery/4.png" },
  { nome: "Felipe", foto: "/assets/gallery/8.png" },
  { nome: "Beatriz", foto: "/assets/gallery/5.png" },
  { nome: "Caio", foto: "/assets/gallery/6.png" },
  { nome: "Carol", foto: "/assets/gallery/7.png" },
  { nome: "Felipe", foto: "/assets/gallery/10.png" },
  { nome: "Isabela", foto: "/assets/gallery/11.png" },
  { nome: "Juan", foto: "/assets/gallery/12.png" },
  { nome: "Mariana", foto: "/assets/gallery/13.png" },
  { nome: "Mateus", foto: "/assets/gallery/14.png" },
  { nome: "Nicolas", foto: "/assets/gallery/15.png" },
  { nome: "Nicole", foto: "/assets/gallery/16.png" },
  { nome: "Nicolly", foto: "/assets/gallery/17.png" },
  { nome: "Pedro", foto: "/assets/gallery/18.png" },
  { nome: "Rafael", foto: "/assets/gallery/19.png" },
  { nome: "Felipe", foto: "/assets/gallery/9.png" },
  { nome: "Rafael", foto: "/assets/gallery/20.png" },
  { nome: "Tiago", foto: "/assets/gallery/21.png" },
];

function CardAprovado({ aluno }: { aluno: Aprovado }) {
  return (
    <div className="flex w-[170px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md md:w-[205px]">
      <div className="flex h-[200px] items-end justify-center bg-gradient-to-b from-navy/10 to-navy/25 md:h-[245px]">
        <img
          src={aluno.foto ?? FOTO_PADRAO}
          alt={`${aluno.nome}, aluno(a) aprovado(a)`}
          loading="lazy"
          className="block h-full w-full object-contain object-bottom"
        />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-3 py-3 text-center">
        <span className="text-[13px] font-bold leading-tight text-navy md:text-sm">
          {aluno.nome}
        </span>
      </div>
    </div>
  );
}

export function ResultadoSection() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-sm font-semibold uppercase text-red">Resultado</p>
        <h2 className="font-display mt-2 text-3xl leading-tight text-navy sm:text-4xl">
          Aprovação direto do terceirão,
          <br/>
          nas melhores universidades
        </h2>
        <p className="mt-4 max-w-prose text-charcoal/80">
          Sem curso pré-vestibular, sem intervalo entre o colégio e a faculdade — os alunos do Domba saem da 3ª série direto pra USP, Unicamp, Unesp e outras universidades de prestígio.
        </p>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-stretch md:gap-7">
          <div className="proof-scroll flex items-stretch gap-3.5 overflow-x-auto py-2 md:min-w-0 md:flex-1 md:gap-4">
            {APROVADOS.map((aluno, i) => (
              <CardAprovado key={`${aluno.nome}-${i}`} aluno={aluno} />
            ))}
          </div>

          <a
            href="https://aprovados.domba.com.br"
            className="flex shrink-0 flex-col justify-between gap-4 rounded-3xl bg-navy-deep p-6 shadow-2xl transition-transform hover:scale-[1.02] md:my-2 md:w-[206px]"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-gold">
                Galeria completa
              </span>
              <span className="font-display text-xl text-white">
                Confira todos os nossos aprovados
              </span>
            </div>
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-xs leading-tight text-white/75">
                aprovados.
                <br />
                domba.com.br
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold shadow-lg shadow-gold/25">
                <ArrowRight className="h-5 w-5 text-navy" aria-hidden />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}