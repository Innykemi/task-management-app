"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-md mx-auto bg-white dark:bg-dark text-dark dark:text-white p-6 rounded-lg shadow-lg animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-1 w-5 h-5 max-w-5 max-h-5 border border-dark rounded-full text-sm flex items-center justify-center text-dark cursor-pointer dark:border-light dark:text-light"
          aria-label="Close modal"
        >
          &times;
        </button>

        {title && (
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}
