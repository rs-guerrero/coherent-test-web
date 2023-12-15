"use client";
// components/LoginPage.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      userName: '',
        password: '',
      
      });

      const handleChange = (e) => {
        e.preventDefault();
        console.log("handleChange");
        const value = e.target.value;
        console.log(value);
        setFormData({ ...formData, [e.target.name]: value });
      };

      const login = async (e) => {   
        e.preventDefault();
        console.log("entro login");
        router.push("/hotel/reservationTable");

      };

      const handleLogin = async (e) => {    
        e.preventDefault();
        let token;
    
        await axios
          .post(
            "http://localhost:9089/coherent-hotel/api/v1/login",
            formData
          )
          .then((response) => {
            token = response.data;
    
            console.log("*************** token ***************");
            console.log(response);
            console.log(response.data);
            // Aquí puedes hacer lo que necesites con el token, como guardarlo en el estado de tu componente o en el localStorage
            router.push("/hotel/reservationTable");
          })
          .catch((error) => {
            // Manejo de errores
            // console.log("++++error");
            // console.log(error);
    
            Swal.fire({
              icon: "error",
              title: "Error en al iniciar sesión",
              text: "Error en al iniciar sesión, verifique sus credenciales",
            });
          });
       
      };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">User</label>
            <input
              type="text"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black-600">password</label>
            <input 
             type="password" 
             value={formData.password}
             onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          >
            Sign In
          </button>
        </form>
    
      </div>
    </div>
  );
};

export default LoginPage;
