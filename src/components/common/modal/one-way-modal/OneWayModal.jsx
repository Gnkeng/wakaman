import React, { useState } from "react";
import SelectInput from "../../input/SelectInput";
import { LOCATIONS, TRAVEL_TIME } from "../../../../constants/constant";

import DateInput from "../../input/DateInput";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";

const OneWayModal = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    to: "",
    from: "",
    departureDate: "",
    departureTime: "",
  });

  const handleSubmit = () => {
    navigate("/one-way", {
      state: {
        to: form.to,
        from: form.from,
        departureDate: form.departureDate,
        departureTime: form.departureTime,
      },
    });
  };
  return (
    <div>
      <h1 className="text-2xl">One Way</h1>

      <form className="mt-8">
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

        <div className="flex  gap-10 mt-3 mb-4">
          <SelectInput
            selectOptions={TRAVEL_TIME}
            label={"Departure Time"}
            onChange={(e) => {
              setForm({ ...form, departureTime: e.target.value });
            }}
            value={form.arrivalTime}
          />
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
        <div className="mt-5">
          <Button
            text="Search"
            buttonType={"PRIMARY"}
            fullWidth={true}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default OneWayModal;
