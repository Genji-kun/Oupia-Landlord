import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createAssetSchema } from '@/lib/schemas';
import { TCreateAssetForm } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const CreateAssetForm = () => {

    const createAssetForm = useForm<TCreateAssetForm>({
        resolver: zodResolver(createAssetSchema),
    })

    async function onSubmit(values: TCreateAssetForm) {
        console.log(values)
    }

    return (
        <Form {...createAssetForm}>
            <form onSubmit={(evt) => {
                evt.preventDefault();
                createAssetForm.handleSubmit(onSubmit)();
            }} className="flex flex-col gap-2 w-3/4 mx-auto bg-background px-8 py-5 shadow-md rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={createAssetForm.control}
                        name="assetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên nhà trọ</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                <FormLabel>Loại hình căn hộ</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <FormLabel>Mô tả nhà trọ</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} />
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
                                <FormLabel>Diện tích</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                <FormLabel>Giá thuê</FormLabel>
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
                                <FormLabel>Số người ở tối đa</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="pt-4 w-full">
                    <Button className='w-full' type="submit">Thêm nhà trọ</Button>
                </div>
            </form>
        </Form >

    )
}

export default CreateAssetForm;