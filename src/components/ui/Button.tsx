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
  const baseStyles = 'group relative inline-flex items-center justify-center overflow-hidden font-semibold tracking-[-0.02em] transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0017B2]';
  const sizeStyles = {
    sm: 'min-h-9 px-4 text-xs rounded-full gap-2',
    md: 'min-h-11 px-5 text-sm rounded-full gap-2.5',
    lg: 'min-h-14 px-7 text-base rounded-full gap-3',
  };
  const variantStyles = {
    primary: 'bg-[#FCD21D] text-[#000000] shadow-[0_8px_24px_rgba(252,210,29,0.35)] hover:-translate-y-0.5 hover:bg-[#FEE775] active:translate-y-0 font-bold',
    secondary: 'bg-[#0017B2] text-[#FFFFFF] shadow-[0_8px_24px_rgba(0,23,178,0.25)] hover:-translate-y-0.5 hover:bg-[#00128C] active:translate-y-0',
    outline: 'border border-[#0017B2]/25 text-[#0017B2] bg-white hover:-translate-y-0.5 hover:border-[#0017B2] hover:bg-[#4A8FE7]/10 active:translate-y-0',
    ghost: 'text-[#000000] hover:text-[#0017B2] hover:bg-[#4A8FE7]/10 bg-transparent',
  };
  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) return <Link href={href} className={styles}>{children}</Link>;
  return <button className={styles} {...props}>{children}</button>;
};
