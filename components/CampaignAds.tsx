import Image from "next/image";

export default function CampaignAds() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-sm font-bold uppercase tracking-wide text-red">
          Campanha 2027
        </p>
        <h2 className="font-display mt-1 text-3xl text-navy sm:text-4xl">
          Essa é a campanha que te trouxe até aqui
        </h2>
        <p className="mt-3 max-w-2xl text-charcoal/80">
          Alunos e ex-alunos do Dom Barreto mostrando de onde vieram — e até
          onde chegaram.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/campanha-anuncio-menina.jpg"
              alt='Anúncio da campanha "Fortes por dentro, livres para ir longe" com ex-aluna em frente ao colégio'
              width={1280}
              height={1132}
              className="h-auto w-full"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/campanha-anuncio-menino.jpg"
              alt='Anúncio da campanha "Fortes por dentro, livres para ir longe" com aluno no corredor do colégio'
              width={1280}
              height={1132}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
