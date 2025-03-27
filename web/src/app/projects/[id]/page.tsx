import Link from 'next/link';

import { ArrowLeft, Calendar, Globe, Leaf, MapPin, Shield } from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProjectPage({ params }: { params: { id: string } }) {
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
                                {project.title}
                            </h1>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge>{project.type}</Badge>
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
                                ${project.price}
                            </span>
                            <span className="text-muted-foreground">
                                per ton CO₂e
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <ProjectGallery images={project.images} />

                        <Tabs defaultValue="overview" className="mt-8">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="details">
                                    Project Details
                                </TabsTrigger>
                                <TabsTrigger value="methodology">
                                    Methodology
                                </TabsTrigger>
                                <TabsTrigger value="verification">
                                    Verification
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Project Description
                                    </h3>
                                    <p>{project.description}</p>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center text-sm font-medium">
                                                <Leaf className="mr-2 h-4 w-4 text-primary" />
                                                Carbon Credits
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {project.carbonCredits.toLocaleString()}{' '}
                                                tons
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Available for purchase
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center text-sm font-medium">
                                                <Globe className="mr-2 h-4 w-4 text-primary" />
                                                Location
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {project.location}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Project location
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center text-sm font-medium">
                                                <Calendar className="mr-2 h-4 w-4 text-primary" />
                                                Project Timeline
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-lg font-bold">
                                                {new Date(
                                                    project.startDate
                                                ).getFullYear()}{' '}
                                                -{' '}
                                                {new Date(
                                                    project.endDate
                                                ).getFullYear()}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                5 year duration
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="details" className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Sustainable Practices
                                    </h3>
                                    <ul className="list-disc space-y-1 pl-5">
                                        {project.details.practices.map(
                                            (practice, index) => (
                                                <li key={index}>{practice}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Environmental Benefits
                                    </h3>
                                    <ul className="list-disc space-y-1 pl-5">
                                        {project.details.benefits.map(
                                            (benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </TabsContent>
                            <TabsContent value="methodology">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">
                                        Methodology
                                    </h3>
                                    <p>{project.methodology}</p>
                                    <p>
                                        This methodology quantifies the
                                        greenhouse gas emission reductions and
                                        removals from the adoption of improved
                                        agricultural land management practices.
                                        The methodology applies to agricultural
                                        land management activities that reduce
                                        net greenhouse gas emissions by
                                        increasing carbon stocks in soils and
                                        woody biomass and/or decreasing
                                        emissions of carbon dioxide, methane,
                                        and nitrous oxide.
                                    </p>
                                    <p>
                                        Key elements of the methodology include:
                                    </p>
                                    <ul className="list-disc space-y-1 pl-5">
                                        <li>
                                            Baseline determination through
                                            historical land management practices
                                        </li>
                                        <li>
                                            Monitoring of implemented
                                            sustainable practices
                                        </li>
                                        <li>
                                            Calculation of carbon sequestration
                                            rates based on soil sampling
                                        </li>
                                        <li>
                                            Accounting for emissions from
                                            agricultural inputs and operations
                                        </li>
                                        <li>
                                            Consideration of leakage and
                                            permanence risks
                                        </li>
                                    </ul>
                                </div>
                            </TabsContent>
                            <TabsContent value="verification">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">
                                        Verification Process
                                    </h3>
                                    <p>{project.details.verification}</p>
                                    <p>The verification process includes:</p>
                                    <ul className="list-disc space-y-1 pl-5">
                                        <li>
                                            Annual site visits by independent
                                            auditors
                                        </li>
                                        <li>
                                            Soil sampling and analysis to
                                            measure carbon content
                                        </li>
                                        <li>
                                            Review of farm management records
                                            and practices
                                        </li>
                                        <li>
                                            Verification against the methodology
                                            requirements
                                        </li>
                                        <li>
                                            Issuance of verified carbon units
                                            after successful audit
                                        </li>
                                    </ul>
                                </div>
                            </TabsContent>
                        </Tabs>
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
                                    price={project.price}
                                    availableCredits={project.carbonCredits}
                                />
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Project Developer</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            project.farmer.image ||
                                            '/placeholder.svg'
                                        }
                                        alt={project.farmer.name}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">
                                            {project.farmer.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Member since {project.farmer.since}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm">
                                    {project.farmer.description}
                                </p>
                                <Button variant="outline" className="w-full">
                                    Contact Developer
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
