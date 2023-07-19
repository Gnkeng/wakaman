import React, { useState, useEffect } from "react";
import Button from "../../components/common/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { agencyInfo } from "../../store/agency/agencySlice";
import { signOut } from "firebase/auth";

const AgencyHome = () => {
  const agencySlice = useSelector((state) => state.agency);

  console.log("agencySlice", agencySlice);
  const navigate = useNavigate();

  const [userID, setUserID] = useState();
  const [allAgencies, setAllAgencies] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [presentUser, setPresentUser] = useState({});
  const dispatch = useDispatch();

  const agencyCollectionRef = collection(db, "agency");

  useEffect(() => {
    const getAgency = async () => {
      onAuthStateChanged(auth, (currentUser) => {
        setCurrentEmail(currentUser.email);
      });

      const q = query(agencyCollectionRef, where("email", "==", currentEmail));
      const querySnapshot = await getDocs(q);
      setPresentUser(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        //  dispatch(customerInfo(doc.data()));

        dispatch(agencyInfo(doc.data()));
      });
    };

    getAgency();
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      const data = await getDocs(agencyCollectionRef);
      setAllAgencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // const customerRef = collection(db, "customers");
      onAuthStateChanged(auth, (currentUser) => {
        setUserID(currentUser.uid);
      });

      allAgencies.map((agency) => {
        if (agency.email === auth.currentUser.email) {
          dispatch(agencyInfo(agency));

          console.log("agency", agency.email);
        }
        console.log(agency.email);
      });
    };

    getStudents();
  }, []);

  const ScanTicketPage = () => {
    navigate("/scan");
  };
  const gotoOneWayPage = () => {
    navigate("/add-one-way");
  };
  const goToGoCamePage = () => {
    navigate("/add-go-came");
  };
  const goToValidatePage = () => {
    navigate("/validate");
  };

  const logout = async () => {
    // setLoading(!loading);
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
    // setLoading(false);
    //  dispatch(resetStudentInfo());
    //  navigation.navigate("Login");
  };

  return (
    <div>
      <div className="bg-[#f4f4f4]  h-screen">
        <div className="text-center pt-4">
          <h3 className="text-4xl font-bold">
            {agencySlice?.agency?.agencyname}
          </h3>
        </div>

        <div className="flex flex-col justify-center items-center h-full gap-[80px] ">
          {/* <Button
            text={"Fast Book Trips"}
            buttonType={"PRIMARY"}
            onClick={goToFastPage}
          /> */}
          <Button
            text={"One Way Trips"}
            buttonType={"PRIMARY"}
            onClick={gotoOneWayPage}
          />
          <Button
            text={"Go and Come Trips"}
            buttonType={"SECONDARY"}
            onClick={goToGoCamePage}
          />
          <Button
            text={"Scan Ticket"}
            buttonType={"SECONDARY"}
            onClick={ScanTicketPage}
          />
          <Button
            text={"Validated Customers"}
            buttonType={"SECONDARY"}
            onClick={goToValidatePage}
          />
          <Button text={"Logout"} buttonType={"PRIMARY"} onClick={logout} />

          {/* <GoCameCard /> */}
        </div>
      </div>
    </div>
  );
};

export default AgencyHome;
