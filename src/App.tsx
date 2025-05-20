import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Waitlist from './components/Waitlist';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Particles from './components/Particles';

function App() {
  useEffect(() => {
    // Update the document title
    document.title = 'Say It - Never mispronounce a name again';
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#0B0B1A] transition-colors duration-300">
        <Particles />
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <Waitlist />
          <Testimonials />
        </main>
        <Footer />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg, #FFFFFF)',
              color: 'var(--toast-color, #1A1A2E)',
              border: '1px solid var(--toast-border, #B49AFF30)',
              borderRadius: '0.5rem',
            },
            success: {
              iconTheme: {
                primary: '#4FD9E4',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF7D6A',
                secondary: 'white',
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;