import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreatePost() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: ''
    });
    const navigate = useNavigate()
    const updateForm = e => {
        e.persist()
        setFormData(pervState => ({ ...pervState, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        setFormData(pervState => ({ ...pervState, image: selectedFile }))
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
    const tambah = () => {
        const dataForm = new FormData()
        dataForm.append('image', formData.image)
        dataForm.append('title', formData.title)
        dataForm.append('content', formData.content)
        axios.post(`http://jcc.brandingyou.id/api/post/`,dataForm, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login_token')}`,
                'Accept': 'application/json',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Accept",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                navigate('/posts')
            }
        })
    }

    return (
        <form method="POST" className="col-12 p-5">
            <h1>Tambah Post</h1>
            <div className="form-group mb-3">
                <label className="form-label">Judul</label>
                <input type="text" className='form-control' name="title" onChange={e => updateForm(e)}/>
            </div>
            <div className="form-group mb-3">
                <label className="form-label">Content</label>
                <textarea cols="30" rows="10" name="content" className="form-control" onChange={e => updateForm(e)}></textarea>
            </div>
            <div className="form-group mb-3">
                <label className="form-label d-block">Gambar</label>
                <img src={preview} alt="gambar" width="300px" height="200px" className="my-3"/>
                <input type="file" className='form-control' name="image" onChange={onSelectFile} />
            </div>
            <div className="float-right">
                <button type='button' className="btn btn-info mx-2" onClick={e => tambah()}>Tambah</button>
                <button type='button' className="btn btn-danger mx-2" onClick={e => navigate('/posts')}>Back</button>
            </div>
        </form>
    )
}

export default CreatePost