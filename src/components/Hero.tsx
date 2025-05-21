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
        <motion.span className="inline-flex gap-4">
          {word.map((part, idx) => (
            <motion.span key={idx} className="inline-block">{part}</motion.span>
          ))}
        </motion.span>
      );
    }

    return (
      <motion.span className="inline-block">
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
                  className="relative -top-4 -right-1 inline-block"
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
                  <MessageSquare className="w-4 h-4 text-primary-light-from dark:text-primary-dark-from" />
                </motion.span>
              )}
            </motion.span>
          );
        })}
      </motion.span>
    );
  }, [isIconRotated, handleIconClick]);

  return (
    <section className="relative min-h-[80vh] md:min-h-screen pt-24 md:pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-gradient-to-r from-primary-light-from/20 to-primary-light-to/20 dark:from-primary-dark-from/20 dark:to-primary-dark-to/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-gradient-to-r from-secondary-light-from/10 to-secondary-light-to/10 dark:from-secondary-dark-from/10 dark:to-secondary-dark-to/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mb-6 md:mb-8 space-y-2 md:space-y-4 min-h-[280px] md:min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showSayIt ? (
                <motion.h1
                  key="say-it"
                  variants={sayItVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-6xl xs:text-7xl md:text-9xl font-black font-montserrat gradient-text cursor-pointer select-none"
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
                  className="space-y-2 md:space-y-4"
                >
                  {words.map((word, i) => (
                    <motion.div
                      key={i}
                      variants={wordVariants}
                      className="overflow-visible pb-6" // Added padding-bottom and changed overflow to visible
                    >
                      <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold gradient-text select-none">
                        {renderWord(word, word === "Again")}
                      </h1>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.p 
            className="text-lg xs:text-xl md:text-2xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto mb-12 md:mb-16"
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
            <div className="relative glass-card rounded-2xl p-4 md:p-8 shadow-xl hover:shadow-glow transition-shadow duration-300">
              <MemoizedHighlightAnimation />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;