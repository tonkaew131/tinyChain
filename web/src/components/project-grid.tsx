'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { LoaderCircle, Search } from 'lucide-react';

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

import { fetchProject, fetchProjectThumbnail } from '@/action/project';

interface Project {
    id: string;
    name: string;
    developerId: string;
    description: string;
    location: string;
    image: string;
    certification: string;
    createdAt: Date;
    updatedAt: Date;
}

export function ProjectGrid() {
    // This would be fetched from an API in a real application
    // const projects = [
    //     {
    //         id: 1,
    //         title: 'Regenerative Agriculture in Iowa',
    //         description:
    //             'No-till farming and cover crops to increase soil carbon sequestration',
    //         location: 'Iowa, USA',
    //         carbonCredits: 5000,
    //         price: 25,
    //         image: '/projects/1.jpeg',
    //         type: 'Agriculture',
    //         certification: 'Verra',
    //     },
    //     {
    //         id: 2,
    //         title: 'Agroforestry Project',
    //         description:
    //             'Integrating trees with crops to enhance biodiversity and carbon capture',
    //         location: 'California, USA',
    //         carbonCredits: 3500,
    //         price: 30,
    //         image: '/projects/2.png',
    //         type: 'Forestry',
    //         certification: 'Gold Standard',
    //     },
    //     {
    //         id: 3,
    //         title: 'Methane Capture from Dairy',
    //         description:
    //             'Capturing and converting methane from dairy operations into renewable energy',
    //         location: 'Wisconsin, USA',
    //         carbonCredits: 7500,
    //         price: 22,
    //         image: '/projects/3.jpg',
    //         type: 'Livestock',
    //         certification: 'American Carbon Registry',
    //     },
    //     {
    //         id: 4,
    //         title: 'Sustainable Rice Cultivation',
    //         description:
    //             'Implementing water management techniques to reduce methane emissions from rice paddies',
    //         location: 'Arkansas, USA',
    //         carbonCredits: 2800,
    //         price: 28,
    //         image: '/projects/4.png',
    //         type: 'Agriculture',
    //         certification: 'Verra',
    //     },
    //     {
    //         id: 5,
    //         title: 'Grassland Conservation',
    //         description:
    //             'Preserving native grasslands to prevent carbon release from soil disturbance',
    //         location: 'Montana, USA',
    //         carbonCredits: 6200,
    //         price: 20,
    //         image: '/projects/5.jpg',
    //         type: 'Conservation',
    //         certification: 'Climate Action Reserve',
    //     },
    //     {
    //         id: 6,
    //         title: 'Organic Farming Transition',
    //         description:
    //             'Supporting farmers transitioning to organic practices that enhance soil carbon',
    //         location: 'Oregon, USA',
    //         carbonCredits: 1800,
    //         price: 35,
    //         image: '/projects/6.jpg',
    //         type: 'Agriculture',
    //         certification: 'Gold Standard',
    //     },
    // ];

    const [projectData, setProjectData] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setIsLoading(true);
                const projectResponse = await fetchProject().then((res) =>
                    setProjectData(res.data)
                );

                // setProjectData(projectsWithThumbnails);
                setIsLoading(false);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error('An unknown error occurred')
                );
                setIsLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (isLoading) {
        return <LoaderCircle className="w-full animate-spin" />;
    }
    console.log(projectData);

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-8" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projectData.map((project) => (
                    <Card
                        key={project.id}
                        className="flex flex-col overflow-hidden"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/project/${project.id}/thumbnail`}
                                alt={project.name}
                                width={200}
                                height={200}
                                className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                        </div>
                        <CardHeader className="flex-1">
                            <div className="flex items-start justify-between">
                                <CardTitle className="line-clamp-1">
                                    {project.name}
                                </CardTitle>
                                <Badge>AKCO2</Badge>
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
                                        0 tCO
                                        <span className="text-[.5rem]">2</span>e
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">
                                        Price per Credit
                                    </span>
                                    <span className="font-medium">
                                        $123/ton
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">
                                        Certification
                                    </span>
                                    <span className="font-medium">
                                        AKCO2 Certified
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
