import React, { useState, useEffect } from "react";

import GoCameCard from "../../components/card/go-came/GoCameCard";
import Header from "../../components/common/header/Header";
import Button from "../../components/common/button/Button";
import ModalContainer from "../../components/common/modal/modal-container/ModalContainer";
import AddGoCameModal from "../../components/common/modal/agency/add-go-ticket/AddGoCameModal";
import {
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { goCameTicketsInfo } from "../../store/goCameTickets/goCameTicketsSlice";

const AgencyGoCamePage = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [ticketsList, setTicketsList] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [trigger, setTrigger] = useState(false);

  // // console.log(ticketsList);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentEmail(currentUser.email);
    });

    const getGoCameTickets = async () => {
      const oneWayTicketsRef = collection(db, "goCameTickets");
      try {
        const q = query(
          oneWayTicketsRef,
          where("agencyEmail", "==", currentEmail)
        );

        const data = await getDocs(q);
        setTicketsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        setShow(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    getGoCameTickets();
  }, [currentEmail, trigger]);

  console.log(ticketsList);

  dispatch(goCameTicketsInfo(ticketsList));
  const closeModal = () => {
    setShow(false);
  };

  const deleteTicket = async (id) => {
    try {
      const docRef = doc(db, "goCameTickets", id);
      await deleteDoc(docRef);
      setTrigger(!trigger);
    } catch (err) {
      console.log(err.message);
    }
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
        {ticketsList?.map((ticket, index) => {
          return (
            <GoCameCard
              key={index}
              forAgency={true}
              from={ticket.from}
              to={ticket.to}
              price={ticket.price}
              agencyName={ticket.agencyName}
              busType={ticket.busType}
              departureDate={ticket.departureDate}
              arrivalDate={ticket.arrivalDate}
              arrivalTime={ticket.arrivalTime}
              departureTime={ticket.departureTime}
              availableSeats={ticket.availableSeats}
              deleteTicket={() => deleteTicket(ticket.id)}
            />
          );
        })}
      </div>
      <ModalContainer onClose={closeModal} width={"700px"} show={show}>
        <AddGoCameModal
          setShow={setShow}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      </ModalContainer>
    </div>
  );
};

export default AgencyGoCamePage;
