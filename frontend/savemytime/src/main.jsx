import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import Calendario from './pages/Calendar.jsx'
import Modal from './components/Modal.jsx'

const router = createBrowserRouter([
  {
    path: "/calendar",
    element: <Calendario/>
  },
  {
    path: "modal",
    element: <Modal/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
