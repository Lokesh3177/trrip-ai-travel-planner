import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

import { AuthLayout } from "../components/AuthLayout";
import FormInput from "../components/formInput";
import {
  ToastContainer,
  useToast,
} from "../components/Toast";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { toasts, showToast, removeToast } =
    useToast();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      showToast(
        "Please fill in all fields.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const data =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      login(data);

      showToast(
        "Login successful!",
        "success"
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      showToast(
        err.response?.data?.message ||
          "Invalid email or password.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />

      <AuthLayout>
        {/* Header */}

        <div className="mb-8 text-center">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A2B5F]">
            Welcome Back 
          </h2>

          <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">
            Sign in to continue planning
            your next AI-powered trip.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            icon={<FaEnvelope />}
            required
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            icon={<FaLock />}
            required
            showPassword={showPassword}
            togglePassword={() =>
              setShowPassword(
                !showPassword
              )
            }
          />

          {/* Options */}

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
                className="h-4 w-4 rounded border-gray-300 accent-[#1A2B5F]"
              />

              <span className="text-gray-600">
                Remember me
              </span>

            </label>

            <Link
              to="/forgot-password"
              className="font-medium text-[#1A2B5F] hover:text-[#B8961E] transition-colors"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              rounded-2xl
              bg-[#1A2B5F]
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-3
              transition-all
              duration-300
              hover:bg-[#B8961E]
              hover:shadow-lg
              hover:shadow-[#B8961E]/20
              active:scale-[0.98]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}

        <div className="relative my-8">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-gray-200"></div>

          </div>

          <div className="relative flex justify-center">

            <span className="bg-white px-4 text-sm text-gray-400">
              OR
            </span>

          </div>

        </div>

        {/* Register */}

        <div className="text-center">

          <p className="text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-bold text-[#B8961E] hover:text-[#1A2B5F] transition"
            >
              Create Account
            </Link>

          </p>

        </div>
      </AuthLayout>
    </>
  );
}

export default Login;