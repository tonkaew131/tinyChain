'use client';

import Image from 'next/image';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { LeafyGreenIcon } from 'lucide-react';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { $api } from '@/libs/api';

const newTokenFormSchema = z.object({
    name: z.string().nonempty('Name is required'),
    amount: z.coerce.number().min(1, 'Amount must be at least 1'),
    pricePerToken: z.coerce
        .number()
        .min(0, 'Price per token must be at least 0'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
});

interface NewTokenFormProps {
    projectId: string;
}

export default function NewTokenForm(props: NewTokenFormProps) {
    const { mutate, isPending, data } = $api.useMutation(
        'post',
        '/project/{id}/token'
    );
    const form = useForm<z.infer<typeof newTokenFormSchema>>({
        resolver: zodResolver(newTokenFormSchema),
    });

    function onSubmit(values: z.infer<typeof newTokenFormSchema>) {
        mutate({
            body: {
                ...values,
                amount: values.amount.toString(),
                pricePerToken: values.pricePerToken.toString(),
                startDate: values.startDate.toISOString() as unknown as Record<
                    string,
                    never
                >,
                endDate: values.endDate.toISOString() as unknown as Record<
                    string,
                    never
                >,
            },
            params: {
                path: {
                    id: props.projectId,
                },
            },
        });
    }

    return (
        <>
            <Dialog open={isPending || data}>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Minting new Token...</DialogTitle>
                        <DialogDescription>
                            Please wait while we mint your tokens. This may take
                            a few moments.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-6">
                        <div className="relative h-48 w-48 overflow-hidden rounded-md">
                            <Image
                                fill
                                alt="Minting new token"
                                src="https://media.tenor.com/6oVpxIFwAAoAAAAM/cat-kiss.gif"
                            />
                        </div>

                        <div className="py-1">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold">Status:</p>
                                <Badge className="px-1" variant="yellow">
                                    pending
                                </Badge>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid max-w-3xl grid-cols-2 gap-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter token name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Name of the token. This will be displayed to
                                    the buyer.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter token amount"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Total number of tokens to mint.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="pricePerToken"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Per Token</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter price per token"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Price of each token in the ฿THB.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        date={field.value}
                                        onDateChange={(date) => {
                                            field.onChange(date);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The date when the token sale starts.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        date={field.value}
                                        onDateChange={(date) => {
                                            field.onChange(date);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The date when the token sale ends.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="col-span-2" type="submit">
                        <LeafyGreenIcon className="h-4 w-4" />
                        Mint
                    </Button>
                </form>
            </Form>
        </>
    );
}
