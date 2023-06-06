import React from "react";
import Button from "../../components/common/button/Button";

const AgencyHome = () => {
  return (
    <div>
      <div className="bg-[#f4f4f4]  h-screen">
        <div className="text-center pt-4">
          <h3 className="text-4xl font-bold">Bus Agency</h3>
        </div>

        <div className="flex flex-col justify-center gap-10 mt-6">
          <Button text={"Fast Book Trips"} buttonType={"PRIMARY"} />
          <Button text={"One Way Trips"} buttonType={"OUTLINE"} />
          <Button text={"Go and Come Trips"} buttonType={"SECONDARY"} />

          {/* <GoCameCard /> */}
        </div>
      </div>
    </div>
  );
};

export default AgencyHome;
