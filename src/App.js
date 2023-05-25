import LoginPage from './pages/login/Login';
import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <div>
 <div>
  <h1 className='waka'>WAKAMAN</h1>
 </div>

 <div className='margintop1'>
 <h1 className='howtosignup'>HOW DO YOU WANT TO SIGN UP?</h1> 
 </div>

 <div className='button-container'>
  <div>
    <button className='cus'>Customer</button>
  </div>
  <div>
    <button className='agn'>Bus Agency</button>
  </div>
 </div>

 <div className='aa'>
 <p>Already have account?   <span className='login'>login</span>
        </p>
 </div>

      </div>
      {/* <h1 className='waka'> WAKAMAN</h1>
      <h1>HOW DO YOU WANT TO SIGN UP</h1>
      
      <div>
        <button className='cb'>CUSTOMER</button>
        <button className='ab'>AGENCY</button>
      </div>
      <div>
        <p>Already have account?
          <span className='login'>login</span>
        </p>
      </div> */}
    </div>
  );
}

export default App;
