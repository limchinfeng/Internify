'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface ErrorStateProps {
    error: Error
}

const Error: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const router = useRouter();

    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-3'>
            <div>
                Uh Oh
            </div>
            <div>
                Something went wrong!Try Again later.
            </div>
            <Button
                onClick={() => router.push("/")}
            >
                Home Page
            </Button>
        </div>
    )
}

export default Error