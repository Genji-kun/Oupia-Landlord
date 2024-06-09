import React, { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type IProvidersProps = PropsWithChildren<{
    children: React.ReactNode
}>;

const Providers: FC<IProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    );
};

export default Providers;
