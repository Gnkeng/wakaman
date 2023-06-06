import React from 'react'

const GoCameTicket = () => {
  return (
    <div
      className="px-10 w-[600px] bg-white py-4 mb-6 border rounded-lg"
      style={{ boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)" }}
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-brand">GO AND COME TICKET</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h2>
            <span className="font-bold">Agency:</span> Musango Bus Service
          </h2>
          <h2>
            <span className="font-bold">Customer name:</span> John Doe
          </h2>
          <h2>
            <span className="font-bold">To:</span> Buea
          </h2>
          <h2>
            <span className="font-bold">From :</span> Bamenda
          </h2>
          <h2>
            <span className="font-bold">Departure Date:</span> 02/4/23
          </h2>
          <h2>
            <span className="font-bold">Arrival Date:</span> 02/4/23
          </h2>
        </div>

        <div>
          <div className="w-[100px] h-[100px] bg-dark"></div>
        </div>
      </div>
    </div>
  );
}

export default GoCameTicket