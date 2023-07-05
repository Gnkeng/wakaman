import React, { useState, useEffect } from "react";
import ModalContainer from "../../components/common/modal/modal-container/ModalContainer";
import OneWayPaymentCard from "../../components/card/one-way/OneWayPaymentCard";
import EnterDetailsCard from "../../components/card/one-way/EnterDetailsCard";
import GoCameCard from "../../components/card/go-came/GoCameCard";
import OneWayCard from "../../components/card/one-way/OneWayCard";
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
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForToday = () => {
  const customerSlice = useSelector((state) => state.customer);
  const navigate = useNavigate();

  const [oneWayTicketsList, setOneWayTicketsList] = useState([]);
  const [goCameTicketsList, setGoCameTicketsList] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [currentTicket, setCurrentTicket] = useState({});

  const getTicketPrice = (price, ticket) => {
    setShow(true);
    setTicketPrice(price);
    setCurrentTicket(ticket);
    console.log("ji");
  };

  const getGoCameTicketPrice = (price, ticket) => {
    setIsOpen(true);
    setTicketPrice(price);
    setCurrentTicket(ticket);
  };

  const PurchaseGoCameTicket = async (ticket) => {
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

      navigate("/customer-ticket", {
        state: {
          ticket: ticket,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

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
        departureTime: ticket.departureTime,
        price: ticket.price,
        agencyName: ticket.agencyName,
        agencyEmail: ticket.agencyEmail,
        customerFirstName: customerSlice.customer.firstname,
        customerLastName: customerSlice.customer.lastname,
        customerEmail: customerSlice.customer.email,
        purchasedDate: formattedDate,
      });

      navigate("/customer-ticket", {
        state: {
          ticket: ticket,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentEmail(currentUser.email);
    });

    const getOneWayTickets = async () => {
      const oneWayTicketsRef = collection(db, "oneWayTickets");
      // const today = new Date();
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate);
      try {
        const q = query(
          oneWayTicketsRef,
          where("departureDate", "==", formattedDate)
        );

        const querySnapshot = await getDocs(q);

        // const data = await getDocs(oneWayTicketsRef);
        setOneWayTicketsList(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        setShow(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getGoCameTickets = async () => {
      const oneWayTicketsRef = collection(db, "goCameTickets");
      // const today = new Date();
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate);
      try {
        const q = query(
          oneWayTicketsRef,
          where("departureDate", "==", formattedDate)
        );

        const querySnapshot = await getDocs(q);

        // const data = await getDocs(oneWayTicketsRef);
        setGoCameTicketsList(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        setShow(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    getOneWayTickets();
    getGoCameTickets();
  }, [currentEmail]);

  console.log(oneWayTicketsList);
  console.log(goCameTicketsList);

  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h3 className="text-4xl font-bold">Today Tickets</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-6">
        {oneWayTicketsList?.map((ticket, index) => {
          return (
            <OneWayCard
              key={index}
              forAgency={false}
              from={ticket.from}
              to={ticket.to}
              price={ticket.price}
              agencyName={ticket.agencyName}
              busType={ticket.busType}
              departureDate={ticket.departureDate}
              departureTime={ticket.departureTime}
              availableSeats={ticket.availableSeats}
              setShow={() => getTicketPrice(ticket.price, ticket)}
              // deleteTicket={() => deleteTicket(ticket.id)}
            />
          );
        })}

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
              setShow={() => getGoCameTicketPrice(ticket.price, ticket)}
              // deleteTicket={() => deleteTicket(ticket.id)}
            />
          );
        })}
        {/* <OneWayCard setShow={setShow} /> */}

        {/* <GoCameCard setShow={setShow} /> */}
        {/* <GoCameCard /> */}
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
      <ModalContainer
        onClose={() => {
          setIsOpen(false);
        }}
        width={"700px"}
        show={isOpen}
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
            purchaseTicket={() => PurchaseGoCameTicket(currentTicket)}
          />
        ) : (
          ""
        )}
      </ModalContainer>
    </div>
  );
};

export default ForToday;
