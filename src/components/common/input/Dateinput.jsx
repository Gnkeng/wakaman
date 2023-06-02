import React,{useState} from 'react'

const Dateinput = ({label,width,type}) => {
     const [date, setDate] = useState(new Date());
  return (
    <div className='flex flex-col'style={{width:width}}>
      <label>{label}</label>
      <input type={type}  />
    </div>
  );
}

export default Dateinput