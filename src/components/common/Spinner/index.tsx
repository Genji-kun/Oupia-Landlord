import { Loader2 } from 'lucide-react'

const Spinner = ({ marginY }: { marginY: string }) => {
    return (
        <div className={`my-[${marginY}] w-full flex items-center justify-center`}>
            <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        </div>
    )
}

export default Spinner