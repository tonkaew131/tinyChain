'use client';

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
    const { data } = $api.useQuery('get', '/project/');

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
                            <TableHead>Developer</TableHead>
                            <TableHead>Created at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">
                                    {p.id}
                                </TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.location}</TableCell>
                                <TableCell>{p.developer}</TableCell>
                                <TableCell>
                                    {new Date(
                                        p.createdAt as unknown as string
                                    ).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
