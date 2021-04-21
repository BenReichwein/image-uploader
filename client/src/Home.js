import React, { Component } from 'react'
import axios from 'axios'
import api from './api'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            picturePreview: null,
            pictureAsFile: null,
        };
    }
    uploadPicture = (e) => {
        this.setState({
            /* contains the preview, if you want to show the picture to the user
               you can access it with this.state.picturePreview */
            picturePreview : URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile : e.target.files[0]
        })
    };

    setImageAction = () => {
        const formData = new FormData();
        formData.append(
            "file",
            this.state.pictureAsFile
        );
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/file',
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Accept: 'application/json',
            },
            withCredentials: true,
            mode: 'cors'
        })
        .then(res => {
        window.location.href = "/"
        })
        .catch(err => {
        console.log(err)
        })
    };

    componentDidMount = () => {
        api.get('file')
        .then(res => {
            console.log(res)
            this.setState({
                picturePreview : res.data,
            })
        })
        .catch(err => {
            console.log(err)
            alert(err.response.data)
        })
    }

    render() {
        return (
            <div>
                <img crossOrigin='anonymous' id={'img'} src={this.state.picturePreview} alt=""/>
                <input 
                type="file" 
                name="file" 
                onChange={this.uploadPicture} 
                multiple
                accept="image/png, image/jpeg"/>
                <button onClick={this.setImageAction}>Upload</button>
            </div>
        )
    }
}
