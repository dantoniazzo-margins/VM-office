import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Controls } from '../lib/controls';
import { Spinner } from '../ui/spinner';

export const Canvas = ({
  children,
  ...rest
}: Parameters<typeof R3FCanvas>[0]) => (
  <Suspense fallback={<Spinner />}>
    <R3FCanvas onLoad={() => console.log('Canvas loaded')} id="gl" {...rest}>
      {children}
    </R3FCanvas>

    <Controls />
  </Suspense>
);
