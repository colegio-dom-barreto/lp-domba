import Hero from "@/components/Hero";
import CampaignAds from "@/components/CampaignAds";
import Methodology from "@/components/Methodology";
import Segments from "@/components/Segments";
import Infrastructure from "@/components/Infrastructure";
import Montessori from "@/components/Montessori";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";
import WhatsappButton from "@/components/WhatsappButton";
import Footer from "@/components/Footer";

export type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};


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
      <Hero utms={utms} />
      <Methodology />
      <Infrastructure />
      <Montessori />
      <Segments />
      <Programs />
      <Testimonials />
      <Footer />
      <WhatsappButton />
    </main>
  );
}
