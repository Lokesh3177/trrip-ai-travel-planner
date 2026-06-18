import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSpinner,
} from "react-icons/fa";

import { AuthLayout } from "../components/authLayout";
import FormInput from "../components/formInput";
import {
  ToastContainer,
  useToast,
} from "../components/toast";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { toasts, showToast, removeToast } =
    useToast();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const getPasswordStrength = () => {
    const password =
      formData.password;

    if (password.length === 0)
      return null;

    if (password.length < 6)
      return {
        label: "Weak",
        color: "bg-red-500",
      };

    if (password.length < 10)
      return {
        label: "Medium",
        color: "bg-yellow-500",
      };

    return {
      label: "Strong",
      color: "bg-green-500",
    };
  };

  const strength =
    getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      showToast(
        "Please fill in all fields.",
        "error"
      );
      return;
    }

    if (
      formData.password.length < 6
    ) {
      showToast(
        "Password must contain at least 6 characters.",
        "error"
      );
      return;
    }

    if (!acceptedTerms) {
      showToast(
        "Please accept the Terms & Conditions.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const res =
        await api.post(
          "/auth/register",
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      login(res.data);

      showToast(
        "Account created successfully!",
        "success"
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {

      showToast(
        err.response?.data
          ?.message ||
          "Registration failed.",
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
            Create Account 
          </h2>

          <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">
            Join TRRIP AI and start
            planning smarter journeys.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            icon={<FaUser />}
            required
          />

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

          <div>

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              icon={<FaLock />}
              required
              showPassword={
                showPassword
              }
              togglePassword={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />

            {/* Password Strength */}

            {strength && (

              <div className="mt-3">

                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className={`h-full rounded-full ${strength.color}`}
                    style={{
                      width:
                        strength.label ===
                        "Weak"
                          ? "35%"
                          : strength.label ===
                            "Medium"
                          ? "70%"
                          : "100%",
                    }}
                  />

                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Password Strength:
                  <span className="ml-1 font-semibold">
                    {strength.label}
                  </span>
                </p>

              </div>

            )}

          </div>

          {/* Terms */}

          <label className="flex items-start gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={
                acceptedTerms
              }
              onChange={() =>
                setAcceptedTerms(
                  !acceptedTerms
                )
              }
              className="mt-1 h-4 w-4 accent-[#1A2B5F]"
            />

            <span className="text-sm text-gray-600 leading-relaxed">

              I agree to the{" "}

              <button
                type="button"
                className="font-semibold text-[#1A2B5F] hover:text-[#B8961E]"
              >
                Terms & Conditions
              </button>

              {" "}and{" "}

              <button
                type="button"
                className="font-semibold text-[#1A2B5F] hover:text-[#B8961E]"
              >
                Privacy Policy
              </button>

            </span>

          </label>

          {/* Submit */}

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
                Creating Account...
              </>
            ) : (
              "Create Account"
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

        {/* Login */}

        <div className="text-center">

          <p className="text-gray-600">

            Already have an account?

            <Link
              to="/"
              className="ml-2 font-bold text-[#B8961E] hover:text-[#1A2B5F] transition"
            >
              Sign In
            </Link>

          </p>

        </div>

      </AuthLayout>
    </>
  );
}

export default Register;