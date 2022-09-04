import React from 'react'
import { useState } from 'react'
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    

  return (
    <div>
        <input type="email"  name='email' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password"  name='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button>Send mail</button>
    </div>
  )
}

export default Login