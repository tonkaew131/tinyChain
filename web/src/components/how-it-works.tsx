import {
    ArrowRight,
    ChevronRight,
    Leaf,
    LineChart,
    ShieldCheck,
    Sprout,
} from 'lucide-react';

export function HowItWorks() {
    const steps = [
        {
            title: 'Farmers List Projects',
            description:
                'Farmers create detailed listings of their carbon reduction projects, including methodologies and expected outcomes.',
            icon: Sprout,
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            textColor: 'text-green-500',
            hoverBg: 'group-hover:bg-green-500/20',
            hoverShadow: 'group-hover:shadow-green-500/20',
            hoverText: 'group-hover:text-green-500',
        },
        {
            title: 'Verification & Certification',
            description:
                'Projects undergo rigorous verification to ensure they meet carbon reduction standards.',
            icon: ShieldCheck,
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            textColor: 'text-blue-500',
            hoverBg: 'group-hover:bg-blue-500/20',
            hoverShadow: 'group-hover:shadow-blue-500/20',
            hoverText: 'group-hover:text-blue-500',
        },
        {
            title: 'Customers Purchase Credits',
            description:
                'Businesses and individuals browse projects and purchase carbon credits to offset their emissions.',
            icon: Leaf,
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
            textColor: 'text-emerald-500',
            hoverBg: 'group-hover:bg-emerald-500/20',
            hoverShadow: 'group-hover:shadow-emerald-500/20',
            hoverText: 'group-hover:text-emerald-500',
        },
        {
            title: 'Track Impact & Reporting',
            description:
                'Both farmers and customers can track the environmental impact of their projects and purchases.',
            icon: LineChart,
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/20',
            textColor: 'text-cyan-500',
            hoverBg: 'group-hover:bg-cyan-500/20',
            hoverShadow: 'group-hover:shadow-cyan-500/20',
            hoverText: 'group-hover:text-cyan-500',
        },
    ];

    return (
        <section className="relative w-full bg-gradient-to-b from-background to-muted py-16 md:py-24 lg:py-32">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-green-500/10 blur-3xl"></div>
                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-flex items-center rounded-full border border-green-200/30 bg-green-100/10 px-3 py-1 text-sm font-medium text-green-500 backdrop-blur-sm">
                        <ChevronRight className="mr-1 h-4 w-4" /> Simple Process
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 bg-clip-text text-transparent">
                                How AkaraCarbon Works
                            </span>
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform connects farmers implementing
                            sustainable practices with customers looking to
                            offset their carbon footprint.
                        </p>
                    </div>
                </div>

                <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Connection lines - improved version */}
                    <div className="absolute left-0 top-24 hidden w-full lg:block">
                        <div className="mx-auto h-0.5 w-3/4 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-blue-400/30"></div>
                    </div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center"
                        >
                            <div
                                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${step.bgColor} border backdrop-blur-sm ${step.borderColor} shadow-lg transition-all duration-300 group-hover:scale-110 ${step.hoverBg} ${step.hoverShadow} relative z-10`}
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                <step.icon
                                    className={`h-10 w-10 ${step.textColor}`}
                                />
                                <div
                                    className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full ${step.textColor.replace('text', 'bg')} text-xs font-bold text-white`}
                                >
                                    {index + 1}
                                </div>
                            </div>

                            <h3
                                className={`text-xl font-bold ${step.hoverText} transition-colors`}
                            >
                                {step.title}
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                {step.description}
                            </p>

                            {index < steps.length - 1 && (
                                <div className="mt-6 flex justify-center lg:hidden">
                                    <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="max-w-3xl rounded-xl border border-green-500/10 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-blue-500/10 p-6 backdrop-blur-sm">
                        <p className="text-center text-lg">
                            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text font-semibold text-transparent">
                                Join our ecosystem
                            </span>{' '}
                            of sustainable farming practices
                            <br /> and carbon offsetting solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
