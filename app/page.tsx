import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { RestaurantsSection } from "@/components/RestaurantsSection";
import { DinersSection } from "@/components/DinersSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <RestaurantsSection />
        <DinersSection />
      </main>
      <Footer />
    </>
  );
}
