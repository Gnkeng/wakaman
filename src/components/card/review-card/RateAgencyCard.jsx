import React, { useState } from "react";
import StarRating from "./star-rating/StarRatingsComponent";
import Button from "../../common/button/Button";

const RateAgency = ({ agencyName, setAgencyRating, onClick }) => {
  return (
    <div
      className="px-10  bg-transparent py-4 mb-6  rounded-lg"
      style={{
        // boxShadow: '0px 20px 25px rgba(76, 103, 100, 0.1)',
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <p className="text-2xl font-bold">Rate {agencyName}</p>
      <div>
        <StarRating totalStar={5} setAgencyRating={setAgencyRating} />
      </div>

      <div className="flex justify-center items-center">
        <Button text={"Make Review"} buttonType={"PRIMARY"} onClick={onClick} />
      </div>
    </div>
  );
};

export default RateAgency;
