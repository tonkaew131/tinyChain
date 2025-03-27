import Link from 'next/link';

import { Search } from 'lucide-react';

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
import { Input } from '@/components/ui/input';

export function ProjectGrid() {
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
            certification: 'Verra',
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
            certification: 'Gold Standard',
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
            certification: 'American Carbon Registry',
        },
        {
            id: 4,
            title: 'Sustainable Rice Cultivation',
            description:
                'Implementing water management techniques to reduce methane emissions from rice paddies',
            location: 'Arkansas, USA',
            carbonCredits: 2800,
            price: 28,
            image: '/projects/4.png',
            type: 'Agriculture',
            certification: 'Verra',
        },
        {
            id: 5,
            title: 'Grassland Conservation',
            description:
                'Preserving native grasslands to prevent carbon release from soil disturbance',
            location: 'Montana, USA',
            carbonCredits: 6200,
            price: 20,
            image: '/projects/5.jpg',
            type: 'Conservation',
            certification: 'Climate Action Reserve',
        },
        {
            id: 6,
            title: 'Organic Farming Transition',
            description:
                'Supporting farmers transitioning to organic practices that enhance soil carbon',
            location: 'Oregon, USA',
            carbonCredits: 1800,
            price: 35,
            image: '/projects/6.jpg',
            type: 'Agriculture',
            certification: 'Gold Standard',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-8" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                                        tCO
                                        <span className="text-[.5rem]">2</span>e
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">
                                        Price per Credit
                                    </span>
                                    <span className="font-medium">
                                        ${project.price}/ton
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">
                                        Certification
                                    </span>
                                    <span className="font-medium">
                                        {project.certification}
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
        </div>
    );
}
