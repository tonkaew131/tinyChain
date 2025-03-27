'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProjectGalleryProps {
    images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative overflow-hidden rounded-lg">
            <div className="relative aspect-video">
                <img
                    src={images[currentImage] || '/placeholder.svg'}
                    alt={`Project image ${currentImage + 1}`}
                    className="h-full w-full object-cover"
                />

                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="h-6 w-6" />
                            <span className="sr-only">Previous image</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                            onClick={nextImage}
                        >
                            <ChevronRight className="h-6 w-6" />
                            <span className="sr-only">Next image</span>
                        </Button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-2 flex justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full ${index === currentImage ? 'bg-primary' : 'bg-muted'}`}
                            onClick={() => setCurrentImage(index)}
                        >
                            <span className="sr-only">
                                View image {index + 1}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
