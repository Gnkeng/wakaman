import React ,{useState} from 'react'
import TextInput from '../../components/common/input/TextInput';
import PasswordInput from '../../components/common/input/PasswordInput';
import Button from '../../components/common/button/Button';
import { useNavigate } from "react-router-dom";
import SelectInput from '../../components/common/input/SelectInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email:'',
    password:'',
    role:''
  });

  const [error,setError]=useState({
    email: '',
    password: '',
    role:''
  })

        const [firebaseErr, setFirebaseErr] = useState("");


   
   


    const handleSubmit = async (event) => {
      event.preventDefault();
      if(form.password.length < 6){
       return  setError({...error,password:'Password must be at least 6 characters'})
      }
      if(form.role === 'customer'){
        try {
      const customer = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(customer);
      navigate("/agency-home");
      }catch(error){
        console.log(error);
        setFirebaseErr(error.message);
      }
    }
      
                  

      
    };
  return (
    <div className="bg-mid h-screen  flex flex-row justify-center items-center  ">
      <div className="w-[500px] h-[640px] py-5 px-10 bg-white rounded-lg ">
        <div className="text-center">
          <h1 className="font-bold text-[2p4x] text-dark">
            SIGNUP TO <span className="text-brand">WAKAMAN</span>
          </h1>
        </div>

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
              ""
            )}
          </div>

          <div>
            <SelectInput
              label={"How do you want to Login"}
              selectOptions={[
                {
                  label: "Passenger",
                  value: "customer",
                },
                {
                  label: "Agency",
                  value: "agency",
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
              type={"submit"}
              buttonType="PRIMARY"
              text={"login"}
              fullWidth={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login