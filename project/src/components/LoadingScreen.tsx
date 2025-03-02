import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10) + 1;
          return Math.min(newProgress, 100);
        });
      } else {
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-light z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <Layers size={64} className="text-primary-500" />
      </motion.div>
      
      <motion.div 
        className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mb-4"
        initial={{ width: 0 }}
        animate={{ width: "16rem" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div 
          className="h-full bg-primary-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <motion.p 
        className="text-sm text-gray-500 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading portfolio... {progress}%
      </motion.p>
      
      <div className="mt-16 grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="skeleton h-4 w-24 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;