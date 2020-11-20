import React, {useState} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


 
const Forgot = ({history}) => {
    
    const [values, setValues] = useState({
        email:'',
        buttonText:'Request password reset link'
    })
    const {email, buttonText} = values
    const handleChange = (name) => (event) => {

        console.log(event.target.value)

        setValues({...values, [name]: event.target.value})

    }

    const clickSubmit = (event) => {

        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/forgot-password`,
            data: {email}
        })
        .then( response => {
            console.log('Forgot PASSWORD SUCCESS', response)

            toast.success(response.data.message)
            setValues({...values, buttonText:'Requested'})

        })
        .catch(error => {
            console.log('Forgot PASSWORD error', error.response.data)
            setValues({...values, buttonText:'Request password reset link'})
            toast.error(error.response.data.error)
        })
    }



    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange('email')} value={email} type="text" className="form-control" />
            </div>

        
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}> {buttonText} </button>
            </div> 
        </form>
    )

    return(
        <Layout>
            <div className="mm0 mt-4 mb-4 colinz3"></div>
            <div className="mm0 mt-4 mb-4 colinz6 signup">
                <ToastContainer />
                <h1 className="p-4 text-center">Forgot Password</h1>
                {forgotPasswordForm()}   
            </div>      
            <div className="mm0 mt-4 mb-4 colinz3"></div>     
        </Layout>
    )
    
}


export default Forgot