import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';


const router = createBrowserRouter([
  {
    path: "thread/:username",
    element: <App />,
  },
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "signup/",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
