import React, { useEffect } from 'react'
import { ChevronDown, LogOut, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserStore } from '@/stores/currrentUserStore';
import Cookies from 'js-cookie';

const UserPopover: React.FC = () => {

    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const currentUser = useCurrentUserStore((state) => state.currentUser);
    const signOut = useCurrentUserStore((state) => state.signOut);

    useEffect(() => {
        console.log(currentUser)
    }, [])


    const hanldeSignOut = () => {
        signOut();
        Cookies.remove("accessToken");
        Cookies.remove("user");
        navigate("/sign-in");
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative ml-1">
                    <Avatar className='w-12 h-12 cursor-pointer'>
                        <AvatarImage src={currentUser?.avatar} alt={"User Avatar"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button className="absolute -right-[1px] -bottom-[2px] text-white w-fit h-fit p-0.5 rounded-full"><ChevronDown className="text-white" size={15} /></Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="mt-[0.63rem] p-2 rounded border bg-background dark:bg-oupia-base flex flex-col gap-1" align='end'>
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
    )
}

export default UserPopover;
