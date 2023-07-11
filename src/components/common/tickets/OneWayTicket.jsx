import React from "react";
import QRCode from "react-qr-code";
import Button from "../button/Button";

const OneWayTicket = ({
  agencyName,
  customerFirstName,
  customerLastName,
  to,
  from,
  departureDate,
  departureTime,
  price,
  customerEmail,
  id,
  handlePDF,
}) => {
  return (
    <div
      className="px-10 w-[600px] bg-white py-4 mb-6 border rounded-lg"
      style={{ boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)" }}
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-brand">ONE WAY TICKET</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h2>
            <span className="font-bold">Agency:</span> {agencyName}
          </h2>
          <h2>
            <span className="font-bold">Customer name:</span>{" "}
            {customerFirstName} {customerLastName}
          </h2>
          <h2>
            <span className="font-bold">To:</span> {to}
          </h2>
          <h2>
            <span className="font-bold">From :</span> {from}
          </h2>
          <h2>
            <span className="font-bold">Departure Date:</span> {departureDate}
          </h2>
          <h2>
            <span className="font-bold">Departure Time:</span> {departureTime}
          </h2>
          <h2>
            <span className="font-bold">Price:</span> {price}
          </h2>
        </div>

        <div>
          <div className="w-[100px] h-[100px]">
            <QRCode
              value={customerEmail}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
            {/* <img src="qrcode.png" alt="qr" className="w-full h-auto" /> */}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          text={"Download Ticket"}
          buttonType={"PRIMARY"}
          fullWidth={true}
          onClick={handlePDF}
        />
      </div>
    </div>
  );
};

export default OneWayTicket;
