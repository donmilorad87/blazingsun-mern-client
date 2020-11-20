import React, {useState} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'


import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'



 
const Users = () => {
    
    const [values, setValues] = useState({
        users:'',
        buttonText:'Get users'
    })

    const {users, buttonText} = values

    const clickSubmit = (event) => {

        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method:'GET',
            url: `http://192.168.100.57:8089/users`
        })
        .then( response => {
            console.log('GET USERS SUCCESS', response)

            toast.success(response.data.message)
            setValues({...values, buttonText:'Done'})

        })
        .catch(error => {
            console.log('GET USERS error', error.response.data)
            setValues({...values, buttonText:'Users not get'})
            toast.error(error.response.data.error)
        })
    }



    const getUsersForm = () => (
        <form>           
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
                {JSON.stringify({users})}
                {getUsersForm()}   
         
            </div> 
            <div className="mm0 mt-4 mb-4 colinz3"></div>          
        </Layout>
    )
    
}

export default Users