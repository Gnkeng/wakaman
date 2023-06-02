import React from 'react'
import {BsCheck2} from 'react-icons/bs'

const SelectButton = ({buttonType='PRIMARY' ,icon,text,onClick}) => {
  return (
    <button
    onClick={onClick}
      className={`${
        buttonType === "PRIMARY"
          ? "bg-transparent border text-darkGreen border-darkGreen"
          : buttonType ==='SECONDARY'
          ?'bg-lightGreen border text-darkGreen border-darkGreen':''

      } py-[10px] px-5 border rounded-lg outline-none text-[16px] flex justify-center items-center gap-2 `}
    >
     {
   icon? <BsCheck2 size={25}/>:''
     }  
      {text}
    </button>
  );
}

export default SelectButton