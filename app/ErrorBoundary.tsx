"use client"

import React, { useState, useEffect } from 'react';

type ErrorProps = {
    children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        return () => {
            setHasError(false);
            setError(null);
        };
    }, []);


    return (
        <>
            {hasError ? (
                <div>
                    <h2>Oops, there is an error!,{error?.message}</h2>
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
};

export default ErrorBoundary;