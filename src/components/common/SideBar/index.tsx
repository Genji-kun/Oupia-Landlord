"use client"

import { cn } from '@/lib/utils';
import React, { createContext, useContext } from 'react';

import { ChevronFirst, ChevronLast } from 'lucide-react';
import Logo from '../Logo';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useExpandedStore } from '@/stores/expandedStore';

const SidebarContext = createContext<boolean | undefined>(undefined);
const Sidebar = ({ children }: { children: React.ReactNode }) => {

    const { expanded, toggle } = useExpandedStore();

    return (
        <aside className="dark:bg-oupia-base hidden lg:block border-r border-border h-screen fixed left-0 inset-y-0 z-[1000] bg-background">
            <div className="p-3 flex items-center justify-center ">
                <div className={cn("overflow-hidden transition-all px-3 w-56", !expanded && "w-0 px-0")}>
                    <Logo />
                </div>
                <Button variant={"ghost"} className="px-2 py-4" onClick={toggle}>
                    {expanded! ? <ChevronFirst /> : <ChevronLast />}
                </Button>
            </div>
            <nav className="h-full flex flex-col shadow-sm">
                <SidebarContext.Provider value={expanded!}>
                    <ul className="flex flex-col gap-2 p-3">
                        {children}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
};

const SidebarItem = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => {

    const location = useLocation();
    const pathname = location.pathname;
    const isActive = (pathname === "/" && href === "/") || pathname === href || (pathname !== "/" && pathname?.startsWith(`${href}/`));
    const expanded = useContext(SidebarContext);

    return (
        <li className="relative group">
            <Link to={href} className={cn(" text-muted-foreground flex items-center py-2 px-0 rounded hover:bg-border/55 relative after:content-[''] after:absolute after:w-[3px] after:bg-primary-500 after:-right-3 after:top-0 after:h-0 hover:after:h-full after:transition-all", isActive && "text-primary-500 bg-primary-100/50 hover:bg-primary-100/50 dark:bg-primary-900/40 dark:hover:bg-primary-900/40 after:h-full")}>
                {icon}
                <span className={cn("font-semibold overflow-hidden transition-all text-nowrap text-sm", expanded ? "w-52 ml-3" : "w-0")}>{label}</span>
            </Link>
            <>
                <span
                    className="text-nowrap absolute top-1/2 -translate-y-1/2 font-semibold
                        left-full rounded px-3 py-1.5 ml-6 bg-border dark:bg-slate-800 text-primary-500 border border-border
                        z-20 opacity-20 -translate-x-3 invisible transition-all 
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {label}
                </span>

            </>
        </li >
    );
}
export { Sidebar, SidebarItem };
