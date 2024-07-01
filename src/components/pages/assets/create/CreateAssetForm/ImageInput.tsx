import { Button } from '@/components/ui/button';
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
                    <FormLabel className="text-foreground font-semibold">Các tiện ích của nhà trọ</FormLabel>
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
                        {form.getValues('images')?.map((file, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <span className='flex-auto truncate text-muted-foreground'>{file.name}</span>
                                <Button
                                    type='button'
                                    variant={'destructive'}
                                    className='px-2 py-1 w-fit h-fit'
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    <X className='h-3 w-3' />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ImageInput;
