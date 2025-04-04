import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight, Globe, Sprout } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BorderBeam } from './magicui/border-beam';
import { Particles } from './magicui/particles';

export function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted py-16 md:py-24 lg:py-32 xl:py-48">
            <Particles color="#22c55e" className="absolute inset-0 z-50" />

            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green-500/20 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
            </div>

            {/* Subtle particle overlay */}
            <div className="bg-noise-pattern absolute inset-0 -z-10 opacity-30 mix-blend-soft-light"></div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="mx-auto inline-flex items-center rounded-full border border-green-200/30 bg-green-100/10 px-3 py-1 text-sm font-medium text-green-500 backdrop-blur-sm lg:mx-0">
                                <Sprout className="mr-1 h-4 w-4" /> Sustainable
                                Future
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tighter animate-in sm:text-5xl md:text-6xl lg:text-7xl/none">
                                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-blue-500 bg-clip-text text-transparent">
                                    Connecting Sustainable Farming with Climate
                                    Action
                                </span>
                            </h1>

                            <p className="mx-auto max-w-[600px] text-muted-foreground delay-150 animate-in md:text-lg lg:mx-0 lg:text-xl">
                                AkaraCarbon helps farmers monetize their
                                sustainable practices while enabling businesses
                                and individuals to offset their carbon
                                footprint.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-3">
                                <div className="relative rounded-lg border border-green-200/10 bg-background/50 p-4 backdrop-blur-sm">
                                    <p className="text-2xl font-bold text-green-500">
                                        500+
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Projects
                                    </p>
                                    <BorderBeam
                                        duration={6}
                                        size={400}
                                        className="from-transparent via-green-500 to-transparent"
                                    />
                                </div>
                                <div className="rounded-lg border border-green-200/10 bg-background/50 p-4 backdrop-blur-sm">
                                    <p className="text-2xl font-bold text-blue-500">
                                        10,000
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Farmers
                                    </p>
                                    <BorderBeam
                                        duration={6}
                                        size={300}
                                        className="from-transparent via-blue-500 to-transparent"
                                    />
                                </div>
                                <div className="col-span-2 rounded-lg border border-green-200/10 bg-background/50 p-4 backdrop-blur-sm md:col-span-1">
                                    <p className="text-2xl font-bold text-emerald-500">
                                        2M+ tons
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        CO₂ Offset
                                    </p>
                                    <BorderBeam
                                        duration={6}
                                        size={600}
                                        className="from-transparent via-emerald-500 to-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-500 shadow-lg hover:shadow-green-500/20"
                            >
                                <Link
                                    href="/projects"
                                    className="flex items-center"
                                >
                                    Browse Carbon Projects
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 transition-opacity group-hover:opacity-20"></span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="group relative overflow-hidden border-green-500/30 bg-background/50 shadow-lg backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/5"
                            >
                                <Link
                                    href="/dashboard/farmer/new-project"
                                    className="flex items-center"
                                >
                                    <Globe className="mr-2 h-4 w-4" />
                                    List Your Project
                                    <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 transition-opacity group-hover:opacity-20"></span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center">
                        {/* Card with images */}
                        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-background to-background/80 shadow-xl backdrop-blur-sm md:h-[450px] lg:h-[550px]">
                            {/* Main image */}
                            <div className="absolute inset-4 overflow-hidden rounded-xl">
                                <Image
                                    fill
                                    src="/projects/1.jpeg"
                                    alt="Carbon farming project"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                {/* Text overlay */}
                                <div className="absolute bottom-4 left-4 right-4 p-4">
                                    <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400 backdrop-blur-sm">
                                        Featured Project
                                    </span>
                                    <h3 className="mt-2 text-lg font-semibold text-white">
                                        Sustainable Rice Farming in Cambodia
                                    </h3>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-green-500/30 bg-green-500/20 shadow-lg backdrop-blur-md"></div>
                            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full border border-blue-500/30 bg-blue-500/20 shadow-lg backdrop-blur-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
