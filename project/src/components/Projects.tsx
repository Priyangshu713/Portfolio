import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
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
        staggerChildren: 0.2,
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
  
  return (
    <section id="projects" className="section bg-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 blur-3xl"></div>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <motion.h2 
          ref={titleRef}
          variants={itemVariants} 
          className={`section-title ${titleInView ? 'animate-underline' : ''}`}
        >
          Featured Projects
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-gray-700 max-w-3xl mb-12 fade-in-up">
          Here are some of my recent projects that showcase my skills in frontend development and UI/UX design. Each project represents a unique challenge and solution.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="card group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 fade-in-up"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              style={{ transitionDelay: `${0.1 * idx}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white font-serif text-xl font-bold">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-primary-500/70 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex space-x-4">
                  <motion.a
                    href={project.link}
                    className="text-primary-500 hover:text-primary-600 flex items-center gap-1 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="text-gray-700 hover:text-dark flex items-center gap-1 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <Github size={16} />
                    <span>Source Code</span>
                  </motion.a>
                </div>
              </div>
              
              <motion.div 
                className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-md pulse-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveProject(project.id)}
              >
                <ExternalLink size={20} className="text-primary-500" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {activeProject !== null && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {projects.find(p => p.id === activeProject) && (
                  <>
                    <div className="relative h-80">
                      <img 
                        src={projects.find(p => p.id === activeProject)?.image} 
                        alt={projects.find(p => p.id === activeProject)?.title} 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                        onClick={() => setActiveProject(null)}
                      >
                        <span className="text-2xl">&times;</span>
                      </button>
                    </div>
                    <div className="p-8">
                      <h3 className="font-serif text-2xl font-bold mb-2">
                        {projects.find(p => p.id === activeProject)?.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {projects.find(p => p.id === activeProject)?.tags.map((tag, index) => (
                          <span key={index} className="text-sm bg-primary-100/80 backdrop-blur-sm text-primary-500 px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6">
                        {projects.find(p => p.id === activeProject)?.description}
                      </p>
                      <div className="flex space-x-4">
                        <motion.a
                          href={projects.find(p => p.id === activeProject)?.link}
                          className="btn btn-primary bg-primary-500/80 backdrop-blur-sm overflow-hidden relative btn-hover-effect"
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={buttonVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <span className="relative z-10">View Live Demo</span>
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0"
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { duration: 0.3 }
                            }}
                          />
                        </motion.a>
                        <motion.a
                          href={projects.find(p => p.id === activeProject)?.github}
                          className="btn btn-outline overflow-hidden relative"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10">View Source Code</span>
                          <motion.span 
                            className="absolute inset-0 bg-primary-100/30"
                            initial={{ x: '-100%', opacity: 0 }}
                            whileHover={{ 
                              x: '0%', 
                              opacity: 1,
                              transition: { 
                                duration: 0.3,
                                ease: "easeOut"
                              }
                            }}
                          />
                        </motion.a>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
