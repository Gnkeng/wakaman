import React,{useState,useEffect} from 'react'
import SelectButton from '../../components/common/button/SelectButton'
import Button from '../../components/common/button/Button'
import ModalContainer from '../../components/common/modal/modal-container/ModalContainer'
import OneWayModal from '../../components/common/modal/one-way-modal/OneWayModal'
import GoCameModal from '../../components/common/modal/go-came-modal/GoCameModal'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  getDocs,
  
} from "firebase/firestore";
import { db,auth } from '../../firebase-config'
import { onAuthStateChanged } from "firebase/auth";
import { customerInfo } from '../../store/customer/customerSlice'



const CustomerHome = () => {
    const customerSlice = useSelector((state) => state.customer);

    console.log('customerSlice', customerSlice)

  const [active, setActive] = useState(0)
  const [show, setShow] = useState(false)
  const [userID, setUserID] = useState();
  const [allCustomers, setAllCustomers] = useState([]);
  const dispatch = useDispatch();

   const customerCollectionRef = collection(db, "customers");

 


  useEffect(() => {
     const getStudents = async () => {
       const data = await getDocs(customerCollectionRef);
      setAllCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // const customerRef = collection(db, "customers");
      onAuthStateChanged(auth, (currentUser) => {
        setUserID(currentUser.uid);
      });

       allCustomers.map((customer) => {
         if (customer.email === auth.currentUser.email) {
           dispatch(customerInfo(customer));

           console.log("customer", customer.email);
           
         }
        console.log(customer.email);
       });
     }; 


    getStudents();

    
  },[]);

  const navigate = useNavigate();

    const handleSubmit = () => {
     
      navigate("/for-today");
    };

  const handleWayClick = () => {

    setActive(1)
    setShow(true)

 }

  const handleGoClick = () => {

    setActive(2)
    setShow(true);

 }

 console.log(allCustomers)

  return (
    <div
      className="h-screen flex flex-col justify-around  items-center"
      style={{ background: "#f4f4f4" }}
    >
      <div className="mt-20">
        <h1 className="text-6xl text-dark text-center">Let's Book</h1>

        <div className="w-full mt-10 mb-10">
          <h1 className="text-5xl text-dark ">
            What Type of Trip do you want ?
          </h1>
        </div>

        <div className="flex justify-center gap-10">
          <SelectButton
            text={"One way"}
            buttonType={active === 1 ? "SECONDARY" : "PRIMARY"}
            icon={active === 1 ? true : false}
            onClick={handleWayClick}
          />
          <SelectButton
            text={"Go and Come"}
            buttonType={active === 2 ? "SECONDARY" : "PRIMARY"}
            icon={active === 2 ? true : false}
            onClick={handleGoClick}
          />
        </div>
      </div>

      <div className='' >
        <Button
          type={"submit"}
          buttonType="PRIMARY"
          text={"FAST BOOKING FOR THE  DAY"}
          fullWidth={true}
          onClick={handleSubmit}
        />
        
      </div>
      <ModalContainer onClose={()=>{setShow(false)}} width={'700px'} show={show}>
        {/* <OneWayModal/> */}
        {
          active ===1 ?<OneWayModal/>:active === 2?   <GoCameModal/>:<p>hi</p>
        }
   
      </ModalContainer>
    </div>
  );
}

export default CustomerHome