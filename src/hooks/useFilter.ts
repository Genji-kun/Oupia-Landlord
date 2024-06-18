import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom';

export const useFilter = () => {
    const [searchParams] = useSearchParams();

    const keyword = useMemo(() => {
        return searchParams.get('s') || '';
    }, [searchParams])

    const query = useCallback((key : string) => {
        return searchParams.get(key) || '';
    }, [searchParams]);

    return { keyword, query };
}
