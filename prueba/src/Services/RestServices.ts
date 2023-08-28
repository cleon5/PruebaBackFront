import axios from "axios";
import { User } from "../Models/User";

const urlBase = "http://localhost:4000/user"; //Cambiar en caso de que se modifique la url
                                              //Esta es mi url https://proyectoshm.com/clever.leon/

//Busca un usuario en base al id
export const GetUserId = async (id: any) => {
  let resp = await axios.get(`${urlBase}/${id}`);
  return resp.data;
};

//Pide todos los usuarios
export const GetAll = async () => {
  let resp = await axios.get(urlBase);
  return resp.data;
};

//Crea un usuario
export const PostUser = async (data: User) => {
  try {
    let resp = await axios.post(urlBase, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//Borra el usuario correspondiente al id
export const DeleteUser = async (id: String) => {
  try {
    let resp = await axios.delete(`${urlBase}/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//Actualiza un usuario
export const UpdateUser = async (id: String, data: User) => {
  let resp = await axios.put(`${urlBase}/${id}`, data);
  return resp.data;
};

//Funcion que manda el usuario y contrasena para hacer login
export const iniciarSesion = async(data:any)=>{
    try {
        let resp = await axios.post(`${urlBase}/sesion`, data);
        return resp.data;
      } catch (error) {
        console.log(error);
      }
}