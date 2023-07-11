import React, { useState, useEffect, useRef } from "react";
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
import { db, auth } from "../../firebase-config";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import Button from "../../components/common/button/Button";

const ValidatePage = () => {
  const conponentPDF = useRef();

  const customerSlice = useSelector((state) => state.customer);

  const [allCustomers, setAllCustomers] = useState([]);
  const [currentAgency, setCurrentAgency] = useState("");

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Validated Tickets",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentAgency(currentUser.email);
    });
  }, []);

  useEffect(() => {
    const validateRef = collection(db, "validatedTickets");
    const getAgency = async () => {
      try {
        const q = query(validateRef, where("agencyEmail", "==", currentAgency));

        const querySnapshot = await getDocs(q);
        setAllCustomers(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        // console.log("sadasd", allCustomers);
      } catch (err) {
        console.log(err.message);
      }
    };

    getAgency();
  }, [allCustomers]);
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      {" "}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-bold">Validated Customers</h1>
      </div>
      <div className=" flex justify-center items-center mt-4">
        <Button
          text={"Download Validated Tickets"}
          buttonType={"PRIMARY"}
          onClick={generatePDF}
          // fullWidth={true}
          width={"500px"}
        />
      </div>
      <div
        ref={conponentPDF}
        className="flex flex-col items-center justify-center gap-7 mt-6"
      >
        {allCustomers?.map((customer, index) => {
          return (
            <div
              key={index}
              className=" w-[350px] bg-white flex justify-between items-center py-5 px-4 border rounded-lg"
              style={{
                boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)",
              }}
            >
              <div>
                <p>
                  {customer.customerFirstName} {customer.customerLastName}
                </p>
              </div>

              <div>
                <p>from:{customer.from}</p>
                <p>to:{customer.to}</p>
                <p>departue Time:{customer.departureTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ValidatePage;
