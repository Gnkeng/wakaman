import React,{useState} from 'react'

import SelectInput from '../../../input/SelectInput';
import { LOCATIONS,TRAVEL_TIME } from '../../../../../constants/constant';
import TextInput from '../../../input/TextInput'
import Button from '../../../button/Button';
import DateInput from '../../../input/Dateinput'


const AddOneWayModal = ({setShow}) => {

    

    const handleSubmit = () => {
    setShow(false)
    };

     const [form, setForm] = useState({
       to: "",
       from: "",
       busType: "",
       availableSeats: "",
       departureDate:'',
       departureTime: "",
     });
  return (
    <div>
      <h1 className="text-2xl  text-center font-bold">Go and Come</h1>

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

        <div className="">
          <TextInput
            label={"Bus Type"}
            type={"text"}
            onChange={(e) => {
              setForm({ ...form, busType: e.target.value });
            }}
            name={"busType"}
            id={"busType"}
            value={form.busType}
          />
        </div>

        <div>
          <TextInput
            label={"Available Seats"}
            type={"number"}
            onChange={(e) => {
              setForm({ ...form, availableSeats: e.target.value });
            }}
            value={form.availableSeats}
          />
        </div>

        <div className="w-full flex items-center gap-12 ">
          <SelectInput
            selectOptions={TRAVEL_TIME}
            label={"Departure Time"}
            onChange={(e) => {
              setForm({ ...form, departureTime: e.target.value });
            }}
            value={form.departureTime}
          />
          <div className="w-full">
            <DateInput
              // selectOptions={TRAVEL_TIME}
              label={"Departure Date"}
              type={'date'}
              // onChange={(e) => {
              //   setForm({ ...form, departureTime: e.target.value });
              // }}
              //  value={form.departureTime}
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
}

export default AddOneWayModal