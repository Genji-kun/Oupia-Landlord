import CustomBreadCrumb from '../BreadCumb';
import UserPopover from './UserPopover';

const Header = () => {

    return (
        <header className="h-16 flex items-center bg-background border-b justify-between p-2 xl:px-4 xl:pl-8 dark:bg-oupia-base fixed top-0 w-full z-[999]">
            <div className="hidden lg:flex items-center">
                <CustomBreadCrumb />
            </div>
            <div className="flex items-center gap-x-2">
                <UserPopover />
            </div>
        </header >
    );
};

export default Header;