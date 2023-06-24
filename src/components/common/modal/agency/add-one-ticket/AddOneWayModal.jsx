import React, { useState } from "react";

import SelectInput from "../../../input/SelectInput";
import { LOCATIONS, TRAVEL_TIME } from "../../../../../constants/constant";
import TextInput from "../../../input/TextInput";
import Button from "../../../button/Button";
import DateInput from "../../../input/DateInput";
import { getDoc, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../../../firebase-config";
import { useDispatch,useSelector } from 'react-redux';


const AddOneWayModal = ({ setShow }) => {
  const [currentAgency, setCurrentAgency] = useState("");
  const agencySlice = useSelector((state)=> state.agency)

  // console.log(agencySlice?.agency?.email);


  onAuthStateChanged(auth, (currentUser) => {
    setCurrentAgency(currentUser);
  });

  const [form, setForm] = useState({
    to: "",
    from: "",
    busType: "",
    availableSeats: "",
    departureDate: "",
    departureTime: "",
    price:''
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const ticketCollectionRef = collection(db, "oneWayTickets");
      await addDoc(ticketCollectionRef, {
        to: form.to,
        from: form.from,
        busType: form.busType,
        availableSeats: form.availableSeats,
        occupiedSeats: 0,
        departureDate: form.departureDate,
        departureTime: form.departureTime,
        agencyEmail:agencySlice?.agency?.email,
        price:form.price,
        agencyName:agencySlice?.agency?.agencyname
        // user: { email: currentAgency?.email },
      });
       setShow(false);
      // console.log(ticketCollectionRef);
    } catch (error) {
      console.log(error.message);
    }
    // console.log(form);
   
  };

  //  console.log(currentAgency);
  return (
    <div>
      <h1 className="text-2xl  text-center font-bold">One Way</h1>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex ">
          <SelectInput
            selectOptions={LOCATIONS}
            label="FROM"
            onChange={(e) => {
              setForm({ ...form, from: e.target.value });
            }}
            value={form.from}
          />
        </div>

        <div>
          <SelectInput
            selectOptions={LOCATIONS}
            label="TO"
            onChange={(e) => {
              setForm({ ...form, to: e.target.value });
            }}
            value={form.to}
          />
        </div>

        <div className="w-full flex justify-between">
          <TextInput
            label={"Bus Type"}
            type={"text"}
            onChange={(e) => {
              setForm({ ...form, busType: e.target.value });
            }}
            name={"busType"}
            id={"busType"}
            value={form.busType}
            required={true}
          />
          <TextInput
            label={"Available Seats"}
            type={"number"}
            onChange={(e) => {
              setForm({ ...form, availableSeats: e.target.value });
            }}
            value={form.availableSeats}
            required={true}
          />
        </div>

        <div>
          <TextInput
            label={"Price"}
            type={"number"}
            onChange={(e) => {
              setForm({ ...form, price: e.target.value });
            }}
            value={form.price}
            required={true}
          />
        </div>

        <div className="w-full flex items-center gap-12 ">
          <SelectInput
            selectOptions={TRAVEL_TIME}
            label={"Departure Time"}
            onChange={(e) => {
              setForm({ ...form, departureTime: e.target.value });
            }}
            value={form.arrivalTime}
          />
          <div className="w-full">
            <DateInput
              // selectOptions={TRAVEL_TIME}
              label={"Departure Date"}
              type={"date"}
              onChange={(e) => {
                setForm({ ...form, departureDate: e.target.value });
              }}
              value={form.departureDate}
            />
          </div>
        </div>

        <div className="mt-3">
          <Button
            text="Add One Way Ticket"
            buttonType={"PRIMARY"}
            fullWidth={true}
            // onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddOneWayModal;
