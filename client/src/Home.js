import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            picturePreview: null,
            pictureAsFile: null,
            previousFile: null
        };
    }
    // handling change when image is added to input
    uploadPicture = (e) => {
        this.setState({
            /* contains the preview, if you want to show the picture to the user
               you can access it with this.state.picturePreview */
            picturePreview : URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile : e.target.files[0]
        })
    };
    // Uploading image to database
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
    // Getting the previous file and converting it from raw data bytes to blob
    toDataURL = (url, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    // When page loads get previous image
    componentDidMount = () => {
        this.toDataURL("http://localhost:8080/api/file", dataUrl => {
            this.setState({
                previousFile: dataUrl
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Previous Image</h2>
                    <img crossOrigin='anonymous' id={'img'} src={this.state.previousFile} alt=""/>
                </div>
                <div>
                    <img crossOrigin='anonymous' id={'img'} src={this.state.picturePreview} alt=""/>
                </div>
                <div>
                    <input 
                    type="file" 
                    name="file" 
                    onChange={this.uploadPicture} 
                    multiple
                    accept="image/png, image/jpeg"/>
                    <button onClick={this.setImageAction}>Upload</button>
                </div>
            </div>
        )
    }
}
