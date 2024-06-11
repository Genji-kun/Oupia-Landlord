import React from 'react'
import { SystemRouter } from './lib/constants/SystemRouter';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

const App: React.FC = () => {
    return (
        <>
            <RouterProvider router={SystemRouter} />
            <Toaster richColors />
        </>
    )
}

export default App;
