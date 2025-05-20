import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import useSound from 'use-sound';

const HighlightAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [playFirstName] = useSound('/audio/oluwasindara.mp3', {
    onend: () => {
      playLastName();
    }
  });
  
  const [playLastName] = useSound('/audio/aderibigbe.mp3', {
    onend: () => {
      setIsPlaying(false);
    }
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePronunciation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playFirstName();
    }
  };
  
  return (
    <div className="bg-gray-100 dark:bg-[#080812] rounded-lg p-4 md:p-6 relative">
      <div className="max-w-md mx-auto font-normal text-[#1A1A2E] dark:text-[#F0F0FF] text-left leading-relaxed">
        <p>
          Hi Adebimpe, thank you for your email about the upcoming conference.
        </p>
        <p className="mt-3">
          I'd like to introduce you to {' '}
          <span className={`relative ${step >= 1 ? 'bg-[#B49AFF]/30 dark:bg-[#C2ACFF]/30 rounded px-1' : ''}`}>
            Oluwasindara Aderibigbe
            {step >= 2 && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute -top-1 -right-2 w-4 h-4 bg-gradient-to-r from-[#8A4FFF] to-[#4FB0FF] dark:from-[#9F6AFF] dark:to-[#52C5FF] rounded-full flex items-center justify-center cursor-pointer z-10 ${isPlaying ? 'animate-pulse' : ''}`}
                onClick={handlePronunciation}
                disabled={isPlaying}
                aria-label="Play name pronunciation"
              >
                <Volume2 className="w-2 h-2 text-white" />
              </motion.button>
            )}
          </span>
          {' '} from our marketing team.
        </p>
        
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0F0F24] p-3 rounded-xl shadow-xl border border-[#B49AFF]/30 dark:border-[#C2ACFF]/30 z-20 w-64"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Volume2 className="w-4 h-4 text-[#8A4FFF] dark:text-[#9F6AFF] mr-2" />
                <span className="text-sm font-medium text-[#1A1A2E] dark:text-[#F0F0FF]">
                  Pronunciation
                </span>
              </div>
              <div className="text-xs text-[#6E7191] dark:text-[#B4B8D2]">
                Say It
              </div>
            </div>
            <div className="text-[#484D7A] dark:text-[#D7DAFF] text-sm">
              <p>oh-loo-wah-SIN-dah-rah</p>
              <p>ah-DEH-ree-BEE-gbeh</p>
            </div>
            <div className="w-full bg-gray-100 dark:bg-[#080812] h-1 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#8A4FFF] to-[#4FB0FF] dark:from-[#9F6AFF] dark:to-[#52C5FF]"
                initial={{ width: 0 }}
                animate={{ width: isPlaying ? '100%' : '0%' }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HighlightAnimation;