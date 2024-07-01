"use client"

import { Button } from '@/components/ui/button';
import { FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSearchAmenities } from '@/hooks/query';
import { useDebounce } from '@/hooks/useDebounce';
import { TCreateAssetForm } from '@/lib/types';
import { CornerDownLeft, ThumbsUp, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

function AmenityInput({ form }: { form: UseFormReturn<TCreateAssetForm, any, undefined> }) {

    const [query, setQuery] = useState("");
    const debounceQuery = useDebounce(query, 500);
    const { amenities } = useSearchAmenities(debounceQuery);
    const selectedAmenities = form.watch("amenities") || [];

    const inputRef = useRef<HTMLDivElement>(null);

    const handleSelectTag = (amenityName: string) => {
        const updatedAmenities = [...selectedAmenities, { amenityName: amenityName }];
        form.setValue("amenities", updatedAmenities);
        setQuery("");
    }

    const handleAddNewTag = () => {
        const updatedAmenities = [...selectedAmenities, { amenityName: query }];
        form.setValue("amenities", updatedAmenities);
        setQuery("");
    }

    const handleRemoveAmenity = (name: string) => {
        const updatedAmenities = selectedAmenities.filter((amenity) => amenity.amenityName !== name);
        form.setValue("amenities", updatedAmenities);
    }

    return (
        <div className="relative space-y-2 w-full" ref={inputRef}>

            <Label className="text-foreground font-semibold">Các tiện ích của nhà trọ</Label>
            <div className="relative space-y-1">
                <Input
                    value={query}
                    onChange={(evt) => { setQuery(evt.target.value) }}
                    placeholder='Điền thông tin tiện ích...' />
                <FormDescription>Ví dụ: Máy lạnh, Tủ lạnh, v.v..</FormDescription>

                {
                    query.trim().length > 6 &&
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant={"ghost"}
                                    onClick={handleAddNewTag}
                                    className="absolute w-fit h-fit rounded-full p-2 top-0 right-1.5 dark:hover:bg-background">
                                    <CornerDownLeft className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="mb-1">
                                <p>Thêm tiện ích</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
                {
                    !!amenities?.length &&
                    <ScrollArea className="absolute bg-background z-10 bottom-2 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2">
                        <div className="flex flex-col px-2">
                            {amenities.map((amenity: { amenityName: string }, index: number) => (
                                <React.Fragment key={index}>
                                    <Button
                                        variant="ghost"
                                        className="justify-start"
                                        type='button'
                                        onClick={() => handleSelectTag(amenity.amenityName)}>
                                        {amenity.amenityName}
                                    </Button>
                                    <Separator />
                                </React.Fragment>
                            ))}
                        </div>
                    </ScrollArea>
                }
            </div>
            {
                selectedAmenities.length > 0 &&
                <div className="flex flex-wrap gap-2">
                    {
                        selectedAmenities.map((amenity, index) => (
                            <div key={index} className="flex text-sm font-semibold items-center gap-1.5 bg-primary-500/20 text-primary-500 border border-primary-500 rounded-lg h-fit px-3 py-1.5">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{amenity.amenityName}</span>
                                <Button
                                    variant={"ghost"}
                                    className="rounded-full w-fit h-fit p-1"
                                    onClick={() => handleRemoveAmenity(amenity.amenityName)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default AmenityInput;
