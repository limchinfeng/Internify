"use client"

import React, { useState, useEffect } from 'react'

interface ErrorStateProps {
    children: React.ReactNode;
    error: Error;
}

const Error: React.FC<ErrorStateProps> = ({
    error, children
}) => {

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
        console.error(error);
    }, [error]);

    return (
        <>
            {hasError ? (
                <div className='h-full w-full flex flex-col items-center justify-center gap-3'>
                    <div>
                        Uh Oh
                    </div>
                    <div>
                        Something went wrong,{error?.message}
                    </div>
                    <button
                        type="button"
                        onClick={() => setHasError(false)}
                    >
                        Try again?
                    </button>
                </div>
            ) : (
                children
            )}
        </>
    );
}

export default Error