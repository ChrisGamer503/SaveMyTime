import React, { useEffect } from "react";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { perfil, logout} = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Perfil en ProtectedRoute:", perfil); 
    if (!perfil.id_usuario) return navigate("/");
  }, [perfil,navigate]);

  return (
    <>
      {/* <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Cerrar Sesion
      </button> */}
      {children}
    </>
  );
};

export default ProtectedRoute;