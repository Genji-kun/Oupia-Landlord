import { TSignInForm } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/mutation";
import { CircleUser, KeyRoundIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SignInForm = () => {

    const { mutateAsync, isPending } = useSignIn();

    const loginForm = useForm<TSignInForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    async function onSubmit(form: TSignInForm) {
        try {
            await mutateAsync(form);
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400)
                    toast.error("Tên đăng nhập hoặc mật khấu không đúng, vui lòng thử lại.")
                else
                    toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau.")
            }
            else {
                toast.error("Không kết nối được với máy chủ, vui lòng thử lại.")
            }
        }

    }


    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-2 my-4">
                <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='rounded-none border-0 border-b '
                                    icon={<CircleUser className='h-5 w-5 text-muted-foreground' />}
                                    line={true}
                                    placeholder='Tên người dùng'
                                    type='text'
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='rounded-none border-0 border-b '
                                    icon={<KeyRoundIcon className='h-5 w-5 text-muted-foreground' />}
                                    line={true}
                                    placeholder='********'
                                    type='password'
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='flex justify-end pt-2'>
                    <Button disabled={isPending} className="bg-primary-500 hover:bg-primary-600 py-2 h-fit text-xs">
                        Tiếp tục
                        {isPending && <Loader2 className="ml-2 w-4 h-4 animate-spin" />}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default SignInForm;
