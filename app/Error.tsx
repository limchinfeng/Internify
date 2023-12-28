'use client';

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

    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-3'>
            <div>
                Uh Oh
            </div>
            <div>
                Something went wrong
            </div>
        </div>
    )
}

export default Error