import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Synergi Solutions, LLC",
  description: "This is Home for Synergi Solutions, LLC",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <Brands />
      <Team />
      <Contact />

      {/* <Integration /> */}
      {/* <CTA /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      {/* <Blog /> */}
    </main>
  );
}
