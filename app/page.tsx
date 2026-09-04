import Hero from "@/components/Hero";
import CampaignAds from "@/components/CampaignAds";
import Methodology from "@/components/Methodology";
import Segments from "@/components/Segments";
import Infrastructure from "@/components/Infrastructure";
import Achievements from "@/components/Achievements";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";
import WhatsappButton from "@/components/WhatsappButton";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />   
      <Methodology />
      <Segments />
      <Programs />  
      <Infrastructure />
      <Testimonials />
      <Footer />
      <WhatsappButton />
    </main>
  );
}
