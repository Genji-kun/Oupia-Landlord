import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createAssetSchema } from '@/lib/schemas';
import { TCreateAssetForm } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import AmenityInput from './AmenityInput';
import ImageInput from './ImageInput';
import LocationInput from './LocationInput';
import { AssetType } from '@/lib/enums';
import { toast } from 'sonner';
import { useCreateAsset } from '@/hooks/mutation';
import { Loader2 } from 'lucide-react';

const CreateAssetForm = () => {

    const { isPending, mutateAsync } = useCreateAsset();

    const createAssetForm = useForm<TCreateAssetForm>({
        resolver: zodResolver(createAssetSchema),
        defaultValues: {
            assetName: "",
            assetDescription: "",
            assetType: AssetType.BOARDING_HOUSE,
            images: [],
            amenities: [],
            fullLocation: ""
        }
    })

    async function onSubmit(values: TCreateAssetForm) {
        try {
            const formData = new FormData();
            const { images, ...asset } = values;
            formData.append('asset', new Blob([JSON.stringify(asset)], { type: "application/json" }));
            images.forEach((file) => {
                formData.append("images", file);
            });
            await mutateAsync(formData);
            createAssetForm.reset();
        } catch (error) {
            toast.error("Đã có lỗi xảy ra vui lòng thử lại sau.")
        }
    }

    return (
        <Form {...createAssetForm}>
            <form onSubmit={(evt) => {
                evt.preventDefault();
                createAssetForm.handleSubmit(onSubmit)();
            }} className="flex flex-col gap-2 lg:w-3/4 mx-auto bg-background px-8 py-5 shadow-md rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={createAssetForm.control}
                        name="assetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground font-semibold'>Tên nhà trọ</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='Nhập thông tin...' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createAssetForm.control}
                        name="assetType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground font-semibold'>Loại hình căn hộ</FormLabel>
                                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Loại hình căn hộ của bạn thuộc loại nào?" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <FormMessage />
                                    <SelectContent>
                                        <SelectItem value="BOARDING_HOUSE">Dãy trọ</SelectItem>
                                        <SelectItem value="SHARED_HOUSING_SYSTEM">Hệ thống nhà chung</SelectItem>
                                        <SelectItem value="APARTMENT">Chung cư</SelectItem>
                                        <SelectItem value="DORMIROTY">Ký túc xá</SelectItem>
                                        <SelectItem value="STUDIO_APARTMENT">Căn hộ mini</SelectItem>
                                        <SelectItem value="ENTIRE_HOUSE">Nhà nguyên căn</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={createAssetForm.control}
                    name="assetDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-foreground font-semibold'>Mô tả nhà trọ</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} disabled={isPending} placeholder='Nhập nội dung mô tả...' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={createAssetForm.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground font-semibold'>Diện tích</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createAssetForm.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground font-semibold'>Giá thuê</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createAssetForm.control}
                        name="maxPeople"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground font-semibold'>Số người ở tối đa</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <AmenityInput form={createAssetForm} />
                <LocationInput form={createAssetForm} />

                <ImageInput form={createAssetForm} />
                <div className="pt-4 w-full">
                    <Button disabled={isPending} className='w-full' type="submit">
                        <span>Thêm nhà trọ</span>
                        {isPending && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
                    </Button>
                </div>
            </form>
        </Form >

    )
}

export default CreateAssetForm;