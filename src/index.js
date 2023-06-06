import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Provider } from "react-redux";
import {store} from './store'
import CustomerHome from './pages/home/CustomerHome';
import AgencyHome from './pages/home/AgencyHome';
import AgencySignup from './pages/agency-signup/AgencySignup';
import OneWay from './pages/one-way/OneWay';
import GoCame from './pages/go-came/GoCame';
import ForToday from './pages/for-the-day/ForToday'
import TicketPage from './pages/ticket/TicketPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/agency-signup",
    element: <AgencySignup/>,
  },
  {
    path: "/customer-home",
    element: <CustomerHome/>,
  },
  {
    path: "/agency-home",
    element: <AgencyHome/>,
  },
  {
    path: "/one-way",
    element: <OneWay/>,
  },
  {
    path: "/go-came",
    element: <GoCame/>,
  },
  {
    path: "/for-today",
    element: <ForToday/>,
  },
  {
    path: "/customer-ticket",
    element: <TicketPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
