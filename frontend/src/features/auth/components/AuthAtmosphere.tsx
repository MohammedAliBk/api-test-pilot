import React from 'react';
import { MatrixJunctionCanvas } from './MatrixJunctionCanvas';

export const AuthAtmosphere: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0"
      style={{ backgroundColor: 'black' }}
      aria-hidden="true"
    >
      {/* WebGL Matrix Laser Canvas (Spans 100% of viewport) */}
      <MatrixJunctionCanvas />

      {/* Iridescent Ribbon Wave Image Texture with Left-to-Right Mask Fade */}
      <img
        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none z-20"
        style={{
          opacity: 0.42,
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 28%, transparent 85%)',
          maskImage: 'linear-gradient(to right, black 0%, black 28%, transparent 85%)',
        }}
      />

      {/* Continuous Right-Side Gradient to fuse into the form workspace */}
      <div
        className="absolute inset-0 z-30 pointer-events-none hidden min-[901px]:block"
        style={{
          background: 'linear-gradient(to right, transparent 0%, transparent 40%, var(--color-surface) 90%)',
        }}
      />
    </div>
  );
};
