//funcion para guardar usuario en local storage
export const LocalStorageSetUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

//funcion para obtener usuario en local storage
export const LocalStorageGetUser = () => {
  let user = localStorage.getItem("user");
  return user ? user : null;
};

//funcion para borrar usuario del local storage
export const removeLocalStorage = () => {
  localStorage.removeItem("user");
};
