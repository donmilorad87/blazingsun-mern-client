import React, {useState,useEffect} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import jwt from 'jsonwebtoken'

 
const Reset = ({match}) => {
    
    const [values, setValues] = useState({
        username:'',
        token:'',
        newPassword:'',
        confirmNewPassword:'',
        buttonText:'Reset password'
    })

    useEffect(() =>{
        let token = match.params.token

        let {username} = jwt.decode(token)

        if(token){
            setValues({...values, username, token})
        }

    }, [])

    const {username, token, newPassword, confirmNewPassword, buttonText} = values

     const handleChange = (name) => (event) => {

        console.log(event.target.value)

        setValues({...values, [name]: event.target.value})

    }

    const clickSubmit = (event) => {

        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/reset-password`,
            data: {newPassword, confirmNewPassword, resetPasswordLink: token}
        })
        .then( response => {
            console.log('Reset PASSWORD SUCCESS', response)

            toast.success(response.data.message)
            setValues({...values, buttonText:'Done'})

        })
        .catch(error => {
            console.log('Reset PASSWORD error', error.response.data)
            setValues({...values, buttonText:'Reset password'})
            toast.error(error.response.data.error)
        })
    }



    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> New Password</label>
                <input onChange={handleChange('newPassword')} value={newPassword} type="password" className="form-control" placeholder="Type new password" required/>
            </div>
            <div className="form-group">
                <label className="text-muted"> Confirm New Password</label>
                <input onChange={handleChange('confirmNewPassword')} value={confirmNewPassword} type="password" className="form-control" placeholder="Confirm new password" required/>
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
                {JSON.stringify({newPassword, confirmNewPassword})}
                <h1 className="p-5 text-center">Hello {username}, type your new password </h1>
                {resetPasswordForm()}   
            </div> 
            <div className="mm0 mt-4 mb-4 colinz3"></div>          
        </Layout>
    )
    
}


export default Reset