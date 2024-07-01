import React, { useEffect } from 'react'
import { SystemRouter } from './lib/constants/SystemRouter';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { v4 as uuid } from 'uuid';

const App: React.FC = () => {

    useEffect(() => {
        if (!localStorage.getItem("sessionToken")) {
            const token = uuid();
            localStorage.setItem("sessionToken", token);
        }
    }, [])

    return (
        <>
            <RouterProvider router={SystemRouter} />
            <Toaster richColors />
        </>
    )
}

export default App;
