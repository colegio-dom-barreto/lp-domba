import Image from "next/image";
import { BookOpen, HeartHandshake, Trophy, Users, Church } from "lucide-react";

const BULLETS = [
  { icon: BookOpen, text: "Excelência acadêmica com filosofia montessoriana" },
  { icon: HeartHandshake, text: "Acolhimento: respeito ao estudante, seu ritmo e características" },
  { icon: Trophy, text: "Diversidade de atividades esportivas e culturais" },
  { icon: Users, text: "Desenvolvimento do protagonismo, autonomia e cooperação" },
  { icon: Church, text: "Valores cristãos e espiritualidade" },
];

export default function Montessori() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Filosofia Montessori
            </h2>
            <p className="mt-4 text-charcoal/80">
              O método Montessori é uma abordagem educacional centrada no
              aluno, que valoriza a autonomia, a liberdade com
              responsabilidade e o aprendizado prático. Criado por Maria
              Montessori, ele parte do princípio de que cada criança tem seu
              próprio ritmo e estilo de aprendizagem.
            </p>
            <p className="mt-3 text-charcoal/80">
              O ambiente é preparado para estimular a curiosidade, a
              criatividade e o desenvolvimento integral — intelectual,
              social, emocional, físico e espiritual.
            </p>
            <p className="mt-3 text-charcoal/80">
              As raízes Montessori estão presentes no Colégio Dom Barreto
              desde 1960, sustentadas por décadas de experiência na formação
              de gerações.
            </p>
            <div className="mt-6 flex items-start gap-4 border-t border-navy/10 pt-6">
              <Image
                src="/3.png"
                alt="Casa da Criança Montessori"
                width={90}
                height={90}
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
              <div>
                <h3 className="font-display text-lg text-navy">
                  Casa da criança Montessori
                </h3>
                <p className="text-sm text-charcoal/75">
                  Em escala compatível com a criança, proporciona experiências
                  cotidianas da vida prática, estimulando o cuidado consigo,
                  com o ambiente e com o próximo.
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-full sm:aspect-4/3 sm:rounded-2xl">
            <Image
              src="/15.png"
              alt="Aluna manuseando material sensorial Montessori (torre rosa)"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
