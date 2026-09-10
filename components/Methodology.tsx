"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, HeartHandshake, Trophy, Users, Church, ChevronLeft, ChevronRight } from "lucide-react";

const BULLETS = [
  { icon: BookOpen, text: "Excelência acadêmica com filosofia montessoriana" },
  { icon: HeartHandshake, text: "Acolhimento: respeito ao estudante, seu ritmo e características" },
  { icon: Trophy, text: "Diversidade de atividades esportivas e culturais" },
  { icon: Users, text: "Desenvolvimento do protagonismo, autonomia e cooperação" },
  { icon: Church, text: "Valores cristãos e espiritualidade" },
];

const PHOTOS = [
  { src: "/16.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
  { src: "/17.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
  { src: "/18.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
  { src: "/19.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
  { src: "/20.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
  { src: "/21.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
  { src: "/22.png", alt: "Aluna da Educação Infantil brincando com blocos de montar" },
];

function MethodologyCarousel() {
  const [index, setIndex] = useState(0);
  const hasMultiple = PHOTOS.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, 4000);
    return () => clearInterval(id);
  }, [hasMultiple]);

  const goTo = (i: number) => setIndex((i + PHOTOS.length) % PHOTOS.length);

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy shadow transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy shadow transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {PHOTOS.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para foto ${i + 1}`}
                className={`h-2 w-2 rounded-full transition ${i === index ? "bg-white" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Methodology() {
  return (
    <>
      <section className="bg-offwhite">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 md:items-center">
          <MethodologyCarousel />
          <div>
            <h2 className="font-display text-3xl leading-tight text-navy sm:text-4xl">
              Do Domba para o que vier.
            </h2>
            <p className="mt-4 text-charcoal/80">
              O que o seu filho leva daqui não cabe no histórico escolar. São os valores que guiam quando a decisão é difícil. A curiosidade que não para quando a aula acaba. A amizade que dura décadas. O conhecimento que dá segurança para enfrentar os desafios não só do vestibular, mas da vida. A confiança de quem cresceu num lugar onde foi visto, respeitado e desafiado. No Dom Barreto, formação não é entregue — é construída. Desde os 2 anos até o Ensino Médio.
            </p>
            <p className="mt-3 text-charcoal/80">
              Aqui, cada estudante é reconhecido em sua individualidade e
              incentivado a desenvolver seu potencial. Por meio de
              experiências que inspiram, desafiam e acolhem, ajudamos cada um
              a descobrir talentos, traçar sonhos e transformá-los em
              conquistas.
            </p>
            <ul className="mt-6 space-y-3">
              {BULLETS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-red" strokeWidth={2} />
                  <span className="font-display text-base leading-snug text-navy sm:text-lg">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
