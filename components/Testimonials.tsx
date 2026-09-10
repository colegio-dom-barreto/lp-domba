const TESTIMONIALS = [
  {
    quote:
      "A metodologia Montessori torna o processo de alfabetização encantador e leve, promovendo autonomia e responsabilidade nos alunos.",
    author: "Tatiane Borges",
    role: "Ex-aluna e mãe de aluno",
  },
  {
    quote:
      "Método Montessori alfabetiza as crianças de forma quase mágica. Meus dois filhos, com características totalmente diferentes, se alfabetizaram lá.",
    author: "Karen Bonadia",
    role: "Mãe de aluno",
  },
  {
    quote:
      "O que o Dom Barreto trouxe para minha trajetória foram os valores, a resiliência do estudo e a disciplina.",
    author: "Lucas Mello",
    role: "Ex-aluno - ",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-navy/10 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-3xl text-navy sm:text-4xl">
          Faz parte da nossa história
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="border-t-4 border-red pt-4">
              <blockquote className="text-charcoal/85">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-navy/70">
                {t.author} — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
