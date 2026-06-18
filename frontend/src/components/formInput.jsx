import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  icon,
  error,
  showPassword = false,
  togglePassword,
  autoComplete,
  disabled = false,
}) => {
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      {/* =========================
          Label
      ========================= */}
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-[#1A2B5F]"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {/* =========================
          Input Container
      ========================= */}
      <div
        className={`
          group
          flex
          items-center
          rounded-2xl
          border
          bg-slate-50
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 ring-2 ring-red-100"
              : "border-slate-200 hover:border-[#B8961E] focus-within:border-[#B8961E] focus-within:ring-4 focus-within:ring-[#B8961E]/15"
          }

          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : ""
          }
        `}
      >
        {/* Left Icon */}
        {icon && (
          <div className="px-4 text-lg text-slate-500 group-focus-within:text-[#B8961E] transition-colors">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          className="
            h-14
            w-full
            bg-transparent
            pr-4
            text-[15px]
            text-slate-800
            placeholder:text-slate-400
            outline-none
          "
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            disabled={disabled}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="
              px-4
              text-slate-500
              transition-colors
              hover:text-[#1A2B5F]
              disabled:cursor-not-allowed
            "
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;