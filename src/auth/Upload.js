import React, { useRef, useState } from 'react';
import axios from 'axios';


import Layout from '../core/Layout'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


const Upload = () => {    
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend

    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element    

    const [data, getFile] = useState({ name: "", path: "" });

    const [values, setValues] = useState({
        selectedFiles:[],
        buttonText:'Upload'
    })
    const {selectedFiles, buttonText} = values
    
    const fileSelectedHandler = (event) => {

        setProgess(0)
        const file = event.target.files; // accesing files
        
        
        setFile(file); 

        setValues({...values,selectedFiles:event.target.files})
        console.log(file);

    }
    const uploadFilesToGoogleDrive = () => {
        const formData = new FormData()
 
        for(var x = 0; x<file.length; x++) {
            formData.append('file', file[x])
        }
        console.log('formData', formData.file)

       axios({
        method:'POST',
        url:'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
        headers:{
            'Content-Type': 'multipart/related;boundary=9700883396bond',
            'Authorization':'Bearer '+ 'ya29.a0AfH6SMBHfoqMnd4HubJqb3D3TMuLJfGu4yr5Ttm4_yGwdMP5ffa0cGPyq5vNOFE1S9j0eCDi6S6oxG86U_9TMXinDjR25Z8yu7TL1z46NQk0s_hbnA7wyXFzJgE7NnoCqi6h44_s1ti63_zcsIMDieKRqIYbiND2quzF'

        },
        formData
        })
    .then(res => {
        console.log(res);
       //getFile({ name: res.data.name,
        //        path: `${process.env.REACT_APP_API_URL}/upload` + res.data.path
        //      })
    })
    .catch(err => console.log(err, 'ovde err'))
}    
    
   
    const uploadFile = () => {
        const formData = new FormData()
 
        for(var x = 0; x<file.length; x++) {
            formData.append('file', file[x])
        }
        console.log('formData', formData.file)
        

        console.log('from datassssss', formData.file, formData.files, formData)
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/upload`,
            formData
            })
        .then(res => {
            console.log(res);
           //getFile({ name: res.data.name,
            //        path: `${process.env.REACT_APP_API_URL}/upload` + res.data.path
            //      })
        })
        .catch(err => console.log(err, 'ovde err'))}    
        
    
    const uploadForm = () => (
        
            <div className="form-group">
                <label className="text-muted"> Username or email</label>
                <input type="file" multiple onChange={fileSelectedHandler} className="form-control" required/>
        
            <button className="btn btn-primary float-right ml-2" onClick={uploadFilesToGoogleDrive}> {buttonText} </button>
            
            </div> 
            
        
    )    

    return(
        <Layout>
          
            <div className="mm0 p-5 mt-1 mb-1 colinz6 signin">
                <ToastContainer />
       
                <div className="formDiv">
                    <h1 className="p-5 text-center">Signin</h1>
      
                    {uploadForm()}
                </div>
              
                
            </div>
          
    
        </Layout>
    )

}

export default Upload


