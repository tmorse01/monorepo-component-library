export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
  error?: string;
}

/**
 * Input Component - Medium size (~5KB)
 */
export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  error,
}: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: "8px 12px",
          border: `1px solid ${error ? "#dc3545" : "#ced4da"}`,
          borderRadius: "4px",
          fontSize: "14px",
          outline: "none",
          backgroundColor: disabled ? "#e9ecef" : "white",
        }}
      />
      {error && (
        <span style={{ fontSize: "12px", color: "#dc3545" }}>{error}</span>
      )}
    </div>
  );
}

export const INPUT_VERSION = "1.0.0";
export const INPUT_METADATA = {
  name: "Input",
  size: "medium",
  category: "form",
};
