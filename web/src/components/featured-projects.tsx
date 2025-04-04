import Link from 'next/link';

import { ArrowRight, DollarSign, Leaf, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export function FeaturedProjects() {
    // This would be fetched from an API in a real application
    const projects = [
        {
            id: 1,
            title: 'Regenerative Agriculture in Iowa',
            description:
                'No-till farming and cover crops to increase soil carbon sequestration',
            location: 'Iowa, USA',
            carbonCredits: 5000,
            price: 25,
            image: '/projects/1.jpeg',
            type: 'Agriculture',
        },
        {
            id: 2,
            title: 'Agroforestry Project',
            description:
                'Integrating trees with crops to enhance biodiversity and carbon capture',
            location: 'California, USA',
            carbonCredits: 3500,
            price: 30,
            image: '/projects/2.png',
            type: 'Forestry',
        },
        {
            id: 3,
            title: 'Methane Capture from Dairy',
            description:
                'Capturing and converting methane from dairy operations into renewable energy',
            location: 'Wisconsin, USA',
            carbonCredits: 7500,
            price: 22,
            image: '/projects/3.jpg',
            type: 'Livestock',
        },
    ];

    return (
        <section className="relative w-full bg-gradient-to-b from-muted to-background py-16 md:py-24 lg:py-32">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-green-500/10 blur-3xl"></div>
                <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-flex items-center rounded-full border border-green-200/30 bg-green-100/10 px-3 py-1 text-sm font-medium text-green-500 backdrop-blur-sm">
                        <Leaf className="mr-1 h-4 w-4" /> Verified Carbon
                        Projects
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                                Featured Carbon Projects
                            </span>
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover high-impact carbon reduction projects from
                            farmers committed to sustainable practices.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="group flex flex-col overflow-hidden border-green-200/20 bg-background/80 transition-all duration-300 hover:border-green-300/30 hover:shadow-lg hover:shadow-green-500/5"
                        >
                            <div className="relative h-52 w-full overflow-hidden">
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                <img
                                    src={project.image || '/placeholder.svg'}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                                />
                                <Badge className="absolute right-3 top-3 z-20 bg-background/80 text-green-800 backdrop-blur-sm">
                                    {project.type}
                                </Badge>
                            </div>
                            <CardHeader className="flex-1">
                                <CardTitle className="line-clamp-1 transition-colors group-hover:text-green-500">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-green-100/20 p-1">
                                            <MapPin className="h-3 w-3 text-green-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">
                                                Location
                                            </span>
                                            <span className="font-medium">
                                                {project.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-blue-100/20 p-1">
                                            <Leaf className="h-3 w-3 text-blue-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">
                                                Credits
                                            </span>
                                            <span className="font-medium">
                                                {project.carbonCredits.toLocaleString()}{' '}
                                                tons
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 mt-1 flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-100/20 p-1">
                                            <DollarSign className="h-3 w-3 text-emerald-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">
                                                Price per Credit
                                            </span>
                                            <span className="font-medium">
                                                ${project.price}/ton
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    asChild
                                    className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-green-500/80 to-blue-500/80 hover:from-green-500 hover:to-blue-500"
                                >
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="flex items-center justify-center"
                                    >
                                        View Project
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        <span className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover/btn:opacity-10"></span>
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="group relative overflow-hidden border-green-500/30 bg-background/50 shadow-lg backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/5"
                    >
                        <Link href="/projects" className="flex items-center">
                            View All Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            <span className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 transition-opacity group-hover:opacity-30"></span>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
