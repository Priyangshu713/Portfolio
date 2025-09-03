import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Database, Zap, Award, BookOpen } from 'lucide-react';
import { skillCategories } from '../data/skills';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [activeCategory, setActiveCategory] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
          element.classList.add('appear');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.05 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
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

  const getCategoryIcon = (name: string) => {
    switch(name.toLowerCase()) {
      case 'data analytics':
        return <Database className="w-6 h-6" />;
      case 'business intelligence':
        return <Award className="w-6 h-6" />;
      case 'statistical modeling':
        return <BookOpen className="w-6 h-6" />;
      case 'other skills':
        return <Zap className="w-6 h-6" />;
      case 'soft skills':
        return <Award className="w-6 h-6" />;
      case 'learning':
        return <BookOpen className="w-6 h-6" />;
      default:
        return <Database className="w-6 h-6" />;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section id="skills" className="section py-24 bg-gradient-to-b from-white to-gray-50 animated-gradient">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-serif font-bold mb-4 relative inline-block section-title ${titleInView ? 'animate-underline' : ''}`}
          >
            My Expertise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg fade-in-up">
            I specialize in <b>data analysis</b>, <b>business intelligence</b>, and <b>statistical modeling</b>. My skill set includes extracting insights from data, building visualizations, and solving real-world problems using Python, SQL, and BI tools.
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 magnetic-effect ${
                activeCategory === index 
                  ? 'bg-primary-500/80 backdrop-blur-sm text-white shadow-md scale-in appear' 
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-gray-100/80 border border-white/50 fade-in-up'
              }`}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <span className={activeCategory === index ? 'text-white' : 'text-primary-500'}>
                {getCategoryIcon(category.name)}
              </span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-white/50 shine"
            >
              <div className="p-1 bg-gradient-to-r from-primary-300/80 to-primary-500/80"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="font-sans text-xl font-semibold text-gray-800">{skill.name}</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {skill.level >= 90 ? 'Expert' : 
                       skill.level >= 80 ? 'Advanced' : 
                       skill.level >= 70 ? 'Proficient' : 
                       skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary-50/80 flex items-center justify-center pulse-glow">
                    <span className="text-primary-500 font-bold">{skill.level}%</span>
                  </div>
                </div>
                
                <div className="relative h-2 bg-gray-100/80 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400/90 to-primary-500/90 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.2 * index, ease: "easeOut" }}
                  />
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(skill.level / 20) 
                          ? 'bg-primary-500/90' 
                          : 'bg-gray-200/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-20 bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/50 fade-in-up"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-10">
              <h3 className="font-serif text-2xl font-bold mb-4">Want to work together?</h3>
              <p className="text-gray-600">
                I'm always open to discussing product design work or partnership opportunities.
              </p>
            </div>
            <motion.a
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              href="#contact"
              className="px-8 py-4 bg-primary-500/80 backdrop-blur-sm text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 pulse-glow overflow-hidden relative btn-hover-effect"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={{ 
                boxShadow: ["0 4px 6px -1px rgba(232, 160, 164, 0.1)", "0 10px 15px -3px rgba(232, 160, 164, 0.3)", "0 4px 6px -1px rgba(232, 160, 164, 0.1)"],
                scale: [1, 1.03, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
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
      </motion.div>
    </section>
  );
};

export default Skills;
