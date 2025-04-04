'use client';

import Link from 'next/link';

import { CoinsIcon, Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { $api } from '@/libs/api';

export default function Page() {
    const { data, isLoading } = $api.useQuery('get', '/project/');

    return (
        <div className="min-h-screen flex-1 space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                    My Projects
                </h2>
                <p className="text-muted-foreground">
                    Manage and monitor your carbon reduction projects. List new
                    projects to connect with potential buyers.
                </p>
            </div>

            <Card className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Tokens</TableHead>
                            <TableHead>Developer</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead className="w-0"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <div className="flex items-center justify-center py-24 text-center text-muted-foreground">
                                        <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
                                        <span>Loading...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {data?.data.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">
                                    {p.id}
                                </TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.location}</TableCell>
                                <TableCell>
                                    {p.soldTokens}/
                                    {p.unsoldTokens + p.soldTokens}
                                </TableCell>
                                <TableCell>{p.developer}</TableCell>
                                <TableCell>
                                    {new Date(
                                        p.createdAt as unknown as string
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell className="w-0">
                                    <Link
                                        href={`/dashboard/farmer/projects/${p.id}/new-token`}
                                    >
                                        <Button size="icon" variant="default">
                                            <CoinsIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
