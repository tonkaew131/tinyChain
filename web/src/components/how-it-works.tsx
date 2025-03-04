import { ArrowRight, Leaf, LineChart, ShieldCheck, Sprout } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      title: "Farmers List Projects",
      description:
        "Farmers create detailed listings of their carbon reduction projects, including methodologies and expected outcomes.",
      icon: Sprout,
    },
    {
      title: "Verification & Certification",
      description: "Projects undergo rigorous verification to ensure they meet carbon reduction standards.",
      icon: ShieldCheck,
    },
    {
      title: "Customers Purchase Credits",
      description: "Businesses and individuals browse projects and purchase carbon credits to offset their emissions.",
      icon: Leaf,
    },
    {
      title: "Track Impact & Reporting",
      description: "Both farmers and customers can track the environmental impact of their projects and purchases.",
      icon: LineChart,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How AkaraCarbon Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform connects farmers implementing sustainable practices with customers looking to offset their
              carbon footprint.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="mt-6 h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

