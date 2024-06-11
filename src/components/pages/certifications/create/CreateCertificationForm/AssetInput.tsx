import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSearchAssets } from '@/hooks/query';
import { useDebounce } from '@/hooks/useDebounce';
import { IAsset } from '@/lib/interfaces/Asset';
import { TCreateCertificationForm } from '@/lib/types'
import { numberToCurrency } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const AssetInput = ({ form, disabled }: { form: UseFormReturn<TCreateCertificationForm, any, undefined>, disabled: boolean }) => {

    const [query, setQuery] = useState<string>("");
    const [showResults, setShowResults] = useState<boolean>(false);
    const [selectedAsset, setselectedAsset] = useState<IAsset | undefined>(undefined);

    const inputRef = useRef<HTMLDivElement>(null);
    const debounceQuery = useDebounce(query, 500);

    const { assets, isFetchingAssets } = useSearchAssets(debounceQuery)

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
        if (debounceQuery && !isFetchingAssets) {
            setShowResults(true);
        }
    }, [debounceQuery, assets])

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

    const hanldeSelectAsset = (asset: IAsset) => {
        setQuery("");
        setselectedAsset(asset);
        form.setValue("assetId", asset.id);
    }


    const hanldeRemoveUser = () => {
        setQuery("");
        setselectedAsset(undefined);
        form.resetField("assetId");
    }


    return (

        <div className="relative space-y-2 w-full" ref={inputRef}>
            <Label>Thông tin nhà trọ</Label>
            {
                selectedAsset ?
                    <div className="flex items-center justify-between w-full px-4 py-2 rounded bg-background shadow-md">
                        <div className='flex items-center justify-between gap-3'>
                            <Avatar className="w-12 h-12 rounded">
                                <AvatarImage src={selectedAsset.images[0]} alt={selectedAsset.assetName} />
                            </Avatar>
                            <div className='h-fit'>
                                <h4 className="font-semibold text-sm">{selectedAsset.assetName}</h4>
                                <h4 className="text-xs text-primary-500">{numberToCurrency(selectedAsset.price)}</h4>
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
                                placeholder='Tìm tên nhà trọ..' />
                        </div>
                        {
                            showResults &&
                            <ScrollArea className="absolute z-10 bottom-2 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2">
                                <div className="flex flex-col px-2">
                                    {assets && assets.map((asset: IAsset) => {
                                        return (
                                            <>
                                                <div key={asset.id} className="p-2 cursor-pointer hover:bg-border rounded" onClick={() => hanldeSelectAsset(asset)}>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className="w-12 h-12 rounded">
                                                            <AvatarImage src={asset.images[0]} alt={asset.assetName} />
                                                        </Avatar>
                                                        <div className='h-fit'>
                                                            <h4 className="font-semibold text-sm">{asset.assetName}</h4>
                                                            <h4 className="text-xs text-primary-500">{numberToCurrency(asset.price)}</h4>
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

export default AssetInput;