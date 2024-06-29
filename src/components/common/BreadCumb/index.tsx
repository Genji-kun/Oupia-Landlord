import * as React from "react";

import { Slash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useExpandedStore } from "@/stores/expandedStore";

const CustomBreadCrumb = () => {

    const { pathname } = useLocation();
    const expanded = useExpandedStore(state => state.expanded);

    const pathSegments = pathname.split('/').filter(Boolean);

    const items = pathSegments.map((segment, index, array) => {
        let label = "";
        let href = "";

        switch (segment) {
            case "assets":
                label = "Quản lý nhà trọ";
                break;
            case "create":
                label = "Thêm mới";
                break;
            default:
                label = segment;
        }

        if (index === array.length - 1) {
            return { label };
        } else {
            href = '/' + pathSegments.slice(0, index + 1).join('/');
            return { href, label };
        }
    }).filter(item => item !== null);

    return (
        <Breadcrumb className={cn("transition-all", expanded ? "ml-[17rem]" : "ml-12")}>
            <BreadcrumbList>
                {pathname === "/" ?
                    <BreadcrumbPage className="font-semibold uppercase">
                        Bảng điều khiển
                    </BreadcrumbPage>
                    : <>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    {item && item.href ? (
                                        <BreadcrumbLink
                                            asChild
                                            className="hover:font-bold uppercase"
                                        >
                                            <Link to={item.href}>{item.label}</Link>
                                        </BreadcrumbLink>
                                    ) : item ? (
                                        <BreadcrumbPage className="font-semibold uppercase">
                                            {item.label}
                                        </BreadcrumbPage>
                                    ) : null}
                                </BreadcrumbItem>
                                {index < items.length - 1 && (
                                    <BreadcrumbSeparator>
                                        <Slash />
                                    </BreadcrumbSeparator>
                                )}
                            </React.Fragment>
                        ))}
                    </>
                }

            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadCrumb;
