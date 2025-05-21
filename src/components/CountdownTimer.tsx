import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 56); // 8 weeks from now

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ weeks, days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Weeks', value: timeLeft.weeks },
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 xs:gap-6 md:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            className="w-16 xs:w-20 md:w-24 h-16 xs:h-20 md:h-24 bg-white dark:bg-[#0F0F24] rounded-xl shadow-lg flex items-center justify-center border border-primary-light-from/20 dark:border-primary-dark-from/20"
          >
            <span className="text-2xl xs:text-3xl md:text-4xl font-bold gradient-text">
              {String(unit.value).padStart(2, '0')}
            </span>
          </motion.div>
          <span className="mt-2 text-sm xs:text-base text-text-light-secondary dark:text-text-dark-secondary">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;