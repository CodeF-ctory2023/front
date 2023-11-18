 
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import Link from 'next/link'
const Login = () => {

  const router = useRouter();
  const findedUsers = localStorage.getItem("users");  
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e:any) => {
    e.preventDefault();

    const registeredUsers = findedUsers ? JSON.parse(findedUsers) : [];
    const user = registeredUsers.find(
      (user:any) => user.email === input.email && user.password === input.password
    );

    if (user) {
      Swal.fire({
        title: "Exito!",
        html: `¡Bienvenid@ <strong>${user.name}</strong>. Inició sesión correctamente`,
        icon: "success",
        confirmButtonText: "Ok",
        timer: 7000,
        position: "top",
        background: "black",
        color: "white",
      });
      localStorage.setItem("loggedin", user.id);
      router.push('/GestionUsuarios');
    } else {
      Swal.fire({
        title: "Error!",
        text: "Correo o contraseña incorrecta",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 5000,
        position: "top",
        background: "black",
        color: "white",
      });
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 h-screen justify-center">
      <h1 className="text-xl font-bold">Iniciar sesión</h1>
      <form className="form-login  flex flex-col items-center gap-4" onSubmit={handleLogin}>
        <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md block shadow-md"
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={input.email}
          onChange={(e) =>
            setInput({
              ...input,
              [e.target.name]: e.target.value,
            })
          }
        />
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded-md shadow-md"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={input.password}
          onChange={(e) =>
            setInput({
              ...input,
              [e.target.name]: e.target.value,
            })
          }
        />
        <Link href="/GestionUsuarios/Home" className="text-white font-bold bg-blue-600 px-5 py-2 rounded">Ingresar</Link>
      </form>
      <div className="mt-neg-6">
        <p className="mb-2">¿No tienes cuenta?</p>
        <Link className="text-white font-bold bg-blue-600 px-5 py-2 rounded" href="/GestionUsuarios/Register">Registrarse!</Link>
      </div>
    </section>
  );
};


export default Login;
