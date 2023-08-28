import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { iniciarSesion } from "../Services/RestServices";
import { useNavigate } from "react-router-dom";
import { LocalStorageSetUser } from "../Services/localStorage";

const Login = () => {
  const [Sesion, setSesion] = useState<any>({
    usuario: "",
    password: "",
  });
  const [Err, setErr] = useState<Boolean>(false);
  const navigate = useNavigate();

  const changeText = (event: any) => {
    const { name, value } = event.target;
    const newValues = {
      ...Sesion,
      [name]: value,
    };
    setSesion(newValues);
  };

  const LoginUser = async () => {
    let resp = await iniciarSesion(Sesion);
    if (resp && resp.Nombre) {
      navigate("/");
      LocalStorageSetUser(resp);
    } else {
      setErr(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="seccionInter">
        <div className="Register">
          <h2 className="text-light"> Inicia Sesion</h2>
          <label className=" mt-4">
            Numero de Empleado
            <input
              name="usuario"
              onChange={(e) => changeText(e)}
              className="form-control"
              type="text"
              placeholder="20237513646"
            />
          </label>
          <label className=" mt-4">
            Contraseña
            <input
              name="password"
              onChange={(e) => changeText(e)}
              className="form-control"
              type="password"
            />
          </label>

          {Err && (
            <p className=" text-danger text-center mt-3 ">
              Error en algun campo
            </p>
          )}
          <button onClick={() => LoginUser()} className="btn btn-primary mt-4">
            Entrar
          </button>

          <p className="text-warning mt-3">
            Usuario = 20237513646 - Contrasena = ddwhq8b24k4o
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
