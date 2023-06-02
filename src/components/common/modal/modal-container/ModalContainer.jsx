import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import styles from '../modal.module.css'

const ModalContainer = ({ children, width, fullWidth, onClick ,show,setShow ,onClose}) => {

  if(!show){
    return null
  }


  return (
    <div className={styles.modal}>
      <div
      onClick={(e)=>e.stopPropagation()}
        className="py-8 px-7 bg-[#f4f4f4] max-w-[2000px]  border rounded-lg   "
        style={{
          boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)",
          width:
            fullWidth === true
              ? "100%"
              : width !== undefined
              ? width
              : "fit-content",
        }}
      >
        <div className="flex justify-end">
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            <AiOutlineClose size={20} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer