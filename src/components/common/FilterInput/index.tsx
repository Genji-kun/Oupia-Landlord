import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

type FilterProps = {
    keyParam: string;
    placeholder?: string;
    className?: string;
};

const FilterInput: React.FC<FilterProps> = ({ keyParam, placeholder, className }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get(keyParam) || '');
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const currentParam = searchParams.get(keyParam) || '';
        if (debouncedValue !== currentParam) {
            if (debouncedValue) {
                searchParams.set(keyParam, debouncedValue);
            } else {
                searchParams.delete(keyParam);
            }
            setSearchParams(searchParams);
        }
    }, [debouncedValue, keyParam, searchParams, setSearchParams]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Input
            value={value}
            onChange={handleChange}
            className={className || ''}
            placeholder={placeholder}
        />
    );
};

export default FilterInput;