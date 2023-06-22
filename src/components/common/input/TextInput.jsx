import React from "react";
const TextInput = ({
  id,
  label,
  name,
  value,
  placeholder,
  onChange,
  type,
  takeData,
  required
}) => {
  return (
    <div className="mb-4">
      <label className="block  text-[17px] text-secondary  font-[500] mb-2">
        {label}
      </label>
      <input
        className={` border border-slate-300 rounded w-full py-3 px-3 text-secondary font-normal text-[17px] leading-tight focus:outline-none focus:shadow-outline placeholder:text-[17px] placeholder:font-normal focus:ring-1  ${
          value.length > 2
            ? "focus:ring-1 focus:ring-validColor"
            : value.length === 0
            ? ""
            : "focus:ring-1 focus:ring-errorColor"
        }`}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        type={type}
        required={required}
        {...takeData}
      />
    </div>
  );
};

export default TextInput;
