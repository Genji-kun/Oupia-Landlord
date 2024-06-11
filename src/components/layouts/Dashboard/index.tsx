import Header from '@/components/common/Header';
import AuthProvider from '@/components/common/Providers/AuthProvider';
import { Sidebar, SidebarItem } from '@/components/common/SideBar';
import { cn } from '@/lib/utils';
import { useExpandedStore } from '@/stores/expandedStore';
import { Home, PieChartIcon, ScrollText } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type IDashboardLayoutProps = PropsWithChildren<{}>;

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {

    const expanded = useExpandedStore((state) => state.expanded);

    return (
        <AuthProvider>
            <section className="flex flex-col h-full">
                <Header />
                <div className='flex flex-auto'>
                    <Sidebar>
                        <SidebarItem href='/' icon={<PieChartIcon className=" mx-auto" />} label='Bảng điều khiển' />
                        <SidebarItem href='/assets' icon={<Home className=" mx-auto" />} label='Quản lý nhà trọ' />
                        <SidebarItem href='/certifications' icon={<ScrollText className=" mx-auto" />} label='Quản lý chứng chỉ' />
                    </Sidebar>
                    <main className={cn("flex-auto mt-16 p-4 transition-all", expanded ? "lg:ml-[18rem]" : "lg:ml-16")}>
                        {children}
                    </main>
                </div>
            </section>
        </AuthProvider>
    );
};

export default DashboardLayout;
