import React,{useState} from 'react'

const DateInput = ({label,width,type,onChange}) => {
     const [date, setDate] = useState(new Date());
  return (
    <div className='flex flex-col w-full'style={{width:width}}>
      <label>{label}</label>
      <input type={type} onChange={onChange}  />
    </div>
  );
}

export default DateInput