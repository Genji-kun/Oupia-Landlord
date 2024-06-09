import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/Dashboard";
import DashboardPage from "@/pages";
import AssetsPage from "@/pages/assets";
import SignInPage from "@/pages/sign-in";
import { createBrowserRouter } from "react-router-dom";

export const SystemRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <DashboardLayout>
                <DashboardPage />
            </DashboardLayout>

        )
    }, {
        path: "/sign-in",
        element: <AuthLayout>
            <SignInPage />
        </AuthLayout>
    }, {
        path: "/assets",
        element: (
            <DashboardLayout>
                <AssetsPage />
            </DashboardLayout>
        )
    }
])