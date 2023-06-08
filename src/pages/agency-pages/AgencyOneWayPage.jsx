import React,{useState} from 'react'

import OneWayCard from "../../components/card/one-way/OneWayCard";
import Header from "../../components/common/header/Header";
import Button from "../../components/common/button/Button";
import ModalContainer from '../../components/common/modal/modal-container/ModalContainer';
import AddOneWayModal from '../../components/common/modal/agency/add-one-ticket/AddOneWayModal'
const AgencyOneWayPage = () => {
    const [show, setShow] = useState(false);


    const closeModal=()=>{
      setShow(false)
    }

  return (
    <div className="bg-white h-screen">
      <Header label={"One Way Tickets"} />

      <div className="flex justify-end px-5">
        <Button
          text={"Add A One Way Ticket"}
          buttonType={"PRIMARY"}
          onClick={() => setShow(true)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        <OneWayCard forAgency={true} />
      </div>

      <ModalContainer onClose={closeModal} width={"700px"} show={show}>
        <AddOneWayModal setShow={setShow} />
      </ModalContainer>
    </div>
  );
}

export default AgencyOneWayPage