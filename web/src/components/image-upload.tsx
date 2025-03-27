'use client';

import { useState } from 'react';

import { Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ImageUpload() {
    const [images, setImages] = useState<string[]>([
        '/placeholder.svg?height=200&width=300',
    ]);

    const addImage = () => {
        if (images.length < 5) {
            setImages([...images, '/placeholder.svg?height=200&width=300']);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image, index) => (
                    <div key={index} className="group relative">
                        <img
                            src={image || '/placeholder.svg'}
                            alt={`Project image ${index + 1}`}
                            className="h-40 w-full rounded-md object-cover"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => removeImage(index)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                        </Button>
                    </div>
                ))}
                {images.length < 5 && (
                    <Button
                        variant="outline"
                        className="flex h-40 flex-col items-center justify-center border-dashed"
                        onClick={addImage}
                    >
                        <Plus className="mb-2 h-6 w-6" />
                        <span>Add Image</span>
                    </Button>
                )}
            </div>
            <p className="text-xs text-muted-foreground">
                You can upload up to 5 images. The first image will be used as
                the cover image.
            </p>
        </div>
    );
}
