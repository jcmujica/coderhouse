import React from 'react';
import { BounceLoader } from 'react-spinners';

export const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-80">
            <BounceLoader
                color='#3b82f6'
            />
        </div>
    )
}
