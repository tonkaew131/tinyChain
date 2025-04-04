import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function HeroSection() {
    return (
        <section className="relative w-full bg-gradient-to-b from-background to-muted py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="absolute inset-0 -z-10 opacity-20">
                <Image
                    fill
                    src="/projects/1.jpeg"
                    alt="Background Carbon farming project"
                    className="object-cover"
                />
            </div>
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_600px] items-center">
                    <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                                Connecting Sustainable Farming with Climate
                                Action
                            </h1>
                            <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-lg lg:text-xl">
                                AkaraCarbon helps farmers monetize their
                                sustainable practices while enabling businesses
                                and individuals to offset their carbon
                                footprint.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <Button asChild size="lg" className="shadow-lg">
                                <Link href="/projects">
                                    Browse Carbon Projects
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="shadow-lg border-green-400 hover:border-green-500"
                            >
                                <Link href="/dashboard/farmer/new-project">
                                    List Your Project
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-lg bg-muted md:h-[400px] lg:h-[500px]">
                            <Image
                                fill
                                src="/projects/1.jpeg"
                                alt="Carbon farming project"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
