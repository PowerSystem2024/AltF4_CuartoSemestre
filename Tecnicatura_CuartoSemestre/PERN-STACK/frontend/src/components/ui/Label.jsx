import React from "react";

export function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-gray-400 text-sm font-medium mb-2"
    >
      {children}
    </label>
  );
}

export default Label;
