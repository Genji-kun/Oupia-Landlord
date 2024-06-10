import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/Dashboard";
import DashboardPage from "@/pages";
import AssetsPage from "@/pages/assets";
import CreateAssetPage from "@/pages/assets/create";
import AssetDetailPage from "@/pages/assets/detail/[slug]";
import SignInPage from "@/pages/sign-in";
import { Outlet, createBrowserRouter } from "react-router-dom";

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
                <Outlet />
            </DashboardLayout>
        ),
        children: [
            {
                path: "/assets",
                element: (
                    <AssetsPage />
                )
            },
            {
                path: "/assets/create",
                element: (
                    <CreateAssetPage />
                )
            },
            {
                path: "/assets/detail",
                element: (
                    <CreateAssetPage />
                )
            },
            {
                path: "/assets/detail/:slug",
                element: (
                    <AssetDetailPage />
                )
            }
        ]
    }
])