import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [perfil, setPerfil] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [headers, setHeaders] = useState({});

  const obtenerPerfil = async () => {
    try {
      const tokenLocal = localStorage.getItem("token");
      console.log("Token desde localStorage:", tokenLocal);

      const { data: usuario } = await axios.get(
        "http://localhost:5000/usuarios/perfil",
        {
          headers: {
            Authorization: "Bearer " + tokenLocal,
          },
        }
      );

      setToken(tokenLocal);
      setPerfil(usuario);
      setLoading(false);
      setHeaders({
        Authorization: `Bearer ${tokenLocal}`,
      });

    } catch (error) {
      console.error("Error al obtener perfil:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setPerfil({});
    setToken("");
  };

  useEffect(() => {
    setLoading(true);
    obtenerPerfil();
  }, [token]);

  if (loading) return <p>Cargando...</p>;

  return (
    <SessionContext.Provider
      value={{
        perfil,
        token,
        setToken,
        logout,
        headers
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };