import React from "react";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
}

/**
 * Card Component - Medium size (~8KB)
 */
export function Card({
  title,
  children,
  footer,
  variant = "default",
}: CardProps) {
  const styles = {
    default: {
      border: "1px solid #dee2e6",
      boxShadow: "none",
    },
    outlined: {
      border: "2px solid #007bff",
      boxShadow: "none",
    },
    elevated: {
      border: "1px solid #dee2e6",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "white",
        ...styles[variant],
      }}
    >
      {title && (
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #dee2e6",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ padding: "16px" }}>{children}</div>
      {footer && (
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #dee2e6",
            backgroundColor: "#f8f9fa",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export const CARD_VERSION = "1.0.0";
export const CARD_METADATA = {
  name: "Card",
  size: "medium",
  category: "layout",
};
