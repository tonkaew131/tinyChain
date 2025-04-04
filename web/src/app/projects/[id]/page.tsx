'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { ArrowLeft, Calendar, Globe, Leaf, MapPin } from 'lucide-react';
import { toast } from 'sonner';

import {
    activities,
    projects,
    tokens,
} from '@/lib/mock-data';

import { ActivityItem } from '@/components/activity-item';
import { ProjectGallery } from '@/components/project-gallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface TokenData {
    id: string;
    tokenId: number;
    projectId: string;
    name: string;
    amount: string;
    unsoldAmount: string;
    pricePerToken: string;
    startDate: string;
    endDate: string;
    createdAt: string;
}

interface ActivityEvent {
    id: string; 
    eventType: 'mint' | 'list' | 'sale' | 'cancel';
    tokenId: number;
    projectId: string;
    amount: number;
    sellerAddress: string;
    buyerAddress?: string;
    priceFormatted?: string;
    transactionHash: string;
    blockTimestamp: Date;
}

interface Project {
    id: string;
    type: string;
    name: string;
    location: string;
    description: string;
    developerId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    developer: string;
}

export default function ProjectPage() {
    const { id } = useParams<{id: string}>();
    const [isConnected, _setIsConnected] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [projectTokens, setProjectTokens] = useState<TokenData[]>([]);
    const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>([]);
    const [buyAmount, setBuyAmount] = useState<number>(0);
    const [selectedBuyToken, setSelectedBuyToken] = useState<string>('');
    const [, _setCombinedPriceData] = useState<
        { [key: string]: number }[]
    >([]);

    useEffect(() => {
        // Find project from mock data
        const projectId = id;
        const foundProject = projects.find((p) => p.id === projectId);
        if (foundProject) {
            setProject({ ...foundProject, image: "http://localhost:65535/api/project/"+projectId+"/thumbnail" });
        }
        // Filter tokens for this project
        const projectTokens = tokens.filter((t) => t.projectId == projectId);
        setProjectTokens(projectTokens);

        // Combine price history for all tokens
        const _tokenIds = projectTokens.map((t) => t.id);
        // const dates = tokenPriceHistory[tokenIds[0]].map((d) => d.date);
        // const combined = dates.map((date, i) => {
        //     const dataPoint: { [key: string]: number } = {
        //         date: new Date(date).getTime(),
        //     };
        //     tokenIds.forEach((tokenId) => {
        //         dataPoint[`token${tokenId}`] =
        //             tokenPriceHistory[
        //                 tokenId as keyof typeof tokenPriceHistory
        //             ][i].price;
        //     });
        //     return dataPoint;
        // });
        // setCombinedPriceData(combined);

        // Filter activities for this project
        // const projectActivities = activities
        //     .filter((a) => a.id === projectId)
        //     .sort(
        //         (a, b) =>
        //             b.blockTimestamp.getTime() - a.blockTimestamp.getTime()
        //     );
        // setRecentActivity(projectActivities);

        // Simulate real-time updates
        const interval = setInterval(() => {
            const eventType =
                Math.random() > 0.5 ? ('list' as const) : ('sale' as const);
            const newActivity: ActivityEvent = {
                id: Date.now().toString(),
                eventType,
                tokenId: projectTokens[0]?.tokenId || 1,
                projectId: projectId,
                amount: Math.floor(Math.random() * 100) + 1,
                sellerAddress: '0x1234...5678',
                buyerAddress:
                    eventType === 'sale' ? '0x9876...4321' : undefined,
                priceFormatted: `${Number(projectTokens[0]?.pricePerToken).toFixed(2) || '25.00'} THB`,
                transactionHash: '0x' + Math.random().toString(16).slice(2),
                blockTimestamp: new Date(),
            };

            setRecentActivity((prev) => [newActivity, ...prev]);
        }, 10000); // New activity every 10 seconds


        return () => clearInterval(interval);
    }, [id]);

    const connectWallet = async () => {
        // try {
        //     if (typeof window.ethereum !== 'undefined') {
        //         await window.ethereum.request({
        //             method: 'eth_requestAccounts',
        //         });
        //         setIsConnected(true);
        //         toast.success('Successfully connected to MetaMask');
        //     } else {
        //         toast.error('Please install MetaMask to use this feature');
        //     }
        // } catch (error) {
        //     console.error('Error connecting wallet:', error);
        //     toast.error('Failed to connect to MetaMask');
        // }
    };

    const handleBuy = async (tokenId: number, amount: number) => {
        if (!isConnected) {
            await connectWallet();
            return;
        }
        toast.success(`Buying ${amount} tokens of ID ${tokenId}`);
    };

    if (!project) return <div>Loading...</div>;

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
                                {project.name}
                            </h1>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge>{project.type}</Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {project.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <ProjectGallery images={[project.image]} />

                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                                <CardDescription>
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <h3 className="flex items-center font-semibold">
                                            <Leaf className="mr-2 h-4 w-4 text-primary" />
                                            Carbon Credits  
                                        </h3>
                                        <p>
                                            {tokens.map((e) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <span>- {e.name}</span>
                                                            <span className="text-muted-foreground">
                                                                {' '}
                                                                {e.amount} tons
                                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                            
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="flex items-center font-semibold">
                                            <Globe className="mr-2 h-4 w-4 text-primary" />
                                            Location
                                        </h3>
                                        <p>{project.location}</p>
                                    </div>
                                    <div>
                                        <h3 className="flex items-center font-semibold">
                                            <Calendar className="mr-2 h-4 w-4 text-primary" />
                                            Project Timeline
                                        </h3>
                                        <p>
                                            {projectTokens.map((token) => {
                                                return (
                                                    <>
                                                        <div key={token.id}>
                                                            <span>- Name: {token.name}</span>
                                                            <div className="text-muted-foreground">
                                                                {' '}
                                                                {new Date(
                                                                    token.startDate
                                                                ).toLocaleDateString(
                                                                    'en-US',
                                                                    {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                    }
                                                                )}
                                                                {' - '}
                                                                {new Date(
                                                                    token.endDate
                                                                ).toLocaleDateString(
                                                                    'en-US',
                                                                    {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                        <div className="mt-8">
                            <h2 className="mb-4 text-2xl font-bold">
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                {recentActivity.slice(0, 5).map((event) => (
                                    <ActivityItem
                                        key={event.id}
                                        event={event}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Buy Carbon Credits</CardTitle>
                                <CardDescription>
                                    Purchase directly from the developer
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Select
                                        value={selectedBuyToken}
                                        onValueChange={setSelectedBuyToken}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a token" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projectTokens.map((token) => (
                                                <SelectItem
                                                    key={token.id}
                                                    value={token.id.toString()}
                                                >
                                                    Token {token.id} (
                                                    {/* {token.year}) -{' '}
                                                    {token.price.toLocaleString()}{' '} */}
                                                    THB
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {selectedBuyToken && (
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">
                                                Available{' '}
                                                {projectTokens.find(
                                                    (t) =>
                                                        t.id.toString() ===
                                                        selectedBuyToken
                                                )?.amount || 0}{' '}
                                                tokens
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Amount to buy"
                                                    min={1}
                                                    max={
                                                        projectTokens.find(
                                                            (t) =>
                                                                t.id.toString() ===
                                                                selectedBuyToken
                                                        )?.amount || 0
                                                    }
                                                    onChange={(e) =>
                                                        setBuyAmount(
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                    className="w-full"
                                                    step={1}
                                                />
                                            </div>
                                            <Button
                                                className="w-full mt-3"
                                                onClick={() =>
                                                    handleBuy(
                                                        parseInt(
                                                            selectedBuyToken
                                                        ),
                                                        buyAmount
                                                    )
                                                }
                                                // disabled={
                                                //     !buyAmount ||
                                                //     buyAmount >
                                                //         (projectTokens.find(
                                                //             (t) =>
                                                //                 t.id.toString() ===
                                                //                 selectedBuyToken
                                                //         )?.amount || 0) ||
                                                //     !isConnected
                                                // }
                                            >
                                                {isConnected
                                                    ? 'Buy Now'
                                                    : 'Connect Wallet to Buy'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Project Developer</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h3 className="font-semibold">
                                           ID: {project.developerId}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-sm">
                                    {project.developer}
                                </p>
                                {/* <Button variant="outline" className="w-full">
                                    Contact Developer
                                </Button> */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Token Details</CardTitle>
                                </div>
                                <CardDescription>
                                    Detailed information about available tokens
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="">
                                    {projectTokens.map((token, index) => (
                                        <div
                                            key={token.id}
                                            tabIndex={index}
                                            className={`collapse collapse-plus`}
                                        >
                                            <div className="collapse-title font-semibold">
                                                Token ID {token.id}
                                            </div>
                                            <div className="collapse-content text-sm">
                                                <p className="text-sm text-muted-foreground">
                                                    {
                                                        new Date(
                                                            token.startDate
                                                        ).toLocaleDateString(
                                                            'en-US',    
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            }
                                                        )
                                                    }
                                                    {' - '}
                                                    {
                                                        new Date(
                                                            token.endDate
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            }
                                                        )
                                                    }
                                                </p>
                                                <p className="text-sm">
                                                    Available: {token.amount}{' '}
                                                    tokens
                                                </p>
                                                <p className="text-sm font-medium">
                                                    Price:{' '}
                                                    {Number(token.pricePerToken).toLocaleString(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency: 'THB',
                                                        }
                                                    )}{' '}
                                                    THB
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
