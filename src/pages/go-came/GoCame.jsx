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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoCame = () => {
  const customerSlice = useSelector((state) => state.customer);
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [goCameTicketsList, setGoCameTicketsList] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [currentTicket, setCurrentTicket] = useState({});

  const getTicketPrice = (price, ticket) => {
    setShow(true);
    setTicketPrice(price);
    setCurrentTicket(ticket);
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
          where("arrivalTime", "==", location.state.arrivalTime),
          where("from", "==", location.state.from),
          where("to", "==", location.state.to)
        );

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        setGoCameTicketsList(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        console.log(goCameTicketsList);
      } catch (err) {
        console.log(err.message);
      }
    };

    getGoCameTickets();
  }, []);

  const PurchaseOneWayTicket = async (ticket) => {
    const purchasedTicketRef = collection(db, "purchasedTickets");
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      await addDoc(purchasedTicketRef, {
        to: ticket.to,
        from: ticket.from,
        departureDate: ticket.departureDate,
        arrivalDate: ticket.arrivalDate,
        departureTime: ticket.departureTime,
        arrivalTime: ticket.arrivalTime,
        price: ticket.price,
        agencyName: ticket.agencyName,
        agencyEmail: ticket.agencyEmail,
        customerFirstName: customerSlice.customer.firstname,
        customerLastName: customerSlice.customer.lastname,
        customerEmail: customerSlice.customer.email,
        purchasedDate: formattedDate,
      });

      navigate("/customer-ticket");
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(goCameTicketsList);
  // console.log(selectedOperator);
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Go and Come Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">
        {/* <OneWayCard />
        <OneWayCard /> */}
        {goCameTicketsList.map((ticket, index) => {
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
              setShow={() => getTicketPrice(ticket.price, ticket)}
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
            purchaseTicket={() => PurchaseOneWayTicket(currentTicket)}
          />
        ) : (
          ""
        )}
      </ModalContainer>
    </div>
  );
};

export default GoCame;
