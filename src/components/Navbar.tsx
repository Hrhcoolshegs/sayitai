import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showLogo, setShowLogo] = useState(false);

  return (
    <motion.nav 
      className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#0B0B1A]/70 transition-colors duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="relative cursor-pointer"
            onClick={() => setShowLogo(!showLogo)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="h-8 w-8 text-[#8A4FFF] dark:text-[#9F6AFF]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4FD9E4] dark:bg-[#5FEAF5] rounded-full"></div>
          </motion.div>
          
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-xl font-black font-montserrat bg-gradient-to-r from-[#8A4FFF] to-[#4FB0FF] dark:from-[#9F6AFF] dark:to-[#52C5FF] text-transparent bg-clip-text"
              >
                Say It
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-[#080812] hover:bg-gray-200 dark:hover:bg-[#0F0F24] transition-colors duration-300"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-[#F0F0FF]" />
          ) : (
            <Moon className="h-5 w-5 text-[#1A1A2E]" />
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;