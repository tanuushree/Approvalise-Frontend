{/*import ECommerce from "@/components/landing-page/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/landing-page/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Approvalize",
  description: "This is the approvalize dashboard.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}*/}

import { Container } from "@/components/landing-page/Container";
import { Navbar } from "@/components/landing-page/Navbar";
import { Hero } from "@/components/landing-page/Hero";
import { SectionTitle } from "@/components/landing-page/SectionTitle";
import { Benefits } from "@/components/landing-page/Benefits";
import { Faq } from "@/components/landing-page/Faq";
import { Cta } from "@/components/landing-page/Cta";

import { benefitOne, benefitTwo , benefitThree} from "@/components/landing-page/data";
export default function Home() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <SectionTitle
        title="Tired of the paper chase?" 
      >
       
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <Benefits data={benefitThree} />

      <SectionTitle title="Want to know more?">
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}

