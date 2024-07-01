import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSearchUsers } from '@/hooks/query';
import { useDebounce } from '@/hooks/useDebounce';
import { IUser } from '@/lib/interfaces/User';
import { TCreateCertificationForm } from '@/lib/types'
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const UserInput = ({ form, disabled }: { form: UseFormReturn<TCreateCertificationForm, any, undefined>, disabled: boolean }) => {

    const [query, setQuery] = useState<string>("");
    const [showResults, setShowResults] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

    const inputRef = useRef<HTMLDivElement>(null);
    const debounceQuery = useDebounce(query, 500);

    const { users, isFetchingUsers } = useSearchUsers(debounceQuery)

    useEffect(() => {
        !query && setShowResults(false);
        document.addEventListener("mousedown", handleClickOutSide);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [query])

    useEffect(() => {
        if (debounceQuery && !isFetchingUsers) {
            setShowResults(true);
        }
    }, [debounceQuery, users])

    useEffect(() => {
        if (!form.getValues("userId")) {
            setSelectedUser(undefined)
        }
    }, [form.getValues("userId")])

    const handleClickOutSide = (evt: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(evt.target as Node)) {
            setQuery("");
            setShowResults(false);
        }
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "Enter") {
            if (query.trim().length > 6) {
                setQuery("");
                setShowResults(false);
            }
        }
        if (evt.key === "Escape") {
            setQuery("");
            setShowResults(false);
        }
    }

    const hanldeSelectUser = (user: IUser) => {
        setQuery("");
        setSelectedUser(user);
        form.setValue("userId", user.id);
    }


    const hanldeRemoveUser = () => {
        setQuery("");
        setSelectedUser(undefined);
        form.resetField("userId");
    }


    return (

        <div className="relative space-y-2 w-full" ref={inputRef}>
            <Label>Người được gửi chứng nhận</Label>
            {
                selectedUser ?
                    <div className="flex items-center justify-between w-full px-4 py-2 rounded bg-background shadow-md">
                        <div className='flex items-center justify-between gap-3'>
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={selectedUser.avatar} alt={selectedUser.fullName} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='h-fit'>
                                <h4 className="font-semibold text-sm">{selectedUser.fullName}</h4>
                                <h4 className="text-xs">@{selectedUser.username}</h4>
                            </div>
                        </div>
                        <Button disabled={disabled} onClick={hanldeRemoveUser} variant={"destructive"} className='w-fit h-fit p-1'>
                            <X className="w-3 h-3" />
                        </Button>
                    </div> : <>
                        <div className="relative">
                            <Input
                                value={query}
                                onChange={(evt) => { setQuery(evt.target.value) }}
                                placeholder='Tìm thông tin người dùng..' />
                        </div>
                        {
                            showResults &&
                            <ScrollArea className="absolute z-10 bottom-2 h-72 w-full rounded border border-t-0 rounded-t-none py-2">
                                <div className="flex flex-col px-2">
                                    {users && users.map((user: IUser) => {
                                        return (
                                            <>
                                                <div key={user.id} className="p-2 cursor-pointer hover:bg-border rounded" onClick={() => hanldeSelectUser(user)}>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className="w-12 h-12">
                                                            <AvatarImage src={user.avatar} alt={user.fullName} />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <div className='h-fit'>
                                                            <h4 className="font-semibold text-sm">{user.fullName}</h4>
                                                            <h4 className="text-xs">@{user.username}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Separator />
                                            </>

                                        );
                                    })}
                                </div>
                            </ScrollArea>

                        }
                    </>
            }

        </div >
    )
}

export default UserInput