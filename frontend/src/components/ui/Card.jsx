import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  padding = 'md',
  ...props
}) => {
  const baseStyles = `
    rounded-xl shadow-lg transition-all duration-300
    backdrop-blur-sm border border-white/10
  `;

  const variants = {
    default: `
      bg-white/10 hover:bg-white/20
      hover:shadow-xl hover:-translate-y-1
    `,
    solid: `
      bg-white shadow-md hover:shadow-lg
      text-gray-900
    `,
    dark: `
      bg-gray-800/90 hover:bg-gray-800
      text-white border-gray-700/50
    `,
    gradient: `
      bg-gradient-to-br from-blue-500/20 to-purple-600/20
      hover:from-blue-500/30 hover:to-purple-600/30
      border-gradient-to-r border-blue-500/30 border-purple-600/30
    `,
    glass: `
      bg-white/5 backdrop-blur-lg
      border border-white/20 hover:border-white/30
      hover:bg-white/10
    `,
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${paddings[padding]}
    ${hover ? 'hover:scale-[1.02] cursor-pointer' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: hover ? {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    } : {},
  };

  return (
    <motion.div
      className={classes}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card Header Component
Card.Header = ({ children, className = '' }) => (
  <div className={`border-b border-white/10 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

// Card Body Component
Card.Body = ({ children, className = '' }) => (
  <div className={`flex-1 ${className}`}>
    {children}
  </div>
);

// Card Footer Component
Card.Footer = ({ children, className = '' }) => (
  <div className={`border-t border-white/10 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

// Card Title Component
Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold text-white mb-2 ${className}`}>
    {children}
  </h3>
);

// Card Description Component
Card.Description = ({ children, className = '' }) => (
  <p className={`text-gray-300 ${className}`}>
    {children}
  </p>
);

export default Card;