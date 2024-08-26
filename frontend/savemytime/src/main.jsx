import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import Calendario from './pages/Calendar.jsx'
import Index from './pages/Index.jsx'
import Recordatorios from './pages/Recordatorios.jsx'
import UnProtectedRoute from './layout/UnProtectedRoute.jsx'
import ProtectedRoute from "./layout/ProtectedRoute"
import { SessionProvider } from './context/SessionContext.jsx'
import Redirect from './pages/redirect.jsx'
import { RecordatorioProvider } from './context/RecordatorioContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<UnProtectedRoute><Index/></UnProtectedRoute>),
  },
  {
    path:"/redirect",
    element: <Redirect/>
  },
  {
    path: "/calendar",
    element: (
    <RecordatorioProvider>
      <ProtectedRoute>
        <Calendario/>
      </ProtectedRoute>
    </RecordatorioProvider>
    ),
  },
  {
    path: "/recordatorios",
    element: (
    <RecordatorioProvider>
      <ProtectedRoute>
        <Recordatorios/>
      </ProtectedRoute>
    </RecordatorioProvider>  
  ),
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <SessionProvider>
    <RouterProvider router={router} />
  </SessionProvider>
)
