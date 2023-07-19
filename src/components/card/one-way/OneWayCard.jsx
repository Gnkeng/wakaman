import React from "react";
import Button from "../../common/button/Button";
import ModalContainer from "../../common/modal/modal-container/ModalContainer";
import AddOneWayModal from "../../common/modal/agency/add-one-ticket/AddOneWayModal";

const OneWayCard = ({
  setShow,
  trigger,
  setTrigger,
  show,
  forAgency,
  from,
  to,
  departureDate,
  departureTime,
  busType,
  availableSeats,
  price,
  agencyName,
  deleteTicket,
  handleEditTicket,
  occupiedSeats,
}) => {
  const closeModal = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div
      className="px-10 w-[600px] max-h-[320px] bg-white py-4 mb-6 border rounded-lg"
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
              <h3>Departure Time</h3>
              <h3>{departureTime}</h3>
            </div>
          </div>
        </div>

        <div>
          <h3>One Way Service</h3>
        </div>

        <div>
          <div>
            <h3> {busType}</h3>
            <h3>{availableSeats} seats</h3>
            <h3>{from}</h3>
          </div>

          <div>{/* an image */}</div>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between">
          <h3>{price} FCFA</h3>
          {forAgency && (
            <h3>
              occupied:{occupiedSeats}/ {availableSeats}
            </h3>
          )}

          <h3> {agencyName}</h3>
        </div>

        {forAgency ? (
          <div className="w-full mt-5 flex gap-5 ">
            <Button
              // onClick={() => setShow(true)}
              text={"Edit"}
              buttonType={"PRIMARY"}
              fullWidth={true}
              onClick={handleEditTicket}
            />

            <ModalContainer onClose={closeModal} width={"700px"} show={show}>
              <AddOneWayModal
                setShow={setShow}
                trigger={trigger}
                setTrigger={setTrigger}
              />
            </ModalContainer>

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
              onClick={setShow}
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

export default OneWayCard;
