import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:border-blue-500",
  outlined: "border border-gray-400 focus:border-blue-500",
  ghost: "border-b border-gray-400 focus:border-blue-500 rounded-none",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`
            w-full rounded-md outline-none transition
            ${sizeClasses[size]} ${variantClasses[variant]}
            ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}
            ${invalid ? "border-red-500 focus:border-red-500" : ""}
          `}
          aria-invalid={invalid}
          aria-label={label || placeholder}
        />

        {loading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
          </div>
        )}

        {!loading && clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}

        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {invalid && errorMessage ? (
        <span className="text-xs text-red-600">{errorMessage}</span>
      ) : (
        helperText && <span className="text-xs text-gray-500">{helperText}</span>
      )}
    </div>
  );
};

export default InputField;
