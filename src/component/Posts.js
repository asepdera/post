import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Posts() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate()
    const data = () => {
        axios.get(`https://puntenkangnitipheulanepiakhirnovemberwenya.greenscreative.com/api/post`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login_token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                setPost(res.data.data)
            }
        })
    }
    useEffect(() => {
        let ignore = false
        if(!ignore) data()
        return () => {
            ignore = true
        };
    }, []);
    const hapus = (id) => {
        let konfirmasi = window.confirm('apakah yakin hapus post ini?')
        if (!konfirmasi) return false
        axios.delete(`http://puntenkangnitipheulanepiakhirnovemberwenya.greenscreative.com/api/post/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login_token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                alert('post berhasil dihapus')
                data()
            }
        })
    }
    const edit = (id) => {
        navigate(`/edit-post/${id}`)
    }
    return (
        <>
            <h1 className="text-center">POST</h1>
            <div className="row p-5">{
                post.map((v, i) => {
                    return (
                        <div key={i} className="card col-3">
                            <div className="card-header">
                                <img src={v.image} alt="" height="300px"/>
                            </div>
                            <div className="card-body">
                                <h1>{v.title}</h1>
                                <p>{ v.content}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-info mx-2" onClick={e=> edit(v.id)}>Edit</button>
                                <button className="btn btn-danger mx-2" onClick={e=> hapus(v.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }</div>
        </>
    )
}

export default Posts