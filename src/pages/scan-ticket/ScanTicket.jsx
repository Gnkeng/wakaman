// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
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
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const ScanTicket = () => {
  const [scanResult, setScanResult] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [currentAgency, setCurrentAgency] = useState("");
  const [specificTicket, setSpecificTicket] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentAgency(currentUser.email);
    });
  }, []);

  useEffect(() => {
    const handleValidation = async (qr) => {
      const oneWayTicketsRef = collection(db, "purchasedTickets");
      const validateRef = collection(db, "validatedTickets");
      try {
        const q = query(
          oneWayTicketsRef,
          where("agencyEmail", "==", currentAgency),
          where("customerEmail", "==", qr)
        );

        const data = await getDocs(q);
        setSpecificTicket(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        await addDoc(validateRef, specificTicket[0]);
      } catch (err) {
        console.log(err.message);
      }
    };

    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    async function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
        const oneWayTicketsRef = collection(db, "purchasedTickets");
        const validateRef = collection(db, "validatedTickets");
        try {
          const q = query(
            oneWayTicketsRef,
            where("agencyEmail", "==", currentAgency),
            where("customerEmail", "==", result)
          );
          console.log("asdasda", q);
          const data = await getDocs(q);
          setSpecificTicket(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );

          console.log("fghfhg", specificTicket);
          await addDoc(validateRef, {
            customerFirstName: specificTicket[0].customerFirstName,
            customerLastName: specificTicket[0].customerLastName,
            from: specificTicket[0].from,
            to: specificTicket[0].to,
            departureTime: specificTicket[0].departureTime,
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <h1>QR Scanning Code</h1>

      <div id="reader">
        <p>Success: {scanResult}</p>
      </div>

      <div>{scanResult}</div>
    </>
  );
};

export default ScanTicket;
