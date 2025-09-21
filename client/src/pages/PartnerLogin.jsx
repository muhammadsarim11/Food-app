import axios from 'axios';
import React, { useState } from 'react';

const PartnerLogin = () => {
   
   const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
   

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email,password)
const response = await axios.post("http://localhost:3000/api/auth/login/partner ",{
    email,
    password
},{
    withCredentials:true
}
);

console.log(response);
setemail("")
setpassword("")


    }

   return (
   <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-10 flex flex-col gap-8">
      <h2 className="text-4xl font-extrabold text-white text-center tracking-wide mb-2">Partner Login</h2>
      <form
       onSubmit={handleSubmit}
      className="flex flex-col gap-6">
       
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition text-lg shadow"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
   )
}

export default PartnerLogin;