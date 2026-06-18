import { useEffect, useState, useCallback } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

/* ==========================================
   Toast Theme
========================================== */

const toastStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-500",
    title: "Success",
    text: "text-green-700",
    progress: "bg-green-500",
    icon: (
      <FaCheckCircle className="text-green-600 text-xl" />
    ),
  },

  error: {
    bg: "bg-red-50",
    border: "border-red-500",
    title: "Error",
    text: "text-red-700",
    progress: "bg-red-500",
    icon: (
      <FaTimesCircle className="text-red-600 text-xl" />
    ),
  },

  info: {
    bg: "bg-blue-50",
    border: "border-blue-500",
    title: "Information",
    text: "text-blue-700",
    progress: "bg-blue-500",
    icon: (
      <FaInfoCircle className="text-blue-600 text-xl" />
    ),
  },
};

/* ==========================================
   Toast
========================================== */

export function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  const style =
    toastStyles[type] || toastStyles.success;

  const closeToast = useCallback(() => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      closeToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, closeToast]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border-l-4
        shadow-xl
        ${style.bg}
        ${style.border}
        transition-all
        duration-300
        ${
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-3 opacity-0 scale-95"
        }
      `}
    >
      {/* Progress Bar */}

      <div
        className={`absolute bottom-0 left-0 h-1 ${style.progress}`}
        style={{
          animation: `toastProgress ${duration}ms linear forwards`,
        }}
      />

      <div className="flex items-start gap-4 p-4">

        {/* Icon */}

        <div className="mt-1 flex-shrink-0">
          {style.icon}
        </div>

        {/* Content */}

        <div className="flex-1">

          <h4
            className={`font-bold ${style.text}`}
          >
            {style.title}
          </h4>

          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            {message}
          </p>

        </div>

        {/* Close */}

        <button
          onClick={closeToast}
          className="
            rounded-lg
            p-1
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-gray-700
          "
          aria-label="Close notification"
        >
          <FaTimes />
        </button>

      </div>
    </div>
  );
}

/* ==========================================
   Toast Container
========================================== */

export function ToastContainer({
  toasts,
  removeToast,
}) {
  return (
    <div
      className="
        fixed
        top-4
        left-1/2
        z-[9999]
        w-[calc(100%-2rem)]
        max-w-sm
        -translate-x-1/2
        space-y-3

        sm:left-auto
        sm:right-5
        sm:translate-x-0
      "
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() =>
            removeToast(toast.id)
          }
        />
      ))}
    </div>
  );
}

/* ==========================================
   Hook
========================================== */

export function useToast() {
  const [toasts, setToasts] =
    useState([]);

  const showToast = useCallback(
    (
      message,
      type = "success",
      duration = 3000
    ) => {
      const id =
        Date.now() +
        Math.random();

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type,
          duration,
        },
      ]);
    },
    []
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((prev) =>
        prev.filter(
          (toast) =>
            toast.id !== id
        )
      );
    },
    []
  );

  return {
    toasts,
    showToast,
    removeToast,
  };
}