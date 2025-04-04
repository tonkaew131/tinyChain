'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { $api } from '@/libs/api';

const projectFormSchema = z.object({
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 characters.' }),
    description: z
        .string()
        .min(20, { message: 'Description must be at least 50 characters.' }),
    location: z.string().min(2, { message: 'Location is required.' }),
});

export function ProjectForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            location: '',
        },
    });

    async function onSubmit(data: z.infer<typeof projectFormSchema>) {
        console.log('Form data:', data);

        setIsLoading(true);
        try {
            await $api.useMutation('post', '/project/').mutate({
                body: {
                    name: data.title,
                    location: data.location,
                    description: data.description,
                    thumbnail: ' ',
                },
            });
            console.log('Project submitted:', data);
        } catch (error) {
            console.error('Submission error:', error);
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Carrot no carbon"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="This carrot no carbon cause we didn't plant"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="LA(loi Aet)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <h3 className="text-lg font-medium">Project Image</h3>
                    <p className="text-sm text-muted-foreground">
                        Upload images that showcase your project.
                    </p>
                    <Separator className="my-4" />
                    <div className="flex w-full items-center justify-center">
                        <label
                            htmlFor="dropzone-file"
                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                    className="mb-4 h-8 w-8 text-muted-foreground"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{' '}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    setSelectedFile(e.target.files?.[0] || null)
                                }
                            />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Project'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
