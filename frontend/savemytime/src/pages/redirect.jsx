import React, { useEffect } from "react";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const { perfil } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (perfil) return navigate("/calendar");

    return navigate("/");
  }, []);

  return <></>;
};

export default Redirect;