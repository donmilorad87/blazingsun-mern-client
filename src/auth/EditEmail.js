import React, {useState } from 'react'
import Layout from '../core/Layout'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import axios from 'axios'
import { isAuth } from './helpers'

const EditEmail = ({history,location}) => {
    console.log(location)
    const [values, setValues] = useState({
        username:location.state.username,
        code:''
    })

    const {username, code} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
        console.log(values)
    }


    const clickSubmit = (event) => {

        event.preventDefault()

        if(code){
            setValues({...values})
        }
        if(isAuth()){
            axios({
                method:'POST',
                url: `${process.env.REACT_APP_API_URL}/email-change-verification`,
                data:{code}
            })
            .then( response => {
                console.log('Email Change Success', response)
                setValues({...values})
                toast.success(response.data.message)
                history.push('/private')
            })
            .catch(error => {
                console.log('Email Change Error', error.response.data)
                toast.error(error.response.data.message)
            })
        }
        else {
            setValues({...values})
            toast.error('You need to be signed in with your account to change your email. Email not updated.')
        }
    }

    const emailChangeCode = () => (
      
        <form>
              <div className="text-center">
            <h1 className="p-5 text-center">Hey, {username}. Ready to change your email account? </h1>
           
        </div>
            <div className="form-group">
                <label className="text-muted"> Code </label>
                <input onChange={handleChange('code')} value={code} type="password" className="form-control" required />
                
                <button className="btn btn-outline-primary" onClick={clickSubmit}> Activate Account</button>
           
            </div>

        </form>
    )

    return(
        <Layout>
             <div className="mm0 p-5 mt-1 mb-1 colinz3"></div>
            <div className="mm0 p-5 mt-1 mb-1 colinz6 signup">
                <ToastContainer />
                <div className="formDiv">
                
                {emailChangeCode()}   
                </div>      
            </div>  
            <div className="mm0 p-5 mt-1 mb-1 colinz3"></div>      
        </Layout>
    )
    
}


export default EditEmail