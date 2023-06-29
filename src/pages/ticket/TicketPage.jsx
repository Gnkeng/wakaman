import React, { useState, useEffect } from 'react';
import OneWayTicket from '../../components/common/tickets/OneWayTicket';
import GoCameTicket from '../../components/common/tickets/GoCameTicket';
import RateAgency from '../../components/card/review-card/RateAgencyCard';
import ModalContainer from '../../components/common/modal/modal-container/ModalContainer';

const TicketPage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <div className="h-screen ">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Purchased Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">
        <ModalContainer onClose={closeModal} width={'700px'} show={show}>
          <RateAgency setShow={setShow} />
        </ModalContainer>
        <OneWayTicket />
        <GoCameTicket />
      </div>
    </div>
  );
};

export default TicketPage;
