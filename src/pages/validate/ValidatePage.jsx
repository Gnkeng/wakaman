import React, { useState, useEffect } from "react";
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

const ValidatePage = () => {
  const customerSlice = useSelector((state) => state.customer);

  const [allCustomers, setAllCustomers] = useState([]);
  const [currentAgency, setCurrentAgency] = useState("");

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
      <div className="flex flex-col items-center justify-center gap-7 mt-6">
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
