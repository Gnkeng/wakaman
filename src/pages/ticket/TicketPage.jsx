import React, { useEffect, useState, useRef } from "react";
import OneWayTicket from "../../components/common/tickets/OneWayTicket";
import GoCameTicket from "../../components/common/tickets/GoCameTicket";
import RateAgency from "../../components/card/review-card/RateAgencyCard";
import ModalContainer from "../../components/common/modal/modal-container/ModalContainer";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  where,
  updateDoc,
  query,
  increment,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

const TicketPage = () => {
  const location = useLocation();
  const conponentPDF = useRef();
  const customerSlice = useSelector((state) => state.customer);
  const [purchasedTicketsList, setPurchasedTicketsList] = useState([]);
  const [agencyRating, setAgencyRating] = useState(0);
  const [agencyID, setAgencyID] = useState("");
  const [specificAgency, setSpecificAgency] = useState({});
  const [show, setShow] = useState(false);

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Ticket",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  // console.log("asdsadsa", agencyRating);

  // console.log(location.state);

  useEffect(() => {
    const agencyRef = collection(db, "agency");
    const getAgency = async () => {
      if (location.state) {
        try {
          const q = query(
            agencyRef,
            where("email", "==", location.state.ticket.agencyEmail)
          );

          const querySnapshot = await getDocs(q);
          setSpecificAgency(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          console.log("sadasd", specificAgency);
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    getAgency();
  }, [specificAgency]);

  const makeRating = (rating) => {
    if (location.state) {
      setAgencyID(location.state.ticket.id);
    }
    const docRef = doc(db, "agency", specificAgency[0].id);
    updateDoc(docRef, {
      totalStars: increment(rating),
      peopleReviewed: increment(1),
    })
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(location.state.ticket);

  // console.log(customerSlice);
  useEffect(() => {
    if (location.state) {
      setShow(true);
    }
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
        {location.state ? (
          <ModalContainer onClose={closeModal} width={"700px"} show={show}>
            <RateAgency
              setShow={setShow}
              setAgencyRating={setAgencyRating}
              agencyName={location.state.ticket.agencyName}
              onClick={() => makeRating(agencyRating)}
            />
          </ModalContainer>
        ) : (
          ""
        )}

        {purchasedTicketsList?.map((ticket, index) => {
          return (
            <div ref={conponentPDF} key={index}>
              <OneWayTicket
                id={ticket.id}
                to={ticket.to}
                from={ticket.from}
                departureDate={ticket.departureDate}
                departureTime={ticket.departureTime}
                price={ticket.price}
                agencyName={ticket.agencyName}
                customerFirstName={ticket.customerFirstName}
                customerLastName={ticket.customerLastName}
                customerEmail={ticket.customerEmail}
                handlePDF={generatePDF}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketPage;
