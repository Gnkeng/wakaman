import React from 'react';
import MTNSVG from '../../../assets/mtn.svg';
import ORANGESVG from '../../../assets/orange.svg';

const MobileOperatorCard = ({ operator, setSelectedOperator, setCurrentStep }) => {
  return (
    <div
      className="px-10 w-[500px] bg-white py-4 mb-6 border rounded-lg"
      style={{ boxShadow: '0px 20px 25px rgba(76, 103, 100, 0.1)', cursor: 'pointer' }}
    >
      {operator === 'MTN' ? (
        <div className="flex gap-10" onClick={()=>{setSelectedOperator('MTN'); setCurrentStep(1)}}>
          <img src={MTNSVG} />
          <p>Mobile Money</p>
        </div>
      ) : operator === 'ORANGE' ? (
        <div className="flex gap-10" onClick={()=>{setSelectedOperator('ORANGE'); setCurrentStep(1)}}>
          <img src={ORANGESVG} />
          <p>Orange Money</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MobileOperatorCard;
