import React from 'react'
import SelectInput from "../../input/SelectInput";
import { LOCATIONS, TRAVEL_TIME } from "../../../../constants/constant";
import Dateinput from "../../input/Dateinput";
import Button from "../../button/Button";
import { useNavigate } from 'react-router-dom';

const GoCameModal = () => {
  const navigate = useNavigate();

   const handleSubmit = () => {
   
     navigate("/go-came");
   };


  return (
    <div>
      <h1 className="text-2xl font-bold">Go and Come</h1>

      <form className="mt-8">
        <div className="flex gap-10">
          <SelectInput selectOptions={LOCATIONS} label="FROM" />
          <SelectInput selectOptions={LOCATIONS} label="TO" />
        </div>

        <div className="flex items-center gap-10 mt-3 mb-6">
          <div>
            <Dateinput label={"Depature Date"} width={"300px"} type={"date"} />
          </div>
          <div>
            <Dateinput label={"Arrival Date"} width={"300px"} type={"date"} />
          </div>
        </div>


        <div className="flex items-center gap-10 mt-10 mb-9">
          <div>
            <Dateinput label={"Depature Time"} width={"300px"} type={"time"} />
          </div>
          <div>
            <Dateinput label={"Arrival Time"} width={"300px"} type={"time"} />
          </div>
        </div>
        <div className="mt-5">
          <Button text="Search" buttonType={"PRIMARY"} fullWidth={true} onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default GoCameModal