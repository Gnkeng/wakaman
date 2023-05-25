import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  id,
  label,
  name,
  value,
  placeholder,
  onChange,
  type,
}) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="mb-4">
      <label className="block  text-[17px] text-secondary  font-[500] mb-2">
        {label}
      </label>
      <div className="relative flex w-full flex-wrap items-stretch mb-3">
        <input
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          type={hidden ? "text" : type}
          className={` relative border border-slate-300 rounded w-full py-4 px-3 text-secondary font-normal text-[17px] leading-tight focus:outline-none focus:shadow-outline placeholder:text-[17px] placeholder:font-normal focus:ring-1 
           ${
             value.length > 2
               ? "focus:ring-1 focus:ring-validColor"
               : value.length === 0
               ? ""
               : "focus:ring-1 focus:ring-errorColor"
           }`}
        />
        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
          {hidden ? (
            <AiOutlineEye size={25} onClick={() => setHidden(!hidden)} />
          ) : (
            <AiOutlineEyeInvisible
              size={25}
              onClick={() => setHidden(!hidden)}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
