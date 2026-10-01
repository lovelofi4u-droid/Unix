import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { Clients } from "@/components/Clients";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyUnix } from "@/components/WhyUnix";
import { About } from "@/components/About";
import { BookForm } from "@/components/BookForm";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unix — Video Editor for Creators & Brands" },
      {
        name: "description",
        content:
          "Turning ideas into scroll-stopping videos. Short form, long form, SaaS videos and content systems by Unix.",
      },
      { property: "og:title", content: "Unix — Video Editor for Creators & Brands" },
      {
        property: "og:description",
        content:
          "Turning ideas into scroll-stopping videos. Short form, long form, SaaS videos and content systems by Unix.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  useLenis();

  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Story />
      <Work />
      <Testimonials />
      <Clients />
      <Services />
      <Process />
      <WhyUnix />
      <About />
      <BookForm />
      <Footer />
    </main>
  );
}
