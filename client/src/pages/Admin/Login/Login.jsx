import React from 'react'
import { useState } from 'react'
import login from '../../../admin/login'
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [send, setSend] = useState('')

    const Login = async (e) => {
      const verify = await login(email, password)
      setSend(verify.data.message || 'Emailingizga link yuborildi!')
      window.location = '/'
    }

  return (
    <div>
      {
        !send ? <><input type="email"  name='email' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password"  name='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={(e) => {
          Login()
        }}>Send mail</button></> : <h2>{send}</h2>
      }
        
    </div>
  )
}

export default Login