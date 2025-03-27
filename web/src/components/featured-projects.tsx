import Link from 'next/link';

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
        <section className="w-full bg-background py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Featured Carbon Projects
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover high-impact carbon reduction projects from
                            farmers committed to sustainable practices.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="flex flex-col overflow-hidden"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={project.image || '/placeholder.svg'}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardHeader className="flex-1">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="line-clamp-1">
                                        {project.title}
                                    </CardTitle>
                                    <Badge>{project.type}</Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground">
                                            Location
                                        </span>
                                        <span className="font-medium">
                                            {project.location}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground">
                                            Credits Available
                                        </span>
                                        <span className="font-medium">
                                            {project.carbonCredits.toLocaleString()}{' '}
                                            tons
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex flex-col">
                                        <span className="text-muted-foreground">
                                            Price per Credit
                                        </span>
                                        <span className="font-medium">
                                            ${project.price}/ton
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/projects/${project.id}`}>
                                        View Project
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
