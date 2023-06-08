import React ,{useState} from 'react'
import TextInput from '../../components/common/input/TextInput';
import PasswordInput from '../../components/common/input/PasswordInput';
import Button from '../../components/common/button/Button';
import { useNavigate } from "react-router-dom";

const AgencySignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
     agencyname: "",
    mainoffice: "",
    email:'',
    password:'',
    confirmpassword: '',
  });

    const handleSubmit = (event) => {
      event.preventDefault();
      // console.log(form)
      navigate("/agency-home");
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
            label="Agency Name"
            placeholder="Agency Name"
            type="text"
            id="agencyname"
            value={form.agencyname}
            onChange={(e) => {
              setForm({ ...form, agencyname: e.target.value });
            }}
          />
        </div>
        <div>
          <TextInput
            label="Main Office"
            placeholder="Main Office"
            type="text"
            id="mainoffice"
            value={form.mainoffice}
            onChange={(e) => {
              setForm({ ...form, mainoffice: e.target.value });
            }}
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
  )
}

export default AgencySignup