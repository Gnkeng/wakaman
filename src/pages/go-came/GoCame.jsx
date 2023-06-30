import React, { useState, useEffect } from "react";
import GoCameCard from "../../components/card/go-came/GoCameCard";
import ModalContainer from "../../components/common/modal/modal-container/ModalContainer";
import OneWayPaymentCard from "../../components/card/one-way/OneWayPaymentCard";
import EnterDetailsCard from "../../components/card/one-way/EnterDetailsCard";
import { useLocation } from "react-router-dom";
import {
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const GoCame = () => {
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [goCameTicketsList, setGoCameTicketsList] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);

  const getTicketPrice = (price) => {
    setShow(true);
    setTicketPrice(price);
  };
  useEffect(() => {
    const getGoCameTickets = async () => {
      const oneWayTicketsRef = collection(db, "goCameTickets");
      try {
        const q = query(
          oneWayTicketsRef,
          where("departureDate", "==", location.state.departureDate),
          where("arrivalDate", "==", location.state.arrivalDate),
          where("departureTime", "==", location.state.departureTime),
          where("departureTime", "==", location.state.arrivalTime),
          where("from", "==", location.state.from),
          where("to", "==", location.state.to)
        );

        const querySnapshot = await getDocs(q);
        setGoCameTicketsList(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    getGoCameTickets();
  }, [location.state]);
  // console.log(selectedOperator);
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Go and Come Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">
        {/* <OneWayCard />
        <OneWayCard /> */}
        {goCameTicketsList?.map((ticket, index) => {
          return (
            <GoCameCard
              key={index}
              forAgency={false}
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
              setShow={() => setTicketPrice(ticket.price)}
              // deleteTicket={() => deleteTicket(ticket.id)}
            />
          );
        })}
        {/* <GoCameCard setShow={setShow} />
        <GoCameCard setShow={setShow} /> */}
      </div>
      <ModalContainer
        onClose={() => {
          setShow(false);
        }}
        width={"700px"}
        show={show}
      >
        {currentStep === 0 ? (
          <OneWayPaymentCard
            setCurrentStep={setCurrentStep}
            setSelectedOperator={setSelectedOperator}
          />
        ) : (
          ""
        )}
        {currentStep === 1 ? (
          <EnterDetailsCard
            setCurrentStep={setCurrentStep}
            selectedOperator={selectedOperator}
            ticketPrice={ticketPrice}
          />
        ) : (
          ""
        )}
      </ModalContainer>
    </div>
  );
};

export default GoCame;
