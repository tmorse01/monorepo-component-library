import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

/**
 * Button Component - Lightweight (~2KB)
 *
 * A simple button component demonstrating tree-shaking.
 * When imported alone, this should NOT include Table or other heavy components.
 */
export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const className = `btn btn-${variant}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: variant === "primary" ? "#007bff" : "#6c757d",
        color: "white",
        fontSize: "14px",
        fontWeight: 500,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}

// Add some utility to make the bundle size measurable
export const BUTTON_VERSION = "1.0.0";
export const BUTTON_METADATA = {
  name: "Button",
  size: "lightweight",
  category: "form",
};
