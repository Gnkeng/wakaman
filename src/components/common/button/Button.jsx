import React from 'react';

const Button = ({
  text,
  buttonType,
  width,
  fullWidth,
  disable,
  onClick,
  icon,
  type,
  fontweight,
  fontsize
}) => {
  return (
    <button
      type={type}
      className={`${
        buttonType === 'PRIMARY'
          ? 'bg-brand text-white'
          : buttonType === 'SECONDARY'
          ? 'bg-transparent border border-dark text-dark'
          : buttonType === 'TERTIARY'
          ? 'bg-transparent border text-secondary border-slate-300'
          : buttonType === 'ERROR'
          ? 'bg-errorColor text-white'
          : 'text-brand'
      }
     py-[10px] px-5 border rounded-lg outline-none text-[16px] flex justify-center items-center `}
      onClick={onClick}
      disabled={disable}
      style={{
        cursor: disable === true ? 'not-allowed' : 'pointer',
        width:
          fullWidth === true
            ? '100%'
            : width !== undefined
            ? width
            : 'fit-content',
            fontWeight: fontweight ? fontweight: 'normal',
            fontSize: fontsize ? fontsize: ' text-[16px] ',
      }}
    >
      {icon ? (
        <span className="flex justify-center items-center">{icon}</span>
      ) : (
        ''
      )}
      {text}
    </button>
  );
};

export default Button;
