import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const HeaderMenu = () => {
    return (
        <Button variant={"ghost"} className='lg:hidden'>
            <Menu className='w-4 h-4' />
        </Button>
    )
}

export default HeaderMenu;