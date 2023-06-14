import React from 'react'
import styles from './input.module.css'

const SelectInput = ({selectOptions, onChange, value, label}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block  text-[17px] text-dark  font-[500] mb-2">
        {label}
      </label>
      <select
        value={value}
        className={styles.select__container}
        onChange={onChange}
      >
        <option>{label}</option>
        {
          selectOptions !== undefined ? selectOptions?.map((selectOption, index) => {
          return (
            <option value={selectOption.value} key={index}>
              {selectOption.label}
            </option>
          );
        }):''
        }
      </select>
    </div>
  );
};

export default SelectInput