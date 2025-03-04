import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Connecting Sustainable Farming with Climate Action
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                AkaraCarbon helps farmers monetize their sustainable practices while enabling businesses and individuals
                to offset their carbon footprint.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">Browse Carbon Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard/farmer/new-project">List Your Project</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted md:h-[400px] lg:h-[500px]">
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Carbon farming project"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

