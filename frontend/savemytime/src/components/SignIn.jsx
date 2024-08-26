import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useState } from "react";


function SignInForm() {
  
  const {register, handleSubmit} = useForm()
  const [mensaje, setMensaje] = useState("");
  const { setToken } = useSession();
  const navigate = useNavigate();

  const enviarLogin = async (datos) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/usuarios/login",
        datos
      );

      localStorage.setItem("token", data.token);

      setToken(data.token);

      setMensaje("Login Exitoso !");

      return navigate("/calendar");
    } catch (error) {
      if (error instanceof AxiosError) {
        setMensaje(error.response.data.message);
      }
    }
  };


  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit(enviarLogin)}>
        <h1>Iniciar Sesion</h1>
        <input
          type="email"
          required
          placeholder="Correo"
          name="email"
          className="index_input"
          {...register("correo")}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="Contraseña"
          className="index_input"
          {...register("contrase_a")}
        />
        <button type="submit">Iniciar Sesion</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
