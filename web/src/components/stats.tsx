export function Stats() {
  const stats = [
    {
      value: "50+",
      label: "Carbon Projects",
    },
    {
      value: "100,000+",
      label: "Tons CO₂ Offset",
    },
    {
      value: "200+",
      label: "Farmers",
    },
    {
      value: "500+",
      label: "Customers",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-y bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="text-3xl font-bold sm:text-4xl md:text-5xl">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

