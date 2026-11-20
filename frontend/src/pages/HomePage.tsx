import React from 'react';
import { LottieLight } from 'lottie-react';
import sleepingHeadAnimation from '@/assets/sleeping-head.json';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-1 w-full h-full items-center justify-center p-6 sm:p-10 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Official Sleeping Head Lottie Animation (sleeping-head-L617p2W31T) */}
        <div
          className="w-56 h-56 sm:w-64 sm:h-64 mb-4 flex items-center justify-center"
          aria-hidden="true"
        >
          <LottieLight
            src={sleepingHeadAnimation}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        {/* Clear Status Message */}
        <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
          Waiting for Backend and AI to finish work
        </h1>
      </div>
    </div>
  );
};
