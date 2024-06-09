import { ChevronDown, LogOut, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CustomBreadCrumb from '../BreadCumb';
import { useCurrentUserStore } from '@/stores/currrentUserStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const signOut = useCurrentUserStore((state) => state.signOut);

    const hanldeSignOut = () => {
        signOut;
        navigate("/sign-in");
    }

    return (
        <header className="h-16 flex items-center bg-background border-b justify-between p-2 xl:px-8 dark:bg-oupia-base fixed top-0 w-full">
            <div className="hidden lg:flex items-center">
                <CustomBreadCrumb />
            </div>
            <div className="flex items-center gap-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="relative ml-1">
                            <Avatar className='w-12 h-12 cursor-pointer'>
                                <AvatarImage src={"https://github.com/shadcn.png"} alt={"User Avatar"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Button className="absolute -right-[1px] -bottom-[2px] text-white w-fit h-fit p-0.5 rounded-full"><ChevronDown className="text-white" size={15} /></Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="mt-[0.63rem] p-2 w-80 rounded border bg-background dark:bg-oupia-base flex flex-col gap-1" align='end'>
                        <div className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm cursor-pointer" onClick={(e) => {
                            e.stopPropagation(); changeTheme();
                        }}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Chế độ tối</span>
                            <div className="ml-auto">
                                <Switch
                                    checked={theme === "dark"}
                                    onClick={(e) => {
                                        e.stopPropagation(); changeTheme();

                                    }}
                                />
                            </div>
                        </div>
                        <Separator />
                        <div onClick={hanldeSignOut} className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Đăng xuất</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header >
    );
};

export default Header;