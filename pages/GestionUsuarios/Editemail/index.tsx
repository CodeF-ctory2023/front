
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';

export default function EditEmail() {

  const router = useRouter();
  const loggedInUserId = localStorage.getItem("loggedin");
  const findedUsers = localStorage.getItem("users");
  const users = findedUsers ? JSON.parse(findedUsers) : [] ;
  const loggedInUser = users.find((user:any) => user.id === loggedInUserId);

  const [userData, setUserData] = useState(
    loggedInUser || {
      email: "",
    }
  );

  const [error, setError] = useState("");

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    
    const existingUsers = findedUsers ? JSON.parse(findedUsers) : [];
    const isEmailExist = existingUsers.some(
      (user:any) => user.email === userData.email
    );

    if (userData.email !== "") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/;

      if (!userData.email.match(emailRegex)) {
        setError("El formato del correo electrónico no es válido");
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }
    }

    if (isEmailExist && loggedInUser && loggedInUser.email !== userData.email) {
      setError("El correo ya esta asociado a otra cuenta");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else if (!userData.email) {
      setError("El campo no puede estar vacio");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      const updatedUsers = users.map((user:any) => {
        if (user.id === loggedInUserId) {
          return { ...user, email: userData.email };
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      Swal.fire({
        text: "Los cambios se han realizado con éxito",
        icon: "success",
        confirmButtonText: "Ok",
        timer: 5000,
        position: "top",
        background: "black",
        color: "white",
      });
    router.push('/GestionUsuarios/Home')
    }
  };

  return (
    <section className="flex flex-col text-left relative md:text-center">
      <div className="ml-4 mb-8 lg:ml-0 md:ml-0 sm:ml-0 ml-4">
        <div className="text-left">
          <h1 className="mb-4 font-bold">Correo electrónico</h1>
          <p className="text-sm mb-4">Personaliza tu experiencia</p>
        </div>
        <div>
          <input
            className="w-full p-2 mb-4 border border-solid border-gray-300 rounded-md"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          {error && <div className="text-red-500 absolute text-sm whitespace-nowrap">{error}</div>}
        </div>
      </div>
      <button onClick={handleSave} className="rounded-lg border border-transparent px-4 py-1.5 bg-blue-500 text-white cursor-pointer transition duration-250 w-108% ml-4 text-center mt-3 hover:border-white hover:bg-blue-900 hover:text-white">
        Actualizar
      </button>
    </section>
  );
}
