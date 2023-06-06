import React ,{useState}from 'react';
import TextInput from '../../common/input/TextInput';
import { useNavigate } from "react-router-dom";
import Button from '../../common/button/Button';


const EnterDetailsCard = ({ selectedOperator, setCurrentStep }) => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    number: '',
  });
  return (
    <div className=" w-full  flex flex-col justify-center items-center text-center">
      <div className="text-2xl mb-10 font-bold">
        {selectedOperator === 'MTN' ? (
          <p>MOMO PAYMENT</p>
        ) : selectedOperator === 'ORANGE' ? (
          <p>ORANGE PAYMENT</p>
        ) : (
          ''
        )}
      </div>
      <div>
        <TextInput
          label="Number"
          placeholder="number"
          type="number"
          id="number"
          value={form.number}
          onChange={(e) => {
            setForm({ ...form, number: e.target.value });
          }}
        />
      </div>
      <div className='flex gap-20'>
        <Button
          onClick={() => setCurrentStep(0)}
          text={'Prev'}
          buttonType={'OUTLINE'}
          fullWidth={true}
        />
        <Button
          onClick={() =>  navigate("/customer-ticket")}
          text={'PAY'}
          buttonType={'PRIMARY'}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default EnterDetailsCard;
