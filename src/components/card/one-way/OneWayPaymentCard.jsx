import React from 'react'
import MobileOperatorCard from './MobileOperatorCard';


const OneWayPaymentCard = ({setSelectedOperator, setCurrentStep}) => {
  return (
    <div className=' w-full  flex flex-col justify-center items-center text-center'>
        <p className='text-2xl mb-10 font-bold'>Make Payment</p>

        <MobileOperatorCard operator='MTN' setSelectedOperator={setSelectedOperator} setCurrentStep={setCurrentStep}/>
        <MobileOperatorCard operator='ORANGE' setSelectedOperator={setSelectedOperator} setCurrentStep={setCurrentStep}  />
    </div>
  );
}

export default OneWayPaymentCard