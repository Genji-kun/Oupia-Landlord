import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TCreateAssetForm } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FilePlus2, X } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

const ImageInput = ({ form }: { form: UseFormReturn<TCreateAssetForm, any, undefined> }) => {

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            const updatedFiles = [...(form.getValues('images') || []), ...newFiles];
            form.setValue('images', updatedFiles);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const newFiles = Array.from(event.dataTransfer.files);
            const updatedFiles = [...(form.getValues('images') || []), ...newFiles];
            form.setValue('images', updatedFiles);
            setIsDragging(false);
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = (form.getValues('images') || []).filter((_: File, i) => i !== index);
        form.setValue('images', updatedFiles);
    };


    return (
        <FormField
            control={form.control}
            name='images'
            render={() => (
                <FormItem className='space-y-2'>
                    <FormLabel className="text-foreground font-semibold">Hình ảnh nhà trọ</FormLabel>
                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={cn(
                            'relative rounded border-2 border-dashed border-muted-foreground/50 p-3 text-sm font-medium text-muted-foreground/50 hover:border-primary-500 hover:bg-accent hover:text-primary-500 hover:shadow-lg',
                            isDragging && 'cursor-copy border-primary-500 bg-accent text-primary-500 shadow-lg',
                            'cursor-pointer'
                        )}
                    >
                        <label
                            htmlFor='images-input'
                            className='flex items-center justify-center gap-2 w-full'
                        >
                            <FilePlus2 className='h-5 w-5' />
                            <span className='flex items-center gap-1'>
                                Thêm hoặc kéo thả tệp tin
                            </span>
                        </label>
                        <FormControl>
                            <Input
                                id='images-input'
                                type='file'
                                multiple
                                accept=".png,.jpg,.jpeg"
                                className='hidden'
                                onChange={handleChangePhoto}
                            />
                        </FormControl>
                    </div>
                    <div className='space-y-2'>
                        {!!form.getValues("images").length &&
                            <div className="flex flex-wrap gap-5 items-center pt-4">
                                {
                                    form.getValues("images")?.map((image: File, index: number) => (
                                        <div key={index} className="col-span-1 relative ">
                                            <X className="text-destructive font-bold w-6 h-6 p-1 bg-background hover:bg-border dark:hover:bg-oupia-sub dark:bg-oupia-base rounded-full absolute -right-2 -top-2 cursor-pointer" onClick={() => handleRemoveFile(index)} />
                                            <img className="rounded-lg object-cover w-32 aspect-square" src={URL.createObjectURL(image)} alt={image.name} />
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ImageInput;
