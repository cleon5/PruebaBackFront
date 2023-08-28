import { Router } from "express";
import { db } from "../firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const router = Router();

//Funcion para obtener todos los usuarios
router.get("/user", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, `users`));
    let tmpCom = [];
    querySnapshot.forEach((doc) => {
      tmpCom.push(doc.data());
    });

    return res.status(200).json(tmpCom);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Funcion para Guardar un usuario
router.post("/user", async (req, res) => {
  try {
    const { Numero, Nombre, Mail, Telefono, Area, Puesto } = req.body;
    await setDoc(doc(db, `users`, Numero.toString()), {
      Numero: Numero,
      Nombre: Nombre,
      Mail: Mail,
      Telefono: Telefono,
      Area: Area,
      Puesto: Puesto,
    });
    return res.status(201).json({ Created: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Funcion para obtener actualizar un
router.put("/user/:id", async (req, res) => {
  try {
    const { Numero, Nombre, Mail, Telefono, Area, Puesto } = req.body;
    const { id } = req.params;
    updateDoc(doc(db, "users", id.toString()), {
      Nombre: Nombre,
      Mail: Mail,
      Telefono: Telefono,
      Area: Area,
      Puesto: Puesto,
    });
    return res.status(201).json({ Created: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Funcion para borrar un usuario
router.delete("/user/:id", async (req, res) => {
  try {
    let x = await deleteDoc(doc(db, "users", req.params.id));
    return res.status(200).json({ Deleted: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Funcion para obtener un solo usuario
router.get("/user/:id", async (req, res) => {
  try {
    const docSnap = await getDoc(doc(db, "users", req.params.id));
    return res.status(201).json(docSnap.data());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Funcion para comprobar que los datos de inicio de sesion sean correctos
router.post("/user/sesion", async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await getDoc(doc(db, "users", usuario));
    if (user.data().password == password) {
      return res.status(200).json(user.data());
    } else {
      return res.status(200).json({ Correct: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
