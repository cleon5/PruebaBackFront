import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { User } from "../Models/User";
import { GetUserId, PostUser, UpdateUser } from "../Services/RestServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LocalStorageGetUser } from "../Services/localStorage";

const UserForm = () => {
  //Comprobacion para saber si ha iniciado seccion
  const comprobarSesion = async () => {
    let user: any = LocalStorageGetUser();
    if (user) {
      id ? GetUser() : setNumber(); //Si hay un id en params, se busca el usuario, en lo contrario se crea un numero de empleado
    } else {
      navigate("/login");
    }
  };

  let { id } = useParams();
  const [UserState, setUserState] = useState<User>({
    Numero: "",
    Nombre: "",
    Mail: "",
    Telefono: 0,
    Area: "",
    Puesto: "",
  });
  const [Err, setErr] = useState<Boolean>(false);
  const navigate = useNavigate();

  const changeText = (event: any) => {
    const { name, value } = event.target;
    const newValues = {
      ...UserState,
      [name]: value,
    };
    setUserState(newValues);
  };

  const btnSummit = () => {
    id ? EditUser(id) : CreateUser(); //Dependiendo de si existe un id creara o actualizara el usuario
  };

  const rdnNumber = () => {
    //Cree una funcion que crea numeros aleatorios en base a la fecha actual
    const fecha = new Date(); //No deberia haber numeros repetidos
    let rdn =
      fecha.getFullYear().toString() +
      fecha.getMonth().toString() +
      fecha.getDay().toString() +
      fecha.getHours().toString() +
      fecha.getMinutes().toString() +
      fecha.getSeconds().toString();
    return rdn;
  };
  const setNumber = () => {
    let tmp = rdnNumber();
    const stateNumber = {
      ...UserState,
      Numero: tmp,
    };
    setUserState(stateNumber);
  };
  const CreateUser = async () => {
    if (
      UserState.Area &&
      UserState.Nombre &&
      UserState.Telefono &&
      UserState.Mail &&
      UserState.Puesto
    ) {
      let resp = await PostUser(UserState);
      rdnNumber();
      resp.Created && navigate("/");
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const EditUser = async (id: any) => {
    let resp = await UpdateUser(id, UserState);
    resp.Created && navigate("/");
  };

  const GetUser = async () => {
    let resp = await GetUserId(id);
    setUserState(resp);
  };
  //Primero se llama a la funcion de comprobar seccion
  useEffect(() => {
    comprobarSesion();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-5">
        <div className="my-4">
          <h1 className=" text-center ">
            {id ? "Editar Usuario" : "Crear Usuario"}
          </h1>
        </div>

        <hr />

        <div className="fs-5 align-bottom text-end">
          <div className="form-group row mt-2 mx-4 justify-content-center ">
            <label htmlFor="name" className="col-sm-1 col-form-label">
              Nombre
            </label>
            <div className="col-sm-7">
              <input
                onChange={(e) => changeText(e)}
                value={id && UserState.Nombre.toString()}
                type="text"
                className="form-control"
                id="name"
                name="Nombre"
                placeholder="..."
              />
            </div>
          </div>

          <div className="form-group row mt-2 mx-4 justify-content-center ">
            <label htmlFor="name" className="col-sm-1 col-form-label">
              Email
            </label>
            <div className="col-sm-7">
              <input
                value={id && UserState.Mail.toString()}
                onChange={(e) => changeText(e)}
                type="text"
                name="Mail"
                className="form-control"
                id="mail"
                placeholder="...@correo.com"
              />
            </div>
          </div>

          <div className="form-group row mt-2 mx-4 justify-content-center ">
            <label htmlFor="name" className="col-sm-1 col-form-label">
              Telefono
            </label>
            <div className="col-sm-7">
              <input
                value={id && UserState.Telefono.toString()}
                onChange={(e) => changeText(e)}
                name="Telefono"
                type="number"
                className="form-control"
                id="Telefono"
                placeholder="000-000-0000"
              />
            </div>
          </div>

          <div className="form-group row mt-2 mx-4 justify-content-center ">
            <label htmlFor="name" className="col-sm-1 col-form-label">
              Area
            </label>
            <div className="col-sm-7">
              <input
                value={id && UserState.Area.toString()}
                onChange={(e) => changeText(e)}
                name="Area"
                type="text"
                className="form-control"
                id="Area"
                placeholder="....."
              />
            </div>

            <div className=" form-group row mt-2 mx-4 justify-content-center ">
              <label htmlFor="name" className="col-sm-1 col-form-label ">
                Puesto
              </label>
              <div className="col-sm-7">
                <input
                  value={id && UserState.Puesto.toString()}
                  onChange={(e) => changeText(e)}
                  name="Puesto"
                  type="text"
                  className="form-control"
                  id="Puesto"
                  placeholder="....."
                />
              </div>
            </div>
          </div>
          {Err && (
            <p className=" text-danger text-center mt-3 ">Faltan campos</p>
          )}

          <div className="botonesUser">
            <button onClick={() => btnSummit()} className="btn btn-primary ">
              Guardar
            </button>
            <button className="btn btn-danger">
              <Link to={"/"} className="text-white ">
                Cancelar
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
