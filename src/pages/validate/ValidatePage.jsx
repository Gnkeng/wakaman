import React from "react";

const ValidatePage = () => {
  return (
    <div className="bg-[#f4f4f4]  h-screen">
      {" "}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-bold">Validated Customers</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-7 mt-6">
        <div
          className=" w-[350px] bg-white flex justify-between items-center py-5 px-4 border rounded-lg"
          style={{
            boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)",
          }}
        >
          <div>
            <p>Joseph Neymar</p>
          </div>

          <div>
            <p>from:Buea</p>
            <p>to:Bamemda</p>
            <p>departue Time:4:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatePage;
