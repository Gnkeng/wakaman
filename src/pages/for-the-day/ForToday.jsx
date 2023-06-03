import React from 'react'
import GoCameCard from '../../components/card/go-came/GoCameCard';
import OneWayCard from '../../components/card/one-way/OneWayCard';
const ForToday = () => {
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Today Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">
         <OneWayCard />
        
        <GoCameCard />
        {/* <GoCameCard /> */}
      </div>
    </div>
  );
}

export default ForToday