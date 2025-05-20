import React from 'react';
import { motion } from 'framer-motion';
import HighlightAnimation from './animations/HighlightAnimation';

const Hero: React.FC = () => {
  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.5
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
        damping: 10,
        duration: 0.5
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.2
      }
    })
  };

  const words = ["Never", "Mispronounce", "A Name", "Again"];

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
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="mb-6 md:mb-8 space-y-2 md:space-y-4">
            {words.map((word, i) => (
              <motion.div
                key={i}
                className="overflow-hidden"
                variants={wordVariants}
              >
                <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold gradient-text inline-block">
                  {word.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      className="inline-block"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
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
              <HighlightAnimation />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;