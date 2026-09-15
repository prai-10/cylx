'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaggerRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 0.08,
  initialDelay = 0.1,
  className = '',
  ...props
}) => {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : staggerDelay,
        delayChildren: prefersReduced ? 0 : initialDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  yOffset = 36,
  duration = 0.9,
  ...props
}) => {
  const prefersReduced = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReduced ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.2 : duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

interface MaskedLineProps {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
  delay?: number;
  duration?: number;
}

export const MaskedLine: React.FC<MaskedLineProps> = ({
  children,
  className = '',
  lineClassName = '',
  delay = 0,
  duration = 1.05,
}) => {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: {
      y: prefersReduced ? 0 : '110%',
      opacity: prefersReduced ? 0 : 0.4,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0.2 : duration,
        ease: [0.16, 1, 0.3, 1] as const,
        delay,
      },
    },
  };

  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={`block ${lineClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
