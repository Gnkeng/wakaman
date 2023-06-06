import React from 'react'
import OneWayCard from '../../components/card/one-way/OneWayCard'
// import OneWayTicket from '../../components/common/tickets/OneWayTicket';
// import GoCameTicket from '../../components/common/tickets/GoCameTicket';

const OneWay = () => {
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">One Way Tickets</h3>
      </div>

      <div className='flex flex-wrap justify-center gap-10 mt-6'>
        {/* <OneWayTicket/> */}
      {/* <GoCameTicket/> */}
        {/* {/* <OneWayCard /> */}
        <OneWayCard /> 
        {/* <GoCameCard /> */}
      </div>
    </div>
  );
}

export default OneWay