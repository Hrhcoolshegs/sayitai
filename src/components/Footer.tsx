import React, { useState } from 'react';
import { Twitter, MessageSquare } from 'lucide-react';
import BookDemo from './BookDemo';

const Footer: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <footer className="py-12 bg-white dark:bg-gray-900 relative border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Say It</h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Never mispronounce a name again. Get instant pronunciations anywhere.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Connect</h3>
            <div className="space-y-2">
              <a 
                href="https://x.com/ibtouchdown"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light-from dark:hover:text-primary-dark-from transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>@ibtouchdown</span>
              </a>
              <a 
                href="https://x.com/HrHCoolshegs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light-from dark:hover:text-primary-dark-from transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>@HrHCoolshegs</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Resources</h3>
            <div className="space-y-2">
              <button
                onClick={() => setIsDemoOpen(true)}
                className="flex items-center space-x-2 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light-from dark:hover:text-primary-dark-from transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Book a Demo</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Created by</h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Ibrahim Oga and Oluwasegun Akinshola Lawrence
            </p>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-text-light-tertiary dark:text-text-dark-tertiary">
            © 2025 Say It. All rights reserved.
          </p>
        </div>
      </div>

      <BookDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </footer>
  );
};

export default Footer;