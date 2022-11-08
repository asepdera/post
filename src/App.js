import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function App() {
  const [formData, setFormData] = useState();
  const navigate = useNavigate()
  const updateForm = e => {
    e.persist()
    setFormData(pervState => ({ ...pervState, [e.target.name]: e.target.value }))
  }
  const login = (e) => {
    e.preventDefault()
    axios.post(`https://puntenkangnitipheulanepiakhirnovemberwenya.greenscreative.com/api/login`, formData).then(res => {
      if (res.data.error) {
        console.log(res.data.error)
      } else {
        localStorage.setItem('login_token', res.data.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data.token))
      }
    })
    navigate('/posts')
  }
  return (
    <div className="App">
      <h1>Login</h1>
      <form method='POST'>
        <input type="email" placeholder='email' name='username' onKeyUp={e => updateForm(e)}/>
        <input type="password" placeholder='password' name='password' onKeyUp={e => updateForm(e)}/>
        <button id="submit" onClick={e => login(e)}>Login</button>
        <p>Belum punya akun? <a href="/register">Klik disini!</a></p>
      </form>
    </div>
  );
}

export default App;
