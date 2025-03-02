import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Layers } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close menu before scrolling on mobile
      setIsOpen(false);
      
      // Add a small delay to ensure menu closes smoothly before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Hamburger icon animation variants
  const hamburgerVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 }
  };

  // Dropdown menu animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.5,
        ease: "easeOut",
        bounce: 0.3,
        staggerChildren: 0.07
      }
    }
  };

  // Menu item animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { 
      boxShadow: "0 4px 6px -1px rgba(232, 160, 164, 0.1), 0 2px 4px -1px rgba(232, 160, 164, 0.06)" 
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(232, 160, 164, 0.3), 0 4px 6px -2px rgba(232, 160, 164, 0.15)",
      transition: {
        scale: {
          duration: 0.2,
          ease: "easeOut"
        },
        boxShadow: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 2px 4px -1px rgba(232, 160, 164, 0.2), 0 1px 2px -1px rgba(232, 160, 164, 0.1)",
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <motion.div 
        className="scroll-progress"
        style={{
          scaleX: scrollY.get() / (document.body.scrollHeight - window.innerHeight),
        }}
      />
      
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.a 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              href="#home" 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers className="h-8 w-8 text-primary-500" />
              <span className="font-serif text-xl font-bold">Priyangshu</span>
            </motion.a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }}
                  href={link.href}
                  className={`text-dark hover:text-primary-500 font-medium transition-colors relative group cursor-pointer ${
                    activeSection === link.href.substring(1) ? 'text-primary-500' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                      activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </motion.a>
              ))}
              <motion.a
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                href="#contact"
                className="btn btn-primary bg-primary-500/80 backdrop-blur-xl hover:bg-primary-500 pulse-glow overflow-hidden relative"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">Get in Touch</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                />
                <motion.span 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ 
                    x: '100%', 
                    opacity: 0.5,
                    transition: { 
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }}
                />
              </motion.a>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                onTouchStart={handleTouchStart}
                className="text-dark p-2 mobile-menu-button"
                variants={hamburgerVariants}
                animate={isOpen ? "open" : "closed"}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: isOpen ? 'absolute' : 'relative' }}
                >
                  <Menu size={24} />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: isOpen ? 'relative' : 'absolute' }}
                >
                  <X size={24} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden bg-white/95 backdrop-blur-xl absolute top-full left-0 right-0 shadow-lg overflow-hidden mobile-menu-container"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-4 py-5 space-y-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href.substring(1));
                    }}
                    href={link.href}
                    className={`block py-3 px-2 font-medium transition-all duration-300 cursor-pointer rounded-lg ${
                      activeSection === link.href.substring(1) 
                        ? 'text-primary-500 bg-primary-50/50 pl-4 border-l-2 border-primary-500' 
                        : 'text-dark hover:text-primary-500 hover:pl-4 hover:bg-gray-50/80'
                    }`}
                    variants={menuItemVariants}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0, backgroundColor: "rgba(232, 160, 164, 0.1)" }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  href="#contact"
                  className="block w-full text-center btn btn-primary bg-primary-500/90 backdrop-blur-xl hover:bg-primary-500 mt-6 overflow-hidden relative btn-mobile-touch"
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get in Touch</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <motion.span 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ 
                      x: ['100%', '-100%'],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;