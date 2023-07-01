import React, { useState } from "react";
import SelectInput from "../../../input/SelectInput";
import { LOCATIONS, TRAVEL_TIME } from "../../../../../constants/constant";
import TextInput from "../../../input/TextInput";
import Button from "../../../button/Button";
import DateInput from "../../../input/DateInput";
import { getDoc, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../../../firebase-config";
import { useDispatch, useSelector } from "react-redux";

const AddGoCameModal = ({ setShow, trigger, setTrigger }) => {
  const agencySlice = useSelector((state) => state.agency);

  const [form, setForm] = useState({
    to: "",
    from: "",
    busType: "",
    availableSeats: "",
    departureTime: "",
    arrivalTime: "",
    departureDate: "",
    arrivalDate: "",
    price: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const ticketCollectionRef = collection(db, "goCameTickets");
      await addDoc(ticketCollectionRef, {
        to: form.to,
        from: form.from,
        busType: form.busType,
        availableSeats: form.availableSeats,
        occupiedSeats: 0,
        departureDate: form.departureDate,
        arrivalDate: form.arrivalDate,
        departureTime: form.departureTime,
        arrivalTime: form.arrivalTime,
        price: form.price,
        agencyEmail: agencySlice?.agency?.email,
        agencyName: agencySlice?.agency?.agencyname,
        // user: { email: currentAgency?.email },
      });
      setTrigger(!trigger);
      setShow(false);
      // console.log(ticketCollectionRef);
    } catch (error) {
      console.log(error.message);
    }
    //  console.log(form);
  };
  return (
    <div>
      <h1 className="text-2xl  text-center font-bold">Go and Come</h1>

      <form className="mt-2" onSubmit={handleSubmit}>
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

        <div className="w-full flex justify-between gap-5">
          <div className="w-full">
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
          </div>
          <div className="w-full">
            <TextInput
              label={"Price"}
              type={"number"}
              onChange={(e) => {
                setForm({ ...form, price: e.target.value });
              }}
              name={"price"}
              id={"price"}
              value={form.price}
              required={true}
            />
          </div>
        </div>

        <div>
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

        <div className="flex gap-5">
          <SelectInput
            selectOptions={TRAVEL_TIME}
            label={"Departure Time"}
            onChange={(e) => {
              setForm({ ...form, departureTime: e.target.value });
            }}
            value={form.departureTime}
          />
          <SelectInput
            selectOptions={TRAVEL_TIME}
            label={"Arrival Time"}
            onChange={(e) => {
              setForm({ ...form, arrivalTime: e.target.value });
            }}
            value={form.arrivalTime}
          />
        </div>

        <div className="flex gap-5">
          <DateInput
            // selectOptions={TRAVEL_TIME}
            label={"Departure Date"}
            type={"date"}
            onChange={(e) => {
              setForm({ ...form, departureDate: e.target.value });
            }}
            value={form.departureDate}
          />
          <DateInput
            // selectOptions={TRAVEL_TIME}
            label={"Arrival Date"}
            type={"date"}
            onChange={(e) => {
              setForm({ ...form, arrivalDate: e.target.value });
            }}
            value={form.arrivalDate}
          />
        </div>

        <div className="mt-5">
          <Button
            text="Add Go and Come Ticket"
            buttonType={"PRIMARY"}
            fullWidth={true}
            // onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddGoCameModal;
