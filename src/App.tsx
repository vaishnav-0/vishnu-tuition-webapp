import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './routes/index';

function App() {
  return (
    <div className='app'>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </div>
  );
}

export default App;
