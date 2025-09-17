import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../theme/theme';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600
      hover:from-blue-600 hover:to-purple-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-blue-500
    `,
    secondary: `
      bg-gradient-to-r from-purple-500 to-pink-600
      hover:from-purple-600 hover:to-pink-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-purple-500
    `,
    outline: `
      border-2 border-blue-500 text-blue-500
      hover:bg-blue-500 hover:text-white
      focus:ring-blue-500
    `,
    ghost: `
      text-gray-600 hover:text-gray-900
      hover:bg-gray-100
      focus:ring-gray-500
    `,
    danger: `
      bg-red-500 hover:bg-red-600
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-500
    `,
    success: `
      bg-green-500 hover:bg-green-600
      text-white shadow-lg hover:shadow-xl
      focus:ring-green-500
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
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
      )}
      
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      <span>{children}</span>
      
      {rightIcon && !loading && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </motion.button>
  );
};

export default Button;