import React ,{useState} from 'react'
import TextInput from '../../components/common/input/TextInput';
import PasswordInput from '../../components/common/input/PasswordInput';
import Button from '../../components/common/button/Button';
import { useNavigate } from "react-router-dom";
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

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form)
        navigate("/customer-home");
      };


    
  return (
    <div className="bg-mid h-screen  flex flex-row justify-center items-center  ">
      <div className="w-[500px] h-[640px] py-5 px-10 bg-white rounded-lg ">
        <div className="text-center">
          <h1 className="font-bold text-[2p4x] text-dark">
            SIGNUP TO <span className="text-brand">WAKAMAN</span>
          </h1>
        </div>

        <form className="mt-4"  onSubmit={handleSubmit}>
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
            />
          </div>
          <div>
            <TextInput
              label="Email"
              placeholder="example@email.com"
              type="text"
              id="firstname"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
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
            />
          </div>
          <div>
            <PasswordInput
              label="Confirm Password"
              placeholder="******"
              type="password"
              id="password"
              value={form.confirmpassword}
              onChange={(e) => {
                setForm({ ...form, confirmpassword: e.target.value });
              }}
            />
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