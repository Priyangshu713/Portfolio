import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Layers } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a 
              href="#home" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              <Layers className="h-8 w-8 text-primary-500" />
              <span className="font-serif text-xl font-bold">Priyangshu</span>
            </a>
            <p className="text-gray-400 mt-2 max-w-md">
              Creating beautiful, functional, and user-centered digital experiences.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mb-4 hover:bg-primary-400 transition-colors overflow-hidden relative"
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(232, 160, 164, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} className="text-white relative z-10" />
              <motion.span 
                className="absolute inset-0 bg-white/20"
                initial={{ y: '100%', opacity: 0 }}
                whileHover={{ 
                  y: '-100%', 
                  opacity: 0.5,
                  transition: { 
                    duration: 0.6,
                    ease: "easeInOut"
                  }
                }}
              />
            </motion.button>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Priyangshu Dutta. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;