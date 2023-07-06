// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
const ScanTicket = () => {
  const [scanResult, setScanResult] = useState(null);
  //   const [manualSerialNumber, setManualSerialNumber] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  //   function handleManualSerialNumberChange(event) {
  //     setManualSerialNumber(event.target.value);
  //   }
  //   const [qrData, setQrData] = useState(null);
  //   const [data, setData] = useState("No result");
  //   const handleScan = (data) => {
  //     if (data) {
  //       setQrData(data);
  //       //  const db = firebase.firestore();
  //       //  db.collection("qrCodes").add({ data });
  //     }
  //   };

  //   const handleError = (err) => {
  //     console.error(err);
  //   };

  return (
    <>
      <h1>QR Scanning Code</h1>

      <div id="reader">
        <p>Success: {scanResult}</p>
      </div>

      <div>{scanResult}</div>

      {/* <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p> */}
      {/* <QrReader delay={300} onError={handleError} onScan={handleScan} /> */}
      {/* {qrData && <p>{qrData}</p>} */}
    </>
  );
};

export default ScanTicket;
