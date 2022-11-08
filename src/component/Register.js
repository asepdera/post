import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState();
    const navigate = useNavigate()
    const updateForm = e => {
        e.persist()
        setFormData(pervState => ({ ...pervState, [e.target.name]: e.target.value }))
    }
    const register = (e) => {
        e.preventDefault()
        axios.post(`https://puntenkangnitipheulanepiakhirnovemberwenya.greenscreative.com/api/register`, formData).then(res => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                navigate('/')
            }
        })
    }
    return (
        <form method="POST">
            <input type="text" placeholder='name' name='name' onKeyUp={e => updateForm(e)}/>
            <input type="text" placeholder='username' name='username' onKeyUp={e => updateForm(e)}/>
            <input type="email" placeholder='email' name='email' onKeyUp={e => updateForm(e)}/>
            <input type="text" placeholder='password' name='password' onKeyUp={e => updateForm(e)} />
            <button id="submit" onClick={e => register(e)}>Register</button>
            <p>Sudah punya akun? <a href="/">Login disini!</a></p>
        </form>
    )
}

export default Register