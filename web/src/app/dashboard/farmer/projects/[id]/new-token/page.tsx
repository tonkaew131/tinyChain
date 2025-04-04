import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import NewTokenForm from './_components/new-token-form';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
    const { id } = await props.params;

    return (
        <div className="min-h-screen flex-1 space-y-6">
            <Link href="/dashboard/farmer/projects" className="!mb-0">
                <Button variant="outline">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Projects
                </Button>
            </Link>

            <div className="!mt-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Mint new Token
                </h2>
                <p className="text-muted-foreground">
                    Mint new token for your project. You can mint multiple
                    tokens at once.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>
                        Provide comprehensive information about your carbon
                        reduction project.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <NewTokenForm projectId={id} />
                </CardContent>
            </Card>
        </div>
    );
}
