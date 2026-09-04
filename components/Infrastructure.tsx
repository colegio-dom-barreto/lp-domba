import Image from "next/image";

const ITEMS = [
  "Salas de aula (com telão e projetor)",
  "Laboratório de biologia",
  "Laboratório de química",
  "Laboratório de matemática",
  "Casa da criança Montessori",
  "Salas de tecnologia",
  "Salas de artes",
  "Ginásio Poliesportivo",
  "Quadras",
  "Anfiteatro",
  "Auditório",
  "Parques",
  "Capela",
  "Biblioteca",
  "Refeitório",
];

const PHOTOS = [
  { src: "/capela.jpg", alt: "Capela do Colégio Dom Barreto" },
  { src: "/sala-infantil.jpg", alt: "Sala da Educação Infantil" },
  { src: "/fundamental2-geometria.jpg", alt: "Laboratório e atividades práticas" },
  { src: "/domba-mais-esportes.jpg", alt: "Ginásio poliesportivo" },
  { src: "/fundamental1-sala.jpg", alt: "Sala de aula do Ensino Fundamental" },
  { src: "/ensino-medio-notebook.jpg", alt: "Sala de tecnologia" },
];

export default function Infrastructure() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-display text-3xl text-navy sm:text-4xl">
            Infraestrutura completa
          </h2>
          <p className="text-sm font-semibold uppercase text-red">
            Espaços para aprender, crescer e criar memórias
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-charcoal/85 sm:grid-cols-3">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {PHOTOS.map((p) => (
            <div key={p.src} className="relative aspect-square overflow-hidden">
              <Image src={p.src} alt={p.alt} fill sizes="200px" className="object-cover" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
