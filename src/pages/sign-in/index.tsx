import SignInForm from '@/components/pages/SignIn/SignInForm';
import React from 'react'

const SignInPage: React.FC = () => {
    return (
        <section className='w-full md:w-96 flex flex-col pt-4 pb-2 px-6 rounded-lg border-b-4 border-primary-500 bg-background shadow-xl'>
            <div>
                <h1 className="font-bold text-xl">Đăng nhập</h1>
                <p className='text-xs text-muted-foreground'>Quản lý nhà trọ của bạn một cách hiệu quả.</p>
            </div>
            <SignInForm />
        </section>
    )
}

export default SignInPage;
