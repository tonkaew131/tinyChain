'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useState } from 'react';

import { ArrowLeft, Calendar, Globe, Leaf, MapPin } from 'lucide-react';
import { ExternalLinkIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useUpdateProfile } from '@/lib/auth-client';

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { $api } from '@/libs/api';

type WindowWithEthereum = {
    ethereum?: { request: (args: { method: string }) => Promise<string[]> };
};

export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const [isConnected, _setIsConnected] = useState(false);
    const [buyAmount, setBuyAmount] = useState<number>(0);
    const [selectedBuyToken, setSelectedBuyToken] = useState<string>('');
    const [, _setCombinedPriceData] = useState<{ [key: string]: number }[]>([]);
    const { mutate } = useUpdateProfile();
    const [isPending, setPending] = useState(false);
    const [data, setData] = useState<string>('');

    const checkIfWalletIsInstalled = () => {
        const { ethereum } = window as WindowWithEthereum;
        if (ethereum) {
            _setIsConnected(true);
        } else {
            connectWallet();
        }
    };

    const { data: project, isLoading: isProjectLoading } = $api.useQuery(
        'get',
        '/project/{id}',
        {
            params: {
                path: {
                    id: id,
                },
            },
        }
    );

    const projectTokenResult = $api.useQuery('get', '/project/{id}/token', {
        params: {
            path: {
                id: id,
            },
        },
    });

    const { data: projectTransaction } = $api.useQuery(
        'get',
        '/transaction/all'
    );

    const { mutateAsync: buy } = $api.useMutation(
        'post',
        '/project/{id}/token/{tokenId}/buy'
    );
    const handleBuy = async (tokenId: string, amount: number) => {
        if (!isConnected) {
            checkIfWalletIsInstalled();
            return;
        }
        setPending(true);

        const data = await buy({
            body: {
                amount,
            },
            params: {
                path: {
                    id: id,
                    tokenId: tokenId,
                },
            },
        });
        setPending(false);
        if (data.status !== 'ok') {
            // ...
            return;
        }
        setData(data.data.transactionHash);
        // data.transactionHash
        toast.success(
            `Buying ${amount} tokens of ID ${data.data.transactionHash}`
        );
        setTimeout(() => {
            setData('');
        }, 1000);
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window as WindowWithEthereum;
            if (!ethereum) {
                toast.warning('Please install MetaMask!');
                return;
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            mutate({
                wallet: accounts[0],
            });
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    if (isProjectLoading) return <div>Loading...</div>;

    return (
        <>
            <Dialog open={isPending || !!data}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buying...</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-6">
                        <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                                fill
                                alt="Minting new token"
                                src="https://media.tenor.com/6oVpxIFwAAoAAAAM/cat-kiss.gif"
                            />
                        </div>

                        <div className="grid h-fit gap-1 py-1">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold">Status:</p>
                                {data ? (
                                    <Badge className="px-1" variant="success">
                                        success
                                    </Badge>
                                ) : (
                                    <Badge className="px-1" variant="yellow">
                                        pending
                                    </Badge>
                                )}
                            </div>

                            <div className="flex gap-1">
                                <p className="text-nowrap font-semibold">
                                    Tx id:
                                </p>
                                <p className="text-wrap break-all font-mono">
                                    {data}
                                </p>
                            </div>

                            {!isPending && (
                                <Link
                                    href={`https://sepolia.etherscan.io/tx/${data}`}
                                    target="_blank"
                                    className="w-full"
                                >
                                    <Button className="w-full" size="sm">
                                        View on Etherscan
                                        <ExternalLinkIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="container mx-auto py-10">
                <div className="flex flex-col space-y-8">
                    <div>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="mb-4"
                        >
                            <Link href="/projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {project?.data.name}
                                </h1>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge>{project?.data.type}</Badge>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        {project?.data.location}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    AKCO2 Certified
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <ProjectGallery
                                images={[
                                    `${process.env.NEXT_PUBLIC_API_URL}/project/${id}/thumbnail`,
                                ]}
                            />
                            <Card className="mt-8">
                                <CardHeader>
                                    <CardTitle>Project Overview</CardTitle>
                                    <CardDescription>
                                        {project?.data.description}
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
                                                {projectTokenResult?.data?.data.map(
                                                    (e) => {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <span>
                                                                        -{' '}
                                                                        {e.name}
                                                                    </span>
                                                                    <span className="text-muted-foreground">
                                                                        {' '}
                                                                        {
                                                                            e.unsoldAmount
                                                                        }{' '}
                                                                        tons
                                                                    </span>
                                                                </div>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="flex items-center font-semibold">
                                                <Globe className="mr-2 h-4 w-4 text-primary" />
                                                Location
                                            </h3>
                                            <p>{project?.data.location}</p>
                                        </div>
                                        <div>
                                            <h3 className="flex items-center font-semibold">
                                                <Calendar className="mr-2 h-4 w-4 text-primary" />
                                                Project Timeline
                                            </h3>
                                            <p>
                                                {projectTokenResult.data?.data.map(
                                                    (token) => {
                                                        return (
                                                            <>
                                                                <div
                                                                    key={
                                                                        token.id
                                                                    }
                                                                >
                                                                    <span>
                                                                        - Name:{' '}
                                                                        {
                                                                            token.name
                                                                        }
                                                                    </span>
                                                                    <div className="text-muted-foreground">
                                                                        {' '}
                                                                        {new Date(
                                                                            token.startDate as unknown as Date
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
                                                                            token.endDate as unknown as Date
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
                                                        );
                                                    }
                                                )}
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
                                    {projectTransaction
                                        ?.slice(0, 5)
                                        .map((event) => (
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
                                                {projectTokenResult.data?.data.map(
                                                    (token) => (
                                                        <SelectItem
                                                            key={token.tokenId}
                                                            value={String(
                                                                token.tokenId
                                                            )}
                                                        >
                                                            Name: {token.name} (
                                                            1 Token /{' '}
                                                            {
                                                                token.pricePerToken
                                                            }
                                                            THB ) &nbsp;
                                                            {token.amount} Token
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>

                                        {selectedBuyToken && (
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">
                                                    Available{' '}
                                                    {projectTokenResult.data?.data.find(
                                                        (t) =>
                                                            String(t.tokenId) ==
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
                                                            projectTokenResult.data?.data.find(
                                                                (t) =>
                                                                    String(
                                                                        t.tokenId
                                                                    ) ==
                                                                    selectedBuyToken
                                                            )?.amount || 0
                                                        }
                                                        onChange={(e) =>
                                                            setBuyAmount(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ) || 0
                                                            )
                                                        }
                                                        className="w-full"
                                                        step={1}
                                                    />
                                                </div>
                                                <Button
                                                    className="mt-3 w-full"
                                                    onClick={() =>
                                                        handleBuy(
                                                            selectedBuyToken,
                                                            buyAmount
                                                        )
                                                    }
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
                                                ID: {project?.data.developerId}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        {project?.data.developer}
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
                                        Detailed information about available
                                        tokens
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="">
                                        {projectTokenResult.data?.data.map(
                                            (token, index) => (
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
                                                            {new Date(
                                                                token.startDate as unknown as Date
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
                                                                token.endDate as unknown as Date
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                }
                                                            )}
                                                        </p>
                                                        <p className="text-sm">
                                                            Available:{' '}
                                                            {token.amount}{' '}
                                                            tokens
                                                        </p>
                                                        <p className="text-sm font-medium">
                                                            Price:{' '}
                                                            {Number(
                                                                token.pricePerToken
                                                            ).toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'THB',
                                                                }
                                                            )}{' '}
                                                            THB
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
