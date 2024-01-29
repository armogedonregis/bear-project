import { useState } from "react";


export const useLoader = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onLoadTrue = () => {
        setTimeout(() => {
            setIsLoading(true)
        }, 300)
    };

    const onLoadFalse = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    };

    return {
        isLoading, onLoadTrue, onLoadFalse
    }
};