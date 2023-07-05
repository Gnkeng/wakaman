import React from "react";





const DateInput = ({ label, width, type, onChange }) => {
  return (
    <div className="flex flex-col w-full" style={{ width: width }}>
      <label>{label}</label>
      <input type={type} onChange={onChange} />
    </div>
  );
};

export default DateInput;
