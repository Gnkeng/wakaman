import React from 'react'
import Header from '../../components/common/header/Header'
import Button from '../../components/common/button/Button'
import OneWayCard from '../../components/card/one-way/OneWayCard'
import GoCameCard from '../../components/card/go-came/GoCameCard'
const AgencyFastPage = () => {
  return (
    <div className="bg-white h-screen">
      <Header label={"Fast Tickets"} />

      <div className="flex justify-end px-5">
        <Button text={"Add A Fast Ticket"} buttonType={"PRIMARY"} />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
       
        <OneWayCard forAgency={true} />
        <GoCameCard forAgency={true} />
        
      </div>
    </div>
  );
}

export default AgencyFastPage