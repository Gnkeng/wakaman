import React,{useState} from 'react'
import SelectInput from "../../input/SelectInput";
import { LOCATIONS, TRAVEL_TIME } from "../../../../constants/constant";
import DateInput from "../../input/DateInput";
import Button from "../../button/Button";
import { useNavigate } from 'react-router-dom';

const GoCameModal = () => {
  const navigate = useNavigate();

  
     const [form, setForm] = useState({
       to: "",
       from: "",
       arrivalDate: "",
       departureDate: "",
       arrivalTime:'',
       departureTime:''
     });

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(form);
   
     navigate("/go-came");
   };


  return (
    <div>
      <h1 className="text-2xl font-bold">Go and Come</h1>

      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <SelectInput
            selectOptions={LOCATIONS}
            label="FROM"
            onChange={(e) => {
              setForm({ ...form, from: e.target.value });
            }}
            value={form.from}
          />
          <SelectInput
            selectOptions={LOCATIONS}
            label="TO"
            onChange={(e) => {
              setForm({ ...form, to: e.target.value });
            }}
            value={form.to}
          />
        </div>

        <div className="w-full flex justify-between gap-10 mt-3 mb-6">
          <DateInput
            type={"date"}
            label={"Departure Date"}
            width={"100%"}
            onChange={(e) => {
              setForm({ ...form, departureDate: e.target.value });
            }}
            value={form.departureDate}
          />

          <DateInput
            type={"date"}
            label={"Arrival Date"}
            width={"100%"}
            onChange={(e) => {
              setForm({ ...form, arrivalDate: e.target.value });
            }}
            value={form.arrivalDate}
          />
        </div>

        <div className="flex gap-10 mt-10 mb-9">
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
        <div className="mt-5">
          <Button text="Search" buttonType={"PRIMARY"} fullWidth={true} />
        </div>
      </form>
    </div>
  );
}

export default GoCameModal