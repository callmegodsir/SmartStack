import TagSEO from "@/components/TagSEO";
import TagSchema from "@/components/TagSchema";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import components
import SingleTestimonial from "@/components/SingleTestimonial";
import AutomationShowcase from "@/components/AutomationShowcase";
import DemoVideo from "@/components/DemoVideo";
import Pricing from "@/components/Pricing";
import Faq from "@/components/FAQ";
import MultipleTestimonials from "@/components/MultipleTestimonials";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <TagSEO
        canonicalSlug=""
        title="LoopBill - Automate Your Invoicing & Get Paid Faster"
        description="Save time and reduce late payments with LoopBill's automated invoicing solution for freelancers and SMBs."
      />
      <TagSchema />

      <main>
        <Header />

        <Hero />
        <SingleTestimonial />
        <AutomationShowcase />
        <DemoVideo />
        <Pricing />
        <Faq />
        <MultipleTestimonials />
        <FinalCta />

        <Footer />
      </main>
    </>
  );
}
