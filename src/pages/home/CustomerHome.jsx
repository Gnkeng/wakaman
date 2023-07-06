import React, { useState, useEffect } from "react";
import SelectButton from "../../components/common/button/SelectButton";
import Button from "../../components/common/button/Button";
import ModalContainer from "../../components/common/modal/modal-container/ModalContainer";
import OneWayModal from "../../components/common/modal/one-way-modal/OneWayModal";
import GoCameModal from "../../components/common/modal/go-came-modal/GoCameModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { customerInfo } from "../../store/customer/customerSlice";
import RateAgency from "../../components/card/review-card/RateAgencyCard";
import QRCode from "react-qr-code";

const CustomerHome = () => {
  const customerSlice = useSelector((state) => state.customer);

  // console.log("customerSlice", customerSlice);

  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [singleCustomer, setSingleCustomer] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const customerCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customerCollectionRef);
      setAllCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // const customerRef = collection(db, "customers");
      onAuthStateChanged(auth, (currentUser) => {
        setUserEmail(currentUser.email);
      });

      const customerRef = collection(db, "customers");
      const q = query(customerRef, where("email", "==", userEmail));

      const querySnapshot = await getDocs(q);
      setSingleCustomer(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getCustomers();
  }, [userEmail]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/for-today");
  };

  const handleWayClick = () => {
    setActive(1);
    setShow(true);
  };

  const handleGoClick = () => {
    setActive(2);
    setShow(true);
  };

  // console.log(singleCustomer);

  return (
    <div
      className="h-screen flex flex-col justify-around  items-center"
      style={{ background: "#f4f4f4" }}
    >
      <div className="mt-20">
        <h1 className="text-6xl text-dark text-center">Let's Book</h1>

        <div className="w-full mt-10 mb-10">
          <h1 className="text-5xl text-dark ">
            {singleCustomer[0]?.firstname}, What Type of Trip do you want ?
          </h1>
        </div>
        {/* <div>
          <QRCode value="Joseph" />
        </div> */}

        <div className="flex justify-center gap-10">
          <SelectButton
            text={"One way"}
            buttonType={active === 1 ? "SECONDARY" : "PRIMARY"}
            icon={active === 1 ? true : false}
            onClick={handleWayClick}
          />
          <SelectButton
            text={"Go and Come"}
            buttonType={active === 2 ? "SECONDARY" : "PRIMARY"}
            icon={active === 2 ? true : false}
            onClick={handleGoClick}
          />
          <Button
            text={"Purchased Tickets"}
            buttonType={"PRIMARY"}
            onClick={() => {
              navigate("/customer-ticket");
            }}
          />
        </div>
      </div>

      <div className="">
        <Button
          type={"submit"}
          buttonType="PRIMARY"
          text={"FAST BOOKING FOR THE  DAY"}
          fullWidth={true}
          onClick={handleSubmit}
        />
      </div>
      <ModalContainer
        onClose={() => {
          setShow(false);
        }}
        width={"700px"}
        show={show}
      >
        {active === 1 ? <OneWayModal /> : active === 2 ? <GoCameModal /> : ""}
      </ModalContainer>

      <ModalContainer
        onClose={() => {
          setIsOpen(false);
        }}
        width={"700px"}
        show={isOpen}
      >
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1 className="text">View all the Ratings of Bus Agencies</h1>
          <div className="w-full flex justify-center items-center">
            <Button
              text={"View Ratings"}
              buttonType={"PRIMARY"}
              onClick={() => {
                setIsOpen(false);
                navigate("/reviews");
              }}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default CustomerHome;
