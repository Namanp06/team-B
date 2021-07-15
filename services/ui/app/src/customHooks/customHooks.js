import { useEffect, useRef } from 'react';

export const useDebounce = (cb, timeout, depsArr) => {
    const timeoutRef = useRef();

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(cb, timeout);

        return () => clearTimeout(timeoutRef.current);
    }, depsArr);
};
