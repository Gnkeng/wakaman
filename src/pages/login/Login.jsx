import React, { useState } from 'react';
import TextInput from '../../components/common/input/TextInput';
import PasswordInput from '../../components/common/input/PasswordInput';
import Button from '../../components/common/button/Button';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/common/input/SelectInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import {
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
// import { customerInfo } from '../../store/customer/customerSlice';

import { agencyInfo } from '../../store/agency/agencySlice';
import Loader from '../../components/common/button/Loader';
import { customerInfo } from "../../store/customer/customerSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerSlice = useSelector((state) => state.customer);

  const [userEmail, setUserEmail] = useState('');
  const [presentUser, setPresentUser] = useState({});

  const [loading, setLoading] = useState(false);

  const [currentCustomer, setcurrentCustomer] = useState([{}]);


  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  });

  // console.log(presentUser);

  const [error, setError] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [firebaseErr, setFirebaseErr] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (form.password.length < 6) {
      return setError({
        ...error,
        password: 'Password must be at least 6 characters',
      });
    }
    if (form.role === 'customer') {
      console.log('am a customer');
      try {
        const customer = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        const customerRef = collection(db, 'customers');
        onAuthStateChanged(auth, (currentUser) => {
          setUserEmail(currentUser.email);
        });

        try {
          const q = query(customerRef, where('email', '==', form.email));
          //  setPresentUser(q);
          const querySnapshot = await getDocs(q);
          setPresentUser(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          querySnapshot.forEach((doc) => {
            //  if (doc.data()) {
            //    setPresentUser(doc.data());
            //    console.log(presentUser);
            //  }

            // doc.data() is never undefined for query doc snapshots

            console.log(doc.id, ' => ', doc.data());
            //  dispatch(customerInfo(doc.data()));

           

            dispatch(customerInfo(doc.data()));

            if (doc.data().email === form.email) {
              // console.log(doc.data().email);
              // setPresentUser(doc.data().email);
              // dispatch(customerInfo(doc.data()));

              // console.log(presentUser)
              // console.log(customerSlice);

              navigate('/customer-home');
            }
          });
        } catch (err) {
          console.log(err.message);
        }

        // console.log(userEmail);
      } catch (error) {
        console.log(error.message);
        setFirebaseErr(error.message);
      }
    } else {
      try {
        const agency = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        console.log(agency);

        const agencyRef = collection(db, 'agency');
        onAuthStateChanged(auth, (currentUser) => {
          setUserEmail(currentUser.email);
        });

        console.log(userEmail);
        if (userEmail) {
          try {
            const q = query(agencyRef, where('email', '==', userEmail));
            setPresentUser(q);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, ' => ', doc.data());
              dispatch(agencyInfo(doc.data()));
            });
            navigate('/agency-home');
          } catch (err) {
            console.log(err.message);
          }
        }
      } catch (err) {
        console.log(error.message);
        setFirebaseErr(error.message);
      }
    }
  };

  // dispatch(customerInfo(currentCustomer));

  console.log(customerSlice);
  return (
    <div className="bg-mid h-screen  flex flex-row justify-center items-center  ">
      <div className="w-[500px] h-[640px] py-5 px-10 bg-white rounded-lg ">
        <div className="text-center">
          <h1 className="font-bold text-[2p4x] text-dark">
            SIGNUP TO <span className="text-brand">WAKAMAN</span>
          </h1>
        </div>

        <Loader />
        <form className="mt-4" onSubmit={handleSubmit}>
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
              <p className="text-red-400 mb-3">{error.password}</p>
            ) : (
              ''
            )}
          </div>

          <div>
            <SelectInput
              label={'How do you want to Login'}
              selectOptions={[
                {
                  label: 'Passenger',
                  value: 'customer',
                },
                {
                  label: 'Agency',
                  value: 'agency',
                },
              ]}
              onChange={(e) => {
                setForm({ ...form, role: e.target.value });
              }}
              value={form.role}
            />
          </div>
          {firebaseErr && <p>{firebaseErr}</p>}
          <div>
            <Button
              type={'submit'}
              buttonType="PRIMARY"
              text={'login'}
              fullWidth={true}
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
