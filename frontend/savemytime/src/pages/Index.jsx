import React, { useState } from "react";
import "../styles/indexstyles.css";
import SignInForm from "../components/SignIn";
import SignUpForm from "../components/SignUp";

function Index() {
        const [type, setType] = useState("signIn");
        const handleOnClick = text => {
          if (text !== type) {
            setType(text);
            return;
          }
        };
        const containerClass =
          "container " + (type === "signUp" ? "right-panel-active" : "");
        return (
          <div className="App">
            <div className={containerClass} id="container">
              <SignUpForm />
              <SignInForm />
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Bienvenido!!</h1>
                    <p className="index_p">
                      Ingresa tus credenciales para ingresar a tu calendario
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                      
                    >
                      Iniciar Sesion
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Bienvenido!!</h1>
                    <p className="index_p">Crea una cuenta para poder utilizar nuestra agenda organizadora</p>
                    <button
                      className="ghost "
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
}

export default Index