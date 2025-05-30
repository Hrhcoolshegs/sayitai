import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HighlightAnimation from './animations/HighlightAnimation';
import { MessageSquare } from 'lucide-react';

const MemoizedHighlightAnimation = memo(HighlightAnimation);

const Hero: React.FC = () => {
  const [showSayIt, setShowSayIt] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const sayItVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const words = ["Never", "Mispronounce", ["A", "Name"], "Again"];

  const handleIconClick = useCallback(() => {
    if (isIconRotated) {
      setShowSayIt(true);
    }
  }, [isIconRotated]);

  const handleSayItClick = useCallback(() => {
    setShowSayIt(false);
    setIsIconRotated(false);
  }, []);

  const renderWord = useCallback((word: string | string[], isLastWord: boolean) => {
    if (Array.isArray(word)) {
      return (
        <motion.span className="inline-flex gap-2 xs:gap-3 sm:gap-4">
          {word.map((part, idx) => (
            <motion.span key={idx} className="inline-block font-display font-extrabold tracking-tight leading-[0.9]">{part}</motion.span>
          ))}
        </motion.span>
      );
    }

    return (
      <motion.span className="inline-block font-display font-extrabold tracking-tight leading-[0.9]">
        {word.split('').map((letter, index) => {
          const isLastN = isLastWord && letter.toLowerCase() === 'n' && index === word.length - 1;
          
          return (
            <motion.span
              key={`${word}-${index}`}
              className={`inline-block ${isLastN ? 'cursor-pointer' : ''}`}
            >
              {letter}
              {isLastN && (
                <motion.span
                  className="relative -top-3 xs:-top-4 sm:-top-5 md:-top-6 -right-1 inline-block"
                  animate={{ rotate: isIconRotated ? 360 : 0 }}
                  onHoverStart={() => setIsIconRotated(true)}
                  onClick={handleIconClick}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <MessageSquare className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-primary-light-from dark:text-primary-dark-from" />
                </motion.span>
              )}
            </motion.span>
          );
        })}
      </motion.span>
    );
  }, [isIconRotated, handleIconClick]);

  return (
    <section className="relative min-h-[90vh] xs:min-h-screen pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-16 xs:pb-20 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[300px] xs:w-[400px] sm:w-[600px] md:w-[1200px] h-[300px] xs:h-[400px] sm:h-[600px] md:h-[1200px] bg-gradient-to-r from-primary-light-from/20 to-primary-light-to/20 dark:from-primary-dark-from/20 dark:to-primary-dark-to/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-[200px] xs:w-[300px] sm:w-[400px] md:w-[800px] h-[200px] xs:h-[300px] sm:h-[400px] md:h-[800px] bg-gradient-to-r from-secondary-light-from/10 to-secondary-light-to/10 dark:from-secondary-dark-from/10 dark:to-secondary-dark-to/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 space-y-2 xs:space-y-3 sm:space-y-4 min-h-[280px] xs:min-h-[320px] sm:min-h-[400px] md:min-h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showSayIt ? (
                <motion.h1
                  key="say-it"
                  variants={sayItVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-6xl xs:text-7xl sm:text-8xl md:text-[12rem] font-extrabold font-display gradient-text cursor-pointer select-none tracking-tight leading-[0.9] py-2 xs:py-3 sm:py-4"
                  onClick={handleSayItClick}
                >
                  Say It
                </motion.h1>
              ) : (
                <motion.div
                  key="main-text"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  className="space-y-1 xs:space-y-2 sm:space-y-3 md:space-y-4"
                >
                  {words.map((word, i) => (
                    <motion.div
                      key={i}
                      variants={wordVariants}
                      className="overflow-visible mb-2 xs:mb-3 sm:mb-4 md:mb-6"
                    >
                      <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-9xl font-extrabold gradient-text select-none tracking-tight leading-[0.9]">
                        {renderWord(word, word === "Again")}
                      </h1>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.p 
            className="text-lg xs:text-xl sm:text-2xl md:text-4xl text-text-light-secondary dark:text-text-dark-secondary max-w-4xl mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-4 font-display font-medium"
            variants={wordVariants}
          >
            Get instant name pronunciations with a simple highlight.
            <br className="hidden xs:block" />
            Anywhere, anytime.
          </motion.p>

          <motion.div
            className="relative max-w-full overflow-hidden"
            variants={wordVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light-from/5 to-primary-light-to/5 dark:from-primary-dark-from/5 dark:to-primary-dark-to/5 rounded-2xl transform -rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light-from/5 to-primary-light-to/5 dark:from-primary-dark-from/5 dark:to-primary-dark-to/5 rounded-2xl transform rotate-1"></div>
            <div className="relative glass-card rounded-2xl p-4 xs:p-6 sm:p-8 md:p-12 shadow-xl hover:shadow-glow transition-shadow duration-300">
              <MemoizedHighlightAnimation />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;