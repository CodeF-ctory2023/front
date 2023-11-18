
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
export default function EditName() {
  
  const router = useRouter();
  const findedUsers = localStorage.getItem("users");
  const loggedInUserId = localStorage.getItem("loggedin");
  const users = findedUsers ? JSON.parse(findedUsers) : [];
  const loggedInUser = users.find((user:any) => user.id === loggedInUserId);

  const [userData, setUserData] = useState(
    loggedInUser || {
      name: "",
      lastname: "",
    }
  );

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    const alphabeticRegex = /^[A-Za-z\s]*$/;
    if (!value.match(alphabeticRegex)) {
      return;
    }
    setUserData({ ...userData, [name]: value });
  };

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const handleSave = () => {
    if (!userData.name && !userData.lastname) {
      setError("El campo no puede estar vacio");
      setError2("El campo no puede estar vacio");
      setTimeout(() => {
        setError("");
      }, 5000);
      setTimeout(() => {
        setError2("");
      }, 5000);
      return;
    } else if (!userData.name) {
      setError("El campo no puede estar vacio");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    } else if (!userData.lastname) {
      setError2("El campo no puede estar vacio");
      setTimeout(() => {
        setError2("");
      }, 5000);
      return;
    }

    const updatedUsers = users.map((user:any) => {
      if (user.id === loggedInUserId) {
        return userData;
      }
      return user;
    });
    Swal.fire({
      text: "Los cambios se han realizado con éxito",
      icon: "success",
      confirmButtonText: "Ok",
      timer: 5000,
      position: "top",
      background: "black",
      color: "white",
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    router.push('/GestionUsuarios/Home')
  };

  return (
    <section className="flex flex-col text-left relative md:text-center">
      <div className="ml-4 mb-8 lg:ml-0 md:ml-0 sm:ml-0 ml-4">
        <div className="text-left">
          <h1 className="font-bold">Nombre</h1>
          <p className="text-sm mb-4">Con este nombre te veran las personas</p>
        </div>
        <div>
          <div className="text-left"> 
            <h4 className="mb-4 font-bold">Nombres</h4>
            <input
              className="w-full p-2 mb-4 border border-solid border-gray-300 rounded-md"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            {error && <div className="error">{error}</div>}
          </div>
          <div className="text-left">
            <h4 className="mb-4 font-bold">Apellidos</h4>
            <input
              className="w-full p-2 mb-4 border border-solid border-gray-300 rounded-md"
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleInputChange}
            />
            {error2 && <div className="text-red-500 absolute text-sm whitespace-nowrap">{error2}</div>}
          </div>
        </div>
      </div>
      <button onClick={handleSave} className="btn-save-name rounded-lg border border-transparent px-4 py-1.5 bg-blue-500 text-white cursor-pointer transition duration-250 w-108% ml-4 text-center mt-3 hover:border-white hover:bg-blue-900 hover:text-white">
        Actualizar
      </button>
    </section>
  );
}
