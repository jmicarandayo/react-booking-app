import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './login.css'

const Login = () => {
    const navigate = useNavigate()
    const [ credentials, setCredentials ] = useState({
        username: undefined,
        password: undefined
    })
    const {loading, error, dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate('/')
        } catch(err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }
  return (
    <div className='login-container'>
        <div className="login-wrapper">
            <h1>Login</h1>
            <input type="text" placeholder='username' id='username' onChange={handleChange}/>
            <input type="password" placeholder='password' id='password' onChange={handleChange}/>
            <button disabled={loading} onClick={handleClick}>Login</button>
            {error && <span className='login-error'>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login