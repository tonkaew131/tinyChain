import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <Stats />
      <FeaturedProjects />
      <HowItWorks />
      <section className="container py-12 md:py-24 lg:py-32 mx-auto">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Join the fight against climate change
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Whether you're a farmer with sustainable practices or a business looking to offset your carbon footprint,
            AkaraCarbon connects you with the right partners.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/projects">Browse Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/farmer/new-project">List Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

