'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ImageUpload } from '@/components/image-upload';
import { Button } from '@/components/ui/button';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const projectFormSchema = z.object({
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 characters.' }),
    description: z
        .string()
        .min(50, { message: 'Description must be at least 50 characters.' }),
    location: z.string().min(2, { message: 'Location is required.' }),
    projectType: z.string({ required_error: 'Please select a project type.' }),
    methodology: z.string({ required_error: 'Please select a methodology.' }),
    certification: z.string({
        required_error: 'Please select a certification standard.',
    }),
    startDate: z.string(),
    endDate: z.string(),
    carbonCredits: z
        .string()
        .min(1, { message: 'Expected carbon credits is required.' }),
    price: z.string().min(1, { message: 'Price per credit is required.' }),
    practices: z.string().min(20, {
        message:
            'Sustainable practices description must be at least 20 characters.',
    }),
    benefits: z.string().min(20, {
        message:
            'Environmental benefits description must be at least 20 characters.',
    }),
    verification: z.string().min(20, {
        message:
            'Verification process description must be at least 20 characters.',
    }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function ProjectForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            location: '',
            projectType: '',
            methodology: '',
            certification: '',
            startDate: '',
            endDate: '',
            carbonCredits: '',
            price: '',
            practices: '',
            benefits: '',
            verification: '',
        },
    });

    async function onSubmit(data: ProjectFormValues) {
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log(data);
        setIsLoading(false);

        // This would redirect to the project page in a real application
        // router.push("/dashboard/farmer/projects")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="details">
                            Project Details
                        </TabsTrigger>
                        <TabsTrigger value="methodology">
                            Methodology
                        </TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Regenerative Agriculture in Iowa"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A clear, descriptive title for your
                                        carbon reduction project.
                                    </FormDescription>
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
                                            placeholder="Describe your project, its goals, and impact..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a comprehensive description of
                                        your carbon reduction project.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Iowa, USA"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Where is your project located?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select project type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="agriculture">
                                                    Agriculture
                                                </SelectItem>
                                                <SelectItem value="forestry">
                                                    Forestry
                                                </SelectItem>
                                                <SelectItem value="livestock">
                                                    Livestock
                                                </SelectItem>
                                                <SelectItem value="renewable">
                                                    Renewable Energy
                                                </SelectItem>
                                                <SelectItem value="conservation">
                                                    Conservation
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            The category that best describes
                                            your project.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            When did/will the project start?
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
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            When is the project expected to end?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="carbonCredits"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Expected Carbon Credits (tons CO₂e)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Estimated total carbon credits to be
                                            generated.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Price per Credit (USD)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                step="0.01"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your asking price per ton of CO₂e.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-6">
                        <FormField
                            control={form.control}
                            name="practices"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sustainable Practices</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the sustainable practices implemented in your project..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Detail the specific practices
                                        you&apos;re implementing to reduce
                                        carbon emissions.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="benefits"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Environmental Benefits
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the environmental benefits of your project..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Explain the positive environmental
                                        impacts beyond carbon reduction.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>

                    <TabsContent value="methodology" className="space-y-6">
                        <FormField
                            control={form.control}
                            name="methodology"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Methodology</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select methodology" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="vm0042">
                                                VM0042: Methodology for Improved
                                                Agricultural Land Management
                                            </SelectItem>
                                            <SelectItem value="vm0017">
                                                VM0017: Adoption of Sustainable
                                                Agricultural Land Management
                                            </SelectItem>
                                            <SelectItem value="vm0026">
                                                VM0026: Methodology for
                                                Sustainable Grassland Management
                                            </SelectItem>
                                            <SelectItem value="vm0033">
                                                VM0033: Methodology for Tidal
                                                Wetland and Seagrass Restoration
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other (specify in description)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        The carbon accounting methodology used
                                        for your project.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="certification"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Certification Standard
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select certification standard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="verra">
                                                Verra
                                            </SelectItem>
                                            <SelectItem value="gold-standard">
                                                Gold Standard
                                            </SelectItem>
                                            <SelectItem value="american-carbon-registry">
                                                American Carbon Registry
                                            </SelectItem>
                                            <SelectItem value="climate-action-reserve">
                                                Climate Action Reserve
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other (specify in description)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        The certification standard you&apos;re
                                        using or planning to use.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="verification"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Process</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe how your project will be verified..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Explain the verification process for
                                        your carbon credits.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>

                    <TabsContent value="media" className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium">
                                Project Images
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Upload images that showcase your project.
                                High-quality images help attract buyers.
                            </p>
                            <Separator className="my-4" />
                            <ImageUpload />
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">Documents</h3>
                            <p className="text-sm text-muted-foreground">
                                Upload relevant project documentation, such as
                                methodology details, verification reports, etc.
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
                                            aria-hidden="true"
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
                                            PDF, DOC, DOCX (MAX. 10MB)
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button">
                        Save as Draft
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Project'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
