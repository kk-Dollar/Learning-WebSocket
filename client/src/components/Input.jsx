import React from "react";

export default function Input({ name, handleInput, placeholder,score }) {
  return (
    <div>
      <input
        name={name}
        className="input-field"
        placeholder={placeholder}
        onChange={handleInput}
        value={score[name] || ""}
      />
    </div>
  );
}
