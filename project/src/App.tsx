import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!loading) {
      // Initialize scroll animations after loading is complete
      const handleScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
        const sectionTitles = document.querySelectorAll('.section-title');
        
        elements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const isVisible = (rect.top <= window.innerHeight * 0.8);
          
          if (isVisible) {
            element.classList.add('appear');
          }
        });
        
        sectionTitles.forEach(title => {
          const rect = title.getBoundingClientRect();
          const isVisible = (rect.top <= window.innerHeight * 0.8);
          
          if (isVisible) {
            title.classList.add('animate-underline');
          }
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      // Initial check
      setTimeout(handleScroll, 100);
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loading]);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  
  // Add scroll margin to sections for proper scrolling with fixed header
  useEffect(() => {
    if (!loading) {
      // Set scroll-margin-top for all sections to account for fixed header
      const sections = document.querySelectorAll('section[id]');
      const headerHeight = document.querySelector('nav')?.offsetHeight || 70;
      
      sections.forEach(section => {
        (section as HTMLElement).style.scrollMarginTop = `${headerHeight}px`;
      });
    }
  }, [loading]);
  
  return (
    <div className="relative">
      {loading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;