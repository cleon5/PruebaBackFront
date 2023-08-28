import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { User } from "../Models/User";
import { DeleteUser, GetAll } from "../Services/RestServices";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorageGetUser } from "../Services/localStorage";

const Home = () => {
  const [Users, setUsers] = useState<Array<User>>([]);
  const navigate = useNavigate();

  const comprobarSesion = async() =>{ //funcion para guardar usuario en local storage
    let user:any =  LocalStorageGetUser()
    user  ? GetUsers() :  navigate("/login");
  }

  const GetUsers = async () => {
    let users: Array<User> = await GetAll();
    setUsers(users);
  };

  const deleteUser = async (id: String) => {
    let resp = await DeleteUser(id);
    resp.Deleted && GetUsers();
  };

  useEffect(() => {
    comprobarSesion();
  }, []);

  return (
    <>
      <Navbar />

      <div>
        <h1 className="text-center m-5">Lista de Empleados</h1>
        <hr className="Divisor" style={{ width: "80%" }} />
      </div>

      <div className="m-3 px-5 py-2">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">No. Empleado</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Telefono</th>
              <th scope="col">Area</th>
              <th scope="col">Puesto</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {
            Users?.map((user: User, key: any) => (
              <tr key={key} className="align-middle">
                <th scope="row">{user.Numero.toString()}</th>
                <td>{user.Nombre}</td>
                <td>{user.Mail}</td>
                <td>{user.Telefono.toString()}</td>
                <td>{user.Area}</td>
                <td>{user.Puesto}</td>
                <td>
                  <div>
                    <button className="btn btn-primary m-1">
                      <Link
                        className=" text-white "
                        to={`/user/${user.Numero}`}
                      >
                        Editar
                      </Link>
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteUser(user.Numero.toString())}
                      className="btn btn-danger m-1"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
