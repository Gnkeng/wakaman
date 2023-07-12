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
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import FcCheckmark from "react-icons/fc";

const ScanTicket = () => {
  const agencySlice = useSelector((state) => state.agency);
  const [scanResult, setScanResult] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [currentAgency, setCurrentAgency] = useState("");
  const [specificTicket, setSpecificTicket] = useState([]);
  const [active, setActive] = useState(false);

  console.log(scanResult);
  console.log(currentAgency);
  console.log(specificTicket);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentAgency(currentUser.email);
    });
  }, []);

  useEffect(() => {
    const oneWayTicketsRef = collection(db, "purchasedTickets");
    const validateRef = collection(db, "validatedTickets");
    const getData = async () => {
      try {
        const q = query(
          oneWayTicketsRef,
          where("agencyEmail", "==", currentAgency),
          where("customerEmail", "==", scanResult)
        );
        console.log("asdasda", q);
        const data = await getDocs(q);
        setSpecificTicket(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        if (specificTicket.length > 0) {
          setActive(true);
        }

        console.log("fghfhg", specificTicket);
        await addDoc(validateRef, {
          customerFirstName: specificTicket[0].customerFirstName,
          customerLastName: specificTicket[0].customerLastName,
          from: specificTicket[0].from,
          to: specificTicket[0].to,
          departureTime: specificTicket[0].departureTime,
          agencyEmail: specificTicket[0].agencyEmail,
          customerEmail: specificTicket[0].customerEmail,
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    getData();
  }, [active]);
  useEffect(() => {
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

        setActive(!active);

        isScanning = false;

        // try {
        //   const oneWayTicketsRef = collection(db, "purchasedTickets");
        //   const validateRef = collection(db, "validatedTickets");
        //   const q = query(
        //     oneWayTicketsRef,
        //     // where("agencyEmail", "==", currentAgency),
        //     where("customerEmail", "==", scanResult)
        //   );
        //   console.log("asdasda", q);
        //   const data = await getDocs(q);
        //   setSpecificTicket(
        //     data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //   );

        //   console.log("fghfhg", specificTicket);
        //   await addDoc(validateRef, {
        //     customerFirstName: specificTicket[0].customerFirstName,
        //     customerLastName: specificTicket[0].customerLastName,
        //     from: specificTicket[0].from,
        //     to: specificTicket[0].to,
        //     departureTime: specificTicket[0].departureTime,
        //   });
        // } catch (err) {
        //   console.log(err.message);
        // }

        // Set isScanning to false to stop further scanning
        // const oneWayTicketsRef = collection(db, "purchasedTickets");
        // const validateRef = collection(db, "validatedTickets");
        // try {
        //   const q = query(
        //     oneWayTicketsRef,
        //     where("customerEmail", "==", result)
        //   );
        //   console.log("asdasda", q);
        //   const data = await getDocs(q);
        //   setSpecificTicket(
        //     data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //   );

        //   console.log("fghfhg", specificTicket);
        //   await addDoc(validateRef, {
        //     customerFirstName: specificTicket[0].customerFirstName,
        //     customerLastName: specificTicket[0].customerLastName,
        //     from: specificTicket[0].from,
        //     to: specificTicket[0].to,
        //     departureTime: specificTicket[0].departureTime,
        //   });
        // } catch (err) {
        //   console.log(err.message);
        // }
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
        {scanResult && (
          <div className="flex flex-col justify-center items-center">
            <div>
              <IoIosCheckmarkCircleOutline size={30} color={"#6EE7B7"} />
              <div>User Email: {scanResult}</div>
              <div>User is valid for travel</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ScanTicket;
