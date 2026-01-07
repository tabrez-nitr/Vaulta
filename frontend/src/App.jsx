import Navbar from "./components/Navbar"
import Router from "./routes/Router"
import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';

function App() {


  return (
      <div>
        <Router/>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
       /> 
      </div>
  )
}

export default App
