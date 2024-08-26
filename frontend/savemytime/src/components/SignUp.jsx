import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


function SignUpForm() {

  const { register, handleSubmit, formState, setError } = useForm();
  const [mensaje, setMensaje] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const enviarDatos = async (data) => {
    try {
      await axios.post("http://localhost:5000/usuarios/register", data);
      setMensaje("Cuenta Creada");
      setPopupVisible(true); // Mostrar el popup

    } catch (error) {
      if (error instanceof AxiosError) {
        setMensaje(error.response.data.message);
        setError("email");
      }
    }
  };

  const cerrarPopup = () => {
    setPopupVisible(false);
    window.location.reload();
  };

  
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit(enviarDatos)}>
        <h1>Crear Cuenta</h1>
        <input
          type="text"
          name="name"
          required
          placeholder="Nombre"
          className="index_input"
          {...register("nombre_usuario")}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          className="index_input"
          required
          {...register("correo")}
        />
        <input
          type="password"
          minLength={7}
          name="password"
          required
          placeholder="Contraseña"
          className="index_input"
          {...register("contrase_a")}
        />
        <button
        disabled={formState.isSubmitSuccessful}


        >Crear Cuenta</button>
      </form>

      {popupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>{mensaje}</h2>
            <button onClick={cerrarPopup}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default SignUpForm;