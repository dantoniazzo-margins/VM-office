import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Office from './Office';
import React from 'react';

const rootContainer = document.querySelector('#root');

if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);

  root.render(
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 2, 6],
      }}
    >
      <Office />
    </Canvas>
  );
}
