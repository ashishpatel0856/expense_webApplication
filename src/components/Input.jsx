import React from 'react';

const Input = ({ label, value, onChange, placeholder, type }) => {
  const id = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-[13px] text-slate-800 mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
