'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowLeft, MapPin, Shield } from 'lucide-react';

import { ProjectGallery } from '@/components/project-gallery';
import { ProjectPurchaseForm } from '@/components/project-purchase-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { $api } from '@/libs/api';

/*
{
    "status": "ok",
    "data": {
        "id": "P1006",
        "developerId": "D1000",
        "location": "Wongsawang 11",
        "name": "Wow",
        "description": "test",
        "type": "agriculture",
        "createdAt": "2025-03-27T18:49:27.725Z",
        "updatedAt": "2025-03-27T18:49:27.725Z"
    }
}

{
    "status": "ok",
    "data": [
        {
            "id": "Md1fCrPNcmT1",
            "tokenId": 2,
            "projectId": "P1006",
            "name": "ปลูกต้นไม้ 2567",
            "amount": "500",
            "unsoldAmount": "439",
            "pricePerToken": "50",
            "startDate": "2025-03-26 17:00:00",
            "endDate": "2025-05-30 17:00:00",
            "createdAt": "2025-03-27T18:52:42.268Z"
        }
    ]
}
*/

export default function ProjectPage() {
    const params = useParams<{
        id: string;
    }>();
    const projectResult = $api.useQuery('get', '/project/{id}', {
        params: {
            path: {
                id: params.id,
            },
        },
    });
    const projectTokenResult = $api.useQuery('get', '/project/{id}/token', {
        params: {
            path: {
                id: params.id,
            },
        },
    });
    // console.log(projectResult.data, projectTokenResult.data);
    // This would be fetched from an API in a real application
    const project = {
        id: Number.parseInt(params.id),
        title: 'Regenerative Agriculture in Iowa',
        description:
            'This project implements no-till farming and cover crops to increase soil carbon sequestration on 5,000 acres of farmland in central Iowa. The practices not only reduce carbon emissions but also improve soil health, water quality, and biodiversity.',
        location: 'Iowa, USA',
        carbonCredits: 5000,
        price: 25,
        images: [
            '/projects/1.jpeg',
            '/placeholder.svg?height=400&width=600',
            '/placeholder.svg?height=400&width=600',
        ],
        type: 'Agriculture',
        certification: 'Verra',
        methodology:
            'VM0042: Methodology for Improved Agricultural Land Management',
        startDate: '2022-03-15',
        endDate: '2027-03-14',
        farmer: {
            name: 'Johnson Family Farms',
            since: 2010,
            description:
                'A fifth-generation family farm committed to sustainable agriculture practices.',
            image: '/placeholder.svg?height=100&width=100',
        },
        details: {
            practices: [
                'No-till farming to minimize soil disturbance',
                'Cover crops to increase soil organic matter',
                'Reduced fertilizer use through precision agriculture',
                'Crop rotation to improve soil health',
                'Buffer strips to prevent erosion and improve water quality',
            ],
            benefits: [
                'Carbon sequestration in soil',
                'Reduced greenhouse gas emissions',
                'Improved soil health and water retention',
                'Enhanced biodiversity',
                'Reduced water pollution from agricultural runoff',
            ],
            verification:
                'Annual third-party verification by certified auditors to ensure compliance with Verra standards.',
        },
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col space-y-8">
                <div>
                    <Button asChild variant="ghost" size="sm" className="mb-4">
                        <Link href="/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {projectResult.data?.data.name}
                            </h1>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge>{projectResult.data?.data.type}</Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {project.location}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Shield className="mr-1 h-4 w-4" />
                                    {project.certification}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">
                                $
                                {projectTokenResult.data?.data[0].pricePerToken}
                            </span>
                            <span className="text-muted-foreground">
                                per ton CO₂e
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <ProjectGallery
                            images={[
                                `http://localhost:65535/api/project/${params.id}/thumbnail`,
                            ]}
                        />

                        <div>
                            <h3 className="mb-2 mt-5 text-xl font-semibold">
                                Project Description
                            </h3>
                            <p>{projectResult.data?.data.description}</p>
                        </div>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Purchase Carbon Credits</CardTitle>
                                <CardDescription>
                                    Support this project by purchasing carbon
                                    credits
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProjectPurchaseForm
                                    projectId={project.id}
                                    price={Number(
                                        projectTokenResult.data?.data[0]
                                            .pricePerToken
                                    )}
                                    availableCredits={Number(
                                        projectTokenResult.data?.data[0].amount
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
