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
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none text-center';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-full gap-2',
    lg: 'px-7 py-3.5 text-base rounded-full gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#F5C400] text-[#000c22] hover:bg-[#FFDC5F] font-semibold tracking-tight shadow-sm transition-transform active:scale-[0.98]',
    secondary: 'bg-[#102A71] text-[#FFFDF0] hover:bg-[#163896] font-semibold tracking-tight transition-transform active:scale-[0.98]',
    outline: 'border border-[rgba(255,253,240,0.18)] text-[#FFFDF0] hover:border-[#F5C400] hover:text-[#F5C400] bg-transparent transition-colors',
    ghost: 'text-[#FFFDF0] hover:text-[#F5C400] bg-transparent transition-colors'
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};
