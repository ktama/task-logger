import { useEffect, useState } from "react";

export default function useWatch(interval: number) {
    const [time, updateTime] = useState(Date.now());

    useEffect(() => {
        const timeoutId: number = setTimeout(() => updateTime(Date.now()), interval);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [time]);
    return time
}