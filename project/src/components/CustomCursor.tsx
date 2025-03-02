import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorVariant = useRef<'default' | 'hover' | 'click'>('default');
  
  useEffect(() => {
    // Use requestAnimationFrame for smoother cursor movement
    let rafId: number;
    
    const mouseMove = (e: MouseEvent) => {
      // Cancel any pending animation frame to prevent queuing
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      // Use requestAnimationFrame to sync with browser's rendering cycle
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        // Direct DOM manipulation for zero-delay cursor positioning
        if (cursorRef.current) {
          const variant = cursorVariant.current;
          const size = variant === 'hover' ? 48 : variant === 'click' ? 24 : 32;
          const offset = variant === 'hover' ? 24 : 16;
          
          cursorRef.current.style.transform = `translate3d(${e.clientX - offset}px, ${e.clientY - offset}px, 0)`;
          cursorRef.current.style.width = `${size}px`;
          cursorRef.current.style.height = `${size}px`;
          cursorRef.current.style.backgroundColor = 
            variant === 'hover' ? 'rgba(232, 160, 164, 0.8)' : 
            variant === 'click' ? 'rgba(232, 160, 164, 1)' : 
            'rgba(232, 160, 164, 0.5)';
        }
      });
    };
    
    const mouseDown = () => {
      cursorVariant.current = 'click';
      if (cursorRef.current) {
        cursorRef.current.style.width = '24px';
        cursorRef.current.style.height = '24px';
        cursorRef.current.style.backgroundColor = 'rgba(232, 160, 164, 1)';
      }
    };
    
    const mouseUp = () => {
      cursorVariant.current = 'default';
      if (cursorRef.current) {
        cursorRef.current.style.width = '32px';
        cursorRef.current.style.height = '32px';
        cursorRef.current.style.backgroundColor = 'rgba(232, 160, 164, 0.5)';
      }
    };
    
    const handleLinkHover = () => {
      cursorVariant.current = 'hover';
      if (cursorRef.current) {
        cursorRef.current.style.width = '48px';
        cursorRef.current.style.height = '48px';
        cursorRef.current.style.backgroundColor = 'rgba(232, 160, 164, 0.8)';
      }
    };
    
    const handleLinkLeave = () => {
      cursorVariant.current = 'default';
      if (cursorRef.current) {
        cursorRef.current.style.width = '32px';
        cursorRef.current.style.height = '32px';
        cursorRef.current.style.backgroundColor = 'rgba(232, 160, 164, 0.5)';
      }
    };
    
    // Add passive: true for better performance on touch devices
    window.addEventListener('mousemove', mouseMove, { passive: true });
    window.addEventListener('mousedown', mouseDown, { passive: true });
    window.addEventListener('mouseup', mouseUp, { passive: true });
    
    // Attach event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleLinkHover, { passive: true });
      element.addEventListener('mouseleave', handleLinkLeave, { passive: true });
    });
    
    // Handle cursor visibility based on mouse activity
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };
    
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    
    // Initial cursor position
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleLinkHover);
        element.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [mouseX, mouseY]);
  
  // Only show custom cursor on desktop
  return (
    <div 
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
        mixBlendMode: 'difference',
        willChange: 'transform, width, height, background-color',
        transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        transform: 'translate(-50%, -50%)',
        width: '32px',
        height: '32px',
        backgroundColor: 'rgba(232, 160, 164, 0.5)'
      }}
    />
  );
};

export default CustomCursor;