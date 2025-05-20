import React from 'react';
import { motion } from 'framer-motion';
import HighlightAnimation from './animations/HighlightAnimation';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotate: -5
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  };

  const words = ["Never", "Mispronounce", "A Name", "Again"];

  return (
    <section className="relative min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-r from-primary-light-from/20 to-primary-light-to/20 dark:from-primary-dark-from/20 dark:to-primary-dark-to/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-secondary-light-from/10 to-secondary-light-to/10 dark:from-secondary-dark-from/10 dark:to-secondary-dark-to/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-8 space-y-4">
            {words.map((word, i) => (
              <motion.div
                key={i}
                className="overflow-hidden"
                variants={wordVariants}
              >
                <h1 className="text-5xl md:text-7xl font-bold gradient-text inline-block">
                  {word.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      className="inline-block"
                      whileHover={{
                        scale: 1.2,
                        transition: { type: "spring", stiffness: 500 }
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            ))}
          </div>

          <motion.p 
            className="text-xl md:text-2xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto mb-16"
            variants={wordVariants}
          >
            Get instant name pronunciations with a simple highlight.
            <br />
            Anywhere, anytime.
          </motion.p>

          <motion.div
            className="relative"
            variants={wordVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light-from/5 to-primary-light-to/5 dark:from-primary-dark-from/5 dark:to-primary-dark-to/5 rounded-2xl transform -rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light-from/5 to-primary-light-to/5 dark:from-primary-dark-from/5 dark:to-primary-dark-to/5 rounded-2xl transform rotate-1"></div>
            <div className="relative glass-card rounded-2xl p-8 shadow-xl hover:shadow-glow transition-shadow duration-300">
              <HighlightAnimation />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;