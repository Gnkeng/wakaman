import React ,{useState} from 'react'
import TextInput from '../../components/common/input/TextInput';
import PasswordInput from '../../components/common/input/PasswordInput';
import Button from '../../components/common/button/Button';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../../firebase-config";
import { getDoc, collection, addDoc } from "firebase/firestore";


// import styles from './signup.module.css'

const Signup = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({
       firstname: "",
      lastname: "",
      email:'',
      password:'',
      confirmpassword: '',
    });

      const [firebaseErr, setFirebaseErr] = useState("");
    const [error, setError] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    });

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.password.length < 6) {
          return setError({
            ...error,
            password: "Password must be at least 6 characters",
          });
        }  if (form.confirmpassword.length < 6) {
          return setError({
            ...error,
            confirmpassword: "Password must be at least 6 characters",
          });
        }

         if (form.password.length < 6 && form.confirmpassword.length < 6){
          return setError({
            ...error,
            password: "Password must be at least 6 characters",
            confirmpassword: "Password must be at least 6 characters",
          });
        }

        if(form.password !== form.confirmpassword) {
          return setError({
            ...error,
            password: "Passwords do not match",
          });
        }

        try{
          const customer = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );


 const customerCollectionRef = collection(db, "customers");
 await addDoc(customerCollectionRef, {
  firstname:form.firstname,
  lastname:form.lastname,
   email:form.email,
 });



      console.log("user is", customer);
      console.log(customerCollectionRef);
       console.log(form);
       navigate("/customer-home");
        }catch(error){
      console.log(error.message);
      setFirebaseErr(error.message)
        }
          
       
      };


    
  return (
    <div className="bg-mid h-screen  flex flex-row justify-center items-center  ">
      <div className="w-[500px] h-[680px] py-5 px-10 bg-white rounded-lg ">
        <div className="text-center">
          <h1 className="font-bold text-[2p4x] text-dark">
            SIGNUP TO <span className="text-brand">WAKAMAN</span>
          </h1>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <TextInput
              label="First Name"
              placeholder="First Name"
              type="text"
              id="firstname"
              value={form.firstname}
              onChange={(e) => {
                setForm({ ...form, firstname: e.target.value });
              }}
              required={true}
            />
          </div>
          <div>
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              type="text"
              id="lastname"
              value={form.lastname}
              onChange={(e) => {
                setForm({ ...form, lastname: e.target.value });
              }}
              required={true}
            />
          </div>
          <div>
            <TextInput
              label="Email"
              placeholder="example@email.com"
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              required={true}
            />

            {firebaseErr &&(<p>{firebaseErr}</p> )}
          </div>
          <div>
            <PasswordInput
              label="Password"
              placeholder="******"
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              required={true}
            />
            {error.password ? (
              <p className="text-red-400 ">{error.password}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <PasswordInput
              label="Confirm Password"
              placeholder="******"
              type="password"
              id="confirmpassword"
              value={form.confirmpassword}
              onChange={(e) => {
                setForm({ ...form, confirmpassword: e.target.value });
              }}
              required={true}
            />
            {error.confirmpasswordpassword ? (
              <p className="text-red-400">{error.password}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <Button
              type={"submit"}
              buttonType="PRIMARY"
              text={"Register"}
              fullWidth={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup