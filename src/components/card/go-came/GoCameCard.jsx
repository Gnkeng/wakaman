import React from 'react'
import Button from '../../common/button/Button';

const GoCameCard = () => {
  return (
    <div
      className="px-10 w-[620px] bg-white py-4 mb-6 border rounded-lg" 
      style={{ boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)" }}
    >
      {/* header */}
      <div className="flex justify-between items-center border-b border-slate-300 pb-7">
        <div>
          <div className="flex items-center gap-28">
            <div>
              <h3>From</h3>
              <h3>Buea</h3>
            </div>
            <div>
              <h3>To</h3>
              <h3>Limbe</h3>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-5">
            <div>
              <h3>Depature Date</h3>
              <h3>Oct 27 2023</h3>
            </div>
            <div>
              <h3>Arrival Date</h3>
              <h3>Oct 27 2023</h3>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-5">
            <div>
              <h3>Depature Time</h3>
              <h3>8:00am</h3>
            </div>
            <div>
              <h3>Arrival Time</h3>
              <h3>8:00pm</h3>
            </div>
          </div>
        </div>

        <div>
          <h3>Go and Come Service</h3>
        </div>

        <div>
          <div>
            <h3>VIP G4</h3>
            <h3>50 seats</h3>
            <h3>Buea</h3>
          </div>

          <div>{/* an image */}</div>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between">
          <h3>5000 XFCA</h3>
          <h3> Musango Bus Service</h3>
        </div>

        <div className="mt-5">
          <Button
            text={"Book Go and Come Ticket"}
            buttonType={"PRIMARY"}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default GoCameCard