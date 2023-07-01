
import React, { useEffect, useState } from "react";
import OneWayTicket from "../../components/common/tickets/OneWayTicket";
import GoCameTicket from "../../components/common/tickets/GoCameTicket";
import RateAgency from '../../components/card/review-card/RateAgencyCard';
import ModalContainer from '../../components/common/modal/modal-container/ModalContainer';
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";

const TicketPage = () => {
  const customerSlice = useSelector((state) => state.customer);
  const [purchasedTicketsList, setPurchasedTicketsList] = useState([]);
  const [show, setShow] = useState(false);

  console.log(customerSlice);
  useEffect(() => {
    setShow(true);
  }, []);

  const closeModal = () => {
    setShow(false);
  };
  useEffect(() => {
    const getPurchasedTickets = async () => {
      const purchasedTicketsRef = collection(db, "purchasedTickets");
      try {
        const q = query(
          purchasedTicketsRef,
          where("customerEmail", "==", customerSlice.customer.email)
        );

        const data = await getDocs(q);
        setPurchasedTicketsList(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        // setShow(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    getPurchasedTickets();
  }, []);


  return (
    <div className="h-screen ">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Purchased Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">

        <ModalContainer onClose={closeModal} width={'700px'} show={show}>
          <RateAgency setShow={setShow} />
        </ModalContainer>
       

        {purchasedTicketsList.map((ticket, index) => {
          return (
            <OneWayTicket
              to={ticket.to}
              from={ticket.from}
              departureDate={ticket.departureDate}
              departureTime={ticket.departureTime}
              price={ticket.price}
              agencyName={ticket.agencyName}
              customerFirstName={ticket.customerFirstName}
              customerLastName={ticket.customerLastName}
              key={index}
            />
          );
        })}
      

      </div>
    </div>
  );
};

export default TicketPage;
