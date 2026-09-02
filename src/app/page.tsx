import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Range } from "@/components/site/range";
import { Glossary } from "@/components/site/glossary";
import { Listings } from "@/components/site/listings";
import { Visit, Footer } from "@/components/site/visit";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Range />
        <Glossary />
        <Listings />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
