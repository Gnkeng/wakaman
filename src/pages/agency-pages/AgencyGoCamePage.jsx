import React, { useState } from "react";

import GoCameCard from "../../components/card/go-came/GoCameCard";
import Header from "../../components/common/header/Header";
import Button from "../../components/common/button/Button";
import ModalContainer from "../../components/common/modal/modal-container/ModalContainer";
import AddGoCameModal from '../../components/common/modal/agency/add-go-ticket/AddGoCameModal'

const AgencyGoCamePage = () => {
     const [show, setShow] = useState(false);

     const closeModal = () => {
       setShow(false);
     };
  return (
    <div className="bg-white h-screen">
      <Header label={"Go and Came Tickets"} />

      <div className="flex justify-end px-5">
        <Button
          text={"Add A Go and Came Ticket"}
          buttonType={"PRIMARY"}
          onClick={() => setShow(true)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        <GoCameCard forAgency={true} />
      </div>
      <ModalContainer onClose={closeModal} width={"700px"} show={show}>
        <AddGoCameModal setShow={setShow} />
      </ModalContainer>
    </div>
  );
}

export default AgencyGoCamePage