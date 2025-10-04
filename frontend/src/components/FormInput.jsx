import React from "react";

const FormInput = ({ label, ...props }) => {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        {...props}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
};

export default FormInput;
