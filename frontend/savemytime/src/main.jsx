import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import Calendario from './pages/Calendar.jsx'
import Index from './pages/Index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>
  },
  {
    path: "/calendar",
    element: <Calendario/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
