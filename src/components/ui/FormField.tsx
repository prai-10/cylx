import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface BaseFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

interface InputProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

interface TextareaProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
  rows?: number;
}

interface SelectProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  as: 'select';
  options: { value: string; label: string }[];
}

type FormFieldProps = InputProps | TextareaProps | SelectProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, error, helperText, required, className = '', id, as = 'input', ...rest } = props;

  const controlStyles = `w-full bg-[#001840]/50 border ${
    error ? 'border-red-400 focus:border-red-400' : 'border-[rgba(255,253,240,0.12)] focus:border-[#F5C400]'
  } rounded-lg px-4 py-3 text-[#FFFDF0] placeholder-[#7d93b8] text-sm focus:outline-none focus:ring-1 ${
    error ? 'focus:ring-red-400' : 'focus:ring-[#F5C400]'
  } transition-colors duration-150`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-wider text-[#9aaecf] flex items-center justify-between">
        <span>
          {label}
          {required && <span className="text-[#F5C400] ml-1">*</span>}
        </span>
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          className={controlStyles}
          rows={(rest as TextareaHTMLAttributes<HTMLTextAreaElement>).rows || 4}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === 'select' ? (
        <select id={id} className={`${controlStyles} cursor-pointer`} {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}>
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#000c22] text-[#FFFDF0]">
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} className={controlStyles} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {error ? (
        <span className="text-xs text-red-400 mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[#62759e] mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};
