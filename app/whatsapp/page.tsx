import Image from "next/image";
import { GraduationCap, Sparkles, BookOpen } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { PageViewTracker } from "@/components/PageViewTracker";

export type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TRUST_ITEMS = [
  { icon: GraduationCap, label: "73 anos de tradição" },
  { icon: Sparkles, label: "Método Montessori" },
  { icon: BookOpen, label: "Infantil ao Ensino Médio" },
];

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const utms = {
    source: params.utm_source,
    medium: params.utm_medium,
    campaign: params.utm_campaign,
    content: params.utm_content,
  };

  return (
    <main>
      <PageViewTracker eventName="view_lp_whatsapp" utms={utms} />

      <section className="relative overflow-hidden bg-navy-deep">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-skyblue/30 blur-[110px]" />
          <div className="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-red/20 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[24px_24px]" />
        </div>

        <div className="relative z-20 mx-auto flex max-w-2xl items-center justify-center px-6 py-5">
          <Image
            src="/LOGO-maisHORIZONTAL.png"
            alt="Colégio Dom Barreto"
            width={430}
            height={117}
            className="h-20 w-auto"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 pb-6 pt-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-gold ring-1 ring-white/15 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Matrículas 2027 abertas
          </span>

          <h1 className="font-display mt-4 text-3xl leading-[1.1] text-white sm:text-4xl">
            Fortes por dentro.
            <br />
            <span className="text-gold">Livres</span> para ir longe.
          </h1>




        </div>

        <div
          id="matriculas"
          className="relative z-10 mx-auto max-w-2xl px-6 pb-14 pt-2 md:pb-20"
        >
          <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              Comece a história do seu filho aqui 
            </h2>
            <p className="mt-1 text-sm text-charcoal/70">
              Preencha seus dados e a Central de Matrículas entrará em contato com você.
            </p>
            <div className="mt-5">
              <LeadForm id="hero-form" defaultSegment="infantil" utms={utms} />
            </div>
          </div>
        </div>

        <div className="flex h-1.5 w-full">
          <span className="flex-1 bg-gold" />
          <span className="flex-1 bg-red" />
          <span className="flex-1 bg-navy" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
