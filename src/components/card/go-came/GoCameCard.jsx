import React from "react";
import Button from "../../common/button/Button";

const GoCameCard = ({
  setShow,
  forAgency,
  from,
  to,
  price,
  agencyName,
  busType,
  departureDate,
  departureTime,
  availableSeats,
  arrivalDate,
  arrivalTime,
  deleteTicket,
}) => {
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
              <h3>{from}</h3>
            </div>
            <div>
              <h3>To</h3>
              <h3>{to}</h3>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-5">
            <div>
              <h3>Depature Date</h3>
              <h3>{departureDate}</h3>
            </div>
            <div>
              <h3>Arrival Date</h3>
              <h3>{arrivalDate}</h3>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-5">
            <div>
              <h3>Depature Time</h3>
              <h3>{departureTime}</h3>
            </div>
            <div>
              <h3>Arrival Time</h3>
              <h3>{arrivalTime}</h3>
            </div>
          </div>
        </div>

        <div>
          <h3>Go and Come Service</h3>
        </div>

        <div>
          <div>
            <h3>{busType}</h3>
            <h3>{availableSeats}</h3>
            <h3>{from}</h3>
          </div>

          <div>{/* an image */}</div>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between">
          <h3>{price} XFCA</h3>
          <h3> {agencyName}</h3>
        </div>

        {forAgency ? (
          <div className="w-full mt-5 flex gap-5 ">
            <Button
              // onClick={() => setShow(true)}
              text={"Edit"}
              buttonType={"PRIMARY"}
              fullWidth={true}
            />

            <Button
              // onClick={() => setShow(true)}
              text={"Delete"}
              buttonType={"OUTLINE"}
              fullWidth={true}
              onClick={deleteTicket}
            />
          </div>
        ) : (
          <div className="mt-5">
            <Button
              onClick={() => setShow(true)}
              text={"Book One Way Ticket"}
              buttonType={"PRIMARY"}
              fullWidth={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GoCameCard;
