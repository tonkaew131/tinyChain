'use client';

import { useState } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export function ProjectFilters() {
    const [priceRange, setPriceRange] = useState([10, 50]);

    const projectTypes = [
        { id: 'agriculture', label: 'Agriculture' },
        { id: 'forestry', label: 'Forestry' },
        { id: 'livestock', label: 'Livestock' },
        { id: 'renewable', label: 'Renewable Energy' },
    ];

    const locations = [
        { id: 'northeast', label: 'Northeast' },
        { id: 'midwest', label: 'Midwest' },
        { id: 'south', label: 'South' },
        { id: 'west', label: 'West' },
        { id: 'international', label: 'International' },
    ];

    const certifications = [
        { id: 'verra', label: 'Verra' },
        { id: 'gold-standard', label: 'Gold Standard' },
        { id: 'american-carbon-registry', label: 'American Carbon Registry' },
        { id: 'climate-action-reserve', label: 'Climate Action Reserve' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Accordion
                    type="multiple"
                    defaultValue={['price', 'type', 'location']}
                >
                    <AccordionItem value="price">
                        <AccordionTrigger>Price Range ($/ton)</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                <Slider
                                    defaultValue={priceRange}
                                    min={5}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) =>
                                        setPriceRange(value as number[])
                                    }
                                />
                                <div className="flex items-center justify-between">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="type">
                        <AccordionTrigger>Project Type</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {projectTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox id={`type-${type.id}`} />
                                        <Label htmlFor={`type-${type.id}`}>
                                            {type.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="location">
                        <AccordionTrigger>Location</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {locations.map((location) => (
                                    <div
                                        key={location.id}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox
                                            id={`location-${location.id}`}
                                        />
                                        <Label
                                            htmlFor={`location-${location.id}`}
                                        >
                                            {location.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="certification">
                        <AccordionTrigger>Certification</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox id={`cert-${cert.id}`} />
                                        <Label htmlFor={`cert-${cert.id}`}>
                                            {cert.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Button className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    );
}
