import { FC, PropsWithChildren } from 'react';

type IAuthLayoutProps = PropsWithChildren<{}>;

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
    return (
        <>
            <main className="flex flex-col items-center justify-center h-full w-full">
                {children}
            </main>
        </>
    );
};

export default AuthLayout;
