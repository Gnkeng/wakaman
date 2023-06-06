import React from 'react'
import OneWayTicket from '../../components/common/tickets/OneWayTicket'
import GoCameTicket from '../../components/common/tickets/GoCameTicket'
const TicketPage = () => {
  return (
    <div className="h-screen ">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Purchased Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">
        <OneWayTicket />
        <GoCameTicket />
      </div>
    </div>
  );
}

export default TicketPage