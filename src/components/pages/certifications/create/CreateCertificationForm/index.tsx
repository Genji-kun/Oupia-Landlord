import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { createCertificationSchema } from '@/lib/schemas'
import { TCreateCertificationForm } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import UserInput from './UserInput'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import AssetInput from './AssetInput'
import { useCreateCertification } from '@/hooks/mutation'
import { toast } from 'sonner'
import { useEffect } from 'react'

const CreateCertificationForm = () => {

    const { isPending, mutateAsync, isSuccess } = useCreateCertification();

    const createCertiForm = useForm<TCreateCertificationForm>({
        resolver: zodResolver(createCertificationSchema),
        defaultValues: {
            userId: undefined,
            assetId: undefined,
            startDate: undefined
        }
    })

    async function onSubmit(values: TCreateCertificationForm) {
        try {
            await mutateAsync(values);

        } catch (error) {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
            console.error(error)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Thêm chứng nhận thành công.")
            createCertiForm.reset();
        }
    }, [isSuccess])


    return (
        <Form {...createCertiForm}>
            <form onSubmit={createCertiForm.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-1/2 mx-auto bg-background p-10 shadow-md rounded-lg">
                <FormField name="userId" control={createCertiForm.control} render={() => (
                    <FormItem>
                        <FormControl>
                            <UserInput form={createCertiForm} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="assetId" control={createCertiForm.control} render={() => (
                    <FormItem>
                        <FormControl>
                            <AssetInput form={createCertiForm} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={createCertiForm.control} name="startDate" render={({ field }) => (
                    <FormItem className="flex flex-col w-full gap-1 pt-1 mb-2">
                        <Label>Ngày bắt đầu hợp đồng</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        disabled={isPending}
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Chọn ngày</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button disabled={isPending} className='w-fit h-fit px-5 py-2 mx-auto '>
                    <span>Thêm chứng nhận</span>
                    {isPending && <Loader2 className='ml-3 w-4 h-4 animate-spin' />}
                </Button>
            </form>
        </Form>
    )
}

export default CreateCertificationForm