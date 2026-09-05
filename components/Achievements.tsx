import Image from "next/image";

const UNIVERSITIES = [
  ["UNESP", "Engenharia Mecânica"],
  ["UNICAMP", "Ed. Física"],
  ["USP", "Direito"],
  ["USP", "Fisioterapia"],
  ["USP/UNESP/UNICAMP", "Ciências Sociais"],
  ["UFSCAR", "Química"],
];

export default function Achievements() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-3xl text-gold sm:text-4xl">
          O Domba inspira conquistas!
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src="/conquistas-colagem.jpg"
              alt="Alunos e alunas do Colégio Dom Barreto comemorando conquistas em torneios e olimpíadas do conhecimento"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatBadge value="146" label="Medalhistas no Canguru de Matemática 2025" />
            <StatBadge value="1º" label="Lugar na redação do EPTV na escola 2023" />
            <p className="font-display text-lg leading-snug text-white sm:col-span-2">
              Equipes campeãs em diversos torneios escolares
            </p>
            <p className="font-display text-lg leading-snug text-white sm:col-span-2">
              Concursos e olimpíadas do conhecimento
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-8">
          <p className="font-display text-lg text-gold">
            Aprovações direto do terceirão para a universidade
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {UNIVERSITIES.map(([name, course]) => (
              <div key={name + course} className="rounded-md bg-red px-4 py-2 text-center leading-tight">
                <p className="text-sm font-extrabold">{name}</p>
                <p className="text-[11px] uppercase text-white/90">{course}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md bg-red px-4 py-3">
      <p className="font-display text-3xl leading-none text-white">{value}</p>
      <p className="mt-1 text-xs uppercase leading-snug text-white/90">{label}</p>
    </div>
  );
}
