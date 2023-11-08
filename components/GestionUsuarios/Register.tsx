import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import './register.css'
import Swal from 'sweetalert2'
import '../app.css'
export const Register = () => {

    const navigate = useNavigate()
    const findedUsers = localStorage.getItem("users");
    const [input, setInput] = useState({
        name : "",
        lastname : "",
        id : "",
        email : "",
        password : "",
        information : false,
    })
    
    const isPasswordValid = (password:string) => {
        if (password.length < 6) {
            return false
        }
        if (!/[A-Z]/.test(password)) {
            return false
        }
        if (!/[a-z]/.test(password)) {
            return false
        }
        if (!/\d/.test(password)) {
            return false
        }
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            return false
        }
        return true
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if (
            input.name.trim() === "" ||
            input.lastname.trim() === "" ||
            input.id.trim() === "" ||
            input.email.trim() === "" ||
            input.password.trim() === ""
        ) {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, completa todos los campos obligatorios',
                icon: 'error',
                confirmButtonText: 'Ok',
                timer: 5000,
                position: 'top',
                background: 'black',
                color: 'white'
            })
        } else if (!isPasswordValid(input.password)) {
            Swal.fire({
                title: 'Contraseña',
                text: 'La contraseña debe tener al menos 6 caracteres, incluir mayúsculas, minúsculas y caracteres especiales',
                icon: 'info',
                confirmButtonText: 'Ok',
                timer: 6000,
                position: 'top',
                background: 'black',
                color: 'white'
            })
        } else {
            const existingUsers = findedUsers ? JSON.parse(findedUsers) : [];
            const isIdExist = existingUsers.some(user => user.id === input.id)
            const isEmailExist = existingUsers.some(user => user.email === input.email)
            if (isIdExist) {
                Swal.fire({
                    title: 'Error!',
                    text: 'El ID ya está registrado',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    timer: 5000,
                    position: 'top',
                    background: 'black',
                    color: 'white'
                })
            } else if (isEmailExist) {
                Swal.fire({
                    title: 'Error!',
                    text: 'El correo electrónico ya está registrado. Por favor, utiliza otro',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    timer: 6000,
                    position: 'top',
                    background: 'black',
                    color: 'white'
                })
            } else {
                Swal.fire({
                    title: 'Exito!',
                    text: 'Se ha registrado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    timer: 5000,
                    position: 'top',
                    background: 'black',
                    color: 'white'
                })
                existingUsers.push(input)
                localStorage.setItem("users", JSON.stringify(existingUsers))
                navigate('/login')
            }
        }
    }

  return (
    <section className="flex flex-col items-center gap-4">
        <h1>Crea tu perfil</h1>
        <form className="flex justify-center flex-col items-center gap-4 w-96" onSubmit={handleSubmit}>
            <div className="w-96 flex gap-4 flex-wrap">
                <input className="flex-1 pl-4" type="text" placeholder="Nombre*" name="name" value={input.name} onChange={(e) => setInput({...input,[e.target.name] : e.target.value,})} />
                <input className="flex-1 pl-4" type="text" placeholder="Apellidos*" name="lastname" value={input.lastname} onChange={(e) => setInput({...input,[e.target.name] : e.target.value,})} />
            </div>
            <input className="border border-gray-300" type="number" placeholder="Identificación*" name="id" value={input.id} onChange={(e) => setInput({...input, [e.target.name] : e.target.value,})} />
            <input className="border border-gray-300" type="email" placeholder="Correo electrónico*" name="email" value={input.email} onChange={(e) => setInput({...input, [e.target.name] : e.target.value,})} />
            <input className="border border-gray-300" type="password" placeholder="Contraseña*" name="password" value={input.password} onChange={(e) => setInput({...input,[e.target.name] : e.target.value,})} />
            <div className="my-10">
                <input className="absolute opacity-0 m-10" type="checkbox" id="information" name="information" checked={input.information} onChange={(e) => setInput({...input,[e.target.name] : e.target.checked,})} />
                <label className="text-xs pr-28 text-gray-72 relative pl-8" htmlFor="information">Me gustaria recibir información, promociones y novedades <br /> relacionadas con la plataforma</label>
            </div>
            <button className="mb-4">Registrarme</button>
        </form>
        <div className="redirect-login">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login">Ingresar!</Link>
        </div>
    </section>
  )
}