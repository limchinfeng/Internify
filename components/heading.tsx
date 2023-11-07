'use client';

import React from 'react'

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
    address?: string;
}

const Heading: React.FC<HeadingProps> = ({
    title, subtitle, center, address
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className='text-2xl font-bold'>
            {title}
        </div>
        <div className='font-light text-neutral-500 mt-1'>
            {address}
        </div>
        <div className='font-light text-neutral-500 '>
            {subtitle}
        </div>
    </div>
  )
}

export default Heading