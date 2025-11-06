import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
    const [input, setinput] = useState("");
    const [correct, setcorrect] = useState(null);
    const navigate = useNavigate();

    const CheckNumber = () => {
        if(input ==="123"){
        setcorrect(true);
       navigate("/admin");
        } 
    }
  return (
    <div>
      <h1>Please Enter The Login Code of Hotel</h1>
      <input type="text" 
      value={input}
      onChange={(e) => setinput(e.target.value)}
      placeholder='Enter Login Number'
      />

      <button  onClick={CheckNumber}>
        Enter To the Admin Page
      </button>
      {correct === false && (
          <p className="mt-4 text-center text-red-500 font-semibold animate-shake">
            Tuzya number tak na re bho.
          </p>
        )}
    </div>
  )
}

export default Login
