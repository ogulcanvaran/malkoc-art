'use client';

import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  url: string;
  className?: string;
}

export function SplineScene({ url, className = 'w-full h-full' }: SplineSceneProps) {
  return (
    <div className={className}>
      <Spline scene={url} />
    </div>
  );
}
