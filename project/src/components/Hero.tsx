import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / 25;
      const moveY = (e.clientY - centerY) / 25;
      
      elements.forEach((el, index) => {
        const depth = parseInt(el.getAttribute('data-depth') || '1');
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // Fixed designation titles
  const designations = [
    "Frontend Developer",
    "UI/UX Designer",
    "Creative Thinker",
    "Problem Solver"
  ];
  
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20" ref={containerRef}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary-100 opacity-30 blur-3xl parallax-element" data-depth="2"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-primary-300 opacity-20 blur-3xl parallax-element" data-depth="1.5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-200 opacity-20 blur-3xl parallax-element animated-gradient" data-depth="1"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 md:pr-8">
          <motion.p 
            className="text-primary-500 font-medium mb-2 text-reveal md:text-right"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-reveal md:text-right"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Priyangshu Dutta
          </motion.h1>
          
          <motion.div 
            className="h-12 mb-6 overflow-hidden md:flex md:justify-end"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.div
              animate={{ 
                y: [0, -48, -96, -144, 0] 
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="md:text-right"
            >
              {designations.map((title, index) => (
                <div key={index} className="h-12 flex items-center md:justify-end">
                  <p className="text-2xl md:text-3xl font-serif text-primary-500">{title}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mb-8 max-w-lg fade-in-up md:text-right md:ml-auto"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            I craft beautiful, functional, and user-centered digital experiences with a focus on motion and interaction design.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 md:justify-end"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.a 
              href="#projects" 
              className="btn btn-primary pulse-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#" 
              className="btn btn-outline flex items-center gap-2 shine"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Download CV
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative">
            {/* Background gradient circle with pulse animation */}
            <motion.div 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-100 to-primary-300 parallax-element animated-gradient"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              data-depth="0.5"
            ></motion.div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
              <div className="absolute top-0 left-1/4 w-1/2 h-full bg-primary-200/30 blur-md transform -rotate-45"></div>
              <div className="absolute bottom-0 right-1/4 w-1/2 h-full bg-primary-300/20 blur-md transform rotate-45"></div>
            </div>
            
            {/* Profile image with floating animation */}
            <motion.div
              className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg parallax-element floating"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              data-depth="0.8"
            >
              <img 
                src="https://avatars.githubusercontent.com/u/134028923?s=400&u=6d1d5bf707cbcd08ee9519a9a898f9d724c57358&v=4" 
                alt="Priyangshu Dutta" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent"></div>
              
              {/* Shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              ></motion.div>
            </motion.div>
            
            {/* Decorative floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-primary-300/60 pulse-glow"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Repositioned scroll down button to avoid overlapping with Download CV button */}
      <div className="hidden md:block">
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.a 
            href="#about"
            className="flex flex-col items-center text-gray-500 hover:text-primary-500 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium mb-2">Scroll Down</span>
            <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 flex items-center justify-center hover:bg-primary-50 transition-colors pulse-glow">
              <ChevronDown size={20} className="text-primary-500" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;