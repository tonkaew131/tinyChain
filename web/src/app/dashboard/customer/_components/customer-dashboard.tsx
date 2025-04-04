
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { $api } from '@/libs/api';

export default function CustomerDashboard() {
    const { data: stats } = $api.useQuery('get', '/user/stats');

    // const stats = {
    //     data: {
    //         totalCarbonOffset: 2500,
    //         activeCredits: 1200,
    //         retiredCredits: 1300,
    //         projectsSupported: 8,
    //         tokens: [
    //             {
    //                 tokenId: 1,
    //                 projectId: 'P1006',
    //                 userId: '123',
    //                 amount: 1000,
    //                 boughtAt: '2023-01-01',
    //             },
    //             {
    //                 tokenId: 2,
    //                 projectId: 'P1007',
    //                 userId: '123',
    //                 amount: 1000,
    //                 boughtAt: '2023-01-01',
    //             },
    //         ],
    //     },
    //     isError: false,
    //     isLoading: false,
    // };

    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'overview';

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Customer Dashboard
                </h2>
                <Button asChild>
                    <Link href="/projects">Browse Projects</Link>
                </Button>
            </div>
            <Tabs defaultValue={tab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="credits">My Credits</TabsTrigger>
                    {/* <TabsTrigger value="impact">Impact</TabsTrigger> */}
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Carbon Offset
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats?.data?.totalCarbonOffset || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    tons CO₂e offset
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active Credits
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats?.data?.activeCredits || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Available credits
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Retired Credits
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <rect
                                        width="20"
                                        height="14"
                                        x="2"
                                        y="5"
                                        rx="2"
                                    />
                                    <path d="M2 10h20" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats?.data?.retiredCredits || 0}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Projects Supported
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats?.data?.projectSupport || 0}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Carbon Offset Over Time</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Impact Breakdown</CardTitle>
                                <CardDescription>
                                    Your carbon offset by project type.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">
                                                    Agriculture
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    45%
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                                <div className="h-full w-[45%] rounded-full bg-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">
                                                    Forestry
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    30%
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                                <div className="h-full w-[30%] rounded-full bg-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">
                                                    Livestock
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    15%
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                                <div className="h-full w-[15%] rounded-full bg-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}
                </TabsContent>
                <TabsContent value="credits" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {stats?.data?.tokens.map((token) => (
                            <Card key={token.tokenId}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {token.projectId}
                                    </CardTitle>
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${token.projectId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {token.amount}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {token.boughtAt.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {token.tokenId}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {token.userId}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
