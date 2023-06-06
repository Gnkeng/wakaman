import React, {useState} from 'react'
import OneWayCard from '../../components/card/one-way/OneWayCard'
import ModalContainer from '../../components/common/modal/modal-container/ModalContainer';
import OneWayPaymentCard from '../../components/card/one-way/OneWayPaymentCard';
import EnterDetailsCard from '../../components/card/one-way/EnterDetailsCard';
// import OneWayTicket from '../../components/common/tickets/OneWayTicket';
// import GoCameTicket from '../../components/common/tickets/GoCameTicket';

const OneWay = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState ('');
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">One Way Tickets</h3>
      </div>

      <div className='flex flex-wrap justify-center gap-10 mt-6'>
        {/* <OneWayTicket/> */}
      {/* <GoCameTicket/> */}
        {/* {/* <OneWayCard /> */}
        <OneWayCard setShow={setShow} /> 
        {/* <GoCameCard /> */}
      </div>
      <ModalContainer
        onClose={() => {
          setShow(false);
        }}
        width={'700px'}
        show={show}
      >
  
        {currentStep === 0 ? (
          <OneWayPaymentCard setCurrentStep={setCurrentStep} setSelectedOperator={setSelectedOperator} />
        ) : (
          ''
        )}
        {currentStep === 1 ? (
          <EnterDetailsCard setCurrentStep={setCurrentStep} selectedOperator={selectedOperator} />
        ) : (
          ''
        )}

      </ModalContainer>
    </div>
  );
}

export default OneWay