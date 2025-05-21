import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, PartyPopper } from 'lucide-react';
import { addEmailToWaitlist, getWaitlistCount } from '../supabase/client';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import CountdownTimer from './CountdownTimer';

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    fetchWaitlistCount();
  }, []);

  const fetchWaitlistCount = async () => {
    const { success, count } = await getWaitlistCount();
    if (success && typeof count === 'number') {
      setWaitlistCount(count);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#6366F1', '#4F46E5', '#818CF8', '#6366F1'],
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    try {
      const { success, error } = await addEmailToWaitlist(email);
      
      if (success) {
        setShowSuccess(true);
        triggerConfetti();
        setEmail('');
        await fetchWaitlistCount();
      } else {
        toast.error(error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWaitlistMessage = () => {
    const spotsLeft = 500 - waitlistCount;
    if (spotsLeft <= 0) {
      return "You've joined our waitlist! While premium spots are filled, you'll still get early access to Say It.";
    }
    return `Congratulations! You're #${waitlistCount + 1} on our waitlist. ${spotsLeft} premium spots remaining!`;
  };
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary-light-from/10 to-primary-light-to/10 dark:from-primary-dark-from/10 dark:to-primary-dark-to/10 blur-3xl -top-64 -left-32"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Join Our Waitlist
            </motion.h2>
            <motion.p 
              className="text-xl text-text-light-secondary dark:text-text-dark-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Be among the first 500 users to get lifetime premium access.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <CountdownTimer />
            </motion.div>
          </div>
          
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <PartyPopper className="w-16 h-16 mx-auto mb-6 text-primary-light-from dark:text-primary-dark-from" />
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Welcome to Say It!
                </h3>
                <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-6">
                  {getWaitlistMessage()}
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="secondary-button"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-8 rounded-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-gradient-to-r from-primary-light-from to-primary-light-to dark:from-primary-dark-from dark:to-primary-dark-to text-white hover:opacity-90 transition-opacity disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-8 flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2 text-primary-light-from dark:text-primary-dark-from">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{waitlistCount} people joined</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;