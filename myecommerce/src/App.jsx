// import { useState } from 'react'
// import './App.css'
// import Login from "./components/auth/Login";
// import { RouterProvider } from "react-router-dom";
// // import { Router, router, RouterProvider } from 'react-router'
// import router from "./routes/router"


// function App() {

//   return (
//     <>

//       <RouterProvider router={router}/>
//       </>
    
//       )
// }

// export default App



import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
