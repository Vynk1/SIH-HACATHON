import React from 'react';
import { motion } from 'framer-motion';

// Spinner Loading Component
export const Spinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colors = {
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    green: 'text-green-500',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  return (
    <motion.div
      className={`inline-block ${sizes[size]} ${colors[color]}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <svg
        className="animate-spin h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
};

// Dots Loading Component
export const LoadingDots = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'h-1 w-1',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  };

  const colors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    white: 'bg-white',
    gray: 'bg-gray-500',
  };

  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: { scale: 1.2, opacity: 1 },
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizes[size]} ${colors[color]} rounded-full`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
};

// Skeleton Loading Component
export const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  animation = true 
}) => {
  const variants = {
    text: 'h-4 bg-gray-300 rounded',
    circular: 'rounded-full bg-gray-300',
    rectangular: 'bg-gray-300 rounded',
  };

  const baseClass = `
    ${variants[variant]}
    ${animation ? 'animate-pulse' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const style = {
    width: width || 'auto',
    height: height || 'auto',
  };

  return <div className={baseClass} style={style} />;
};

// Page Loading Component
export const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </motion.div>
        
        <motion.h2
          className="text-2xl font-semibold text-white mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.h2>
        
        <LoadingDots color="white" size="md" />
      </div>
    </motion.div>
  );
};

// Card Loading Skeleton
export const CardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
      <Skeleton variant="text" className="h-6 bg-white/20 w-3/4" />
      <Skeleton variant="text" className="h-4 bg-white/20 w-full" />
      <Skeleton variant="text" className="h-4 bg-white/20 w-2/3" />
      <div className="flex space-x-4 pt-4">
        <Skeleton variant="rectangular" className="h-10 bg-white/20 w-20" />
        <Skeleton variant="rectangular" className="h-10 bg-white/20 w-20" />
      </div>
    </div>
  );
};

// Default Loading Component
const Loading = ({ 
  type = 'spinner', 
  size = 'md', 
  color = 'blue',
  message = '',
  fullScreen = false,
  ...props 
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {type === 'spinner' && <Spinner size={size} color={color} {...props} />}
      {type === 'dots' && <LoadingDots size={size} color={color} {...props} />}
      {message && (
        <motion.p
          className="text-gray-300 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;