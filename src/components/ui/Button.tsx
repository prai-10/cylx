import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'group relative inline-flex items-center justify-center overflow-hidden font-semibold tracking-[-0.02em] transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5C400]';
  const sizeStyles = {
    sm: 'min-h-9 px-4 text-xs rounded-full gap-2',
    md: 'min-h-11 px-5 text-sm rounded-full gap-2.5',
    lg: 'min-h-14 px-7 text-base rounded-full gap-3',
  };
  const variantStyles = {
    primary: 'bg-[#F5C400] text-[#000c22] shadow-[0_12px_30px_rgba(245,196,0,0.14)] hover:-translate-y-0.5 hover:bg-[#FFDC5F] hover:shadow-[0_18px_40px_rgba(245,196,0,0.22)] active:translate-y-0',
    secondary: 'bg-[#102A71] text-[#FFFDF0] hover:-translate-y-0.5 hover:bg-[#163896] active:translate-y-0',
    outline: 'border border-white/15 text-[#FFFDF0] bg-white/[0.02] hover:-translate-y-0.5 hover:border-[#F5C400]/70 hover:bg-[#F5C400]/[0.06] hover:text-[#FFDC5F] active:translate-y-0',
    ghost: 'text-[#FFFDF0] hover:text-[#F5C400] bg-transparent',
  };
  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) return <Link href={href} className={styles}>{children}</Link>;
  return <button className={styles} {...props}>{children}</button>;
};
