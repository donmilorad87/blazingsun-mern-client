import React, {useState } from 'react'
import Layout from '../core/Layout'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import axios from 'axios'


const Activate = ({history,location}) => {
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
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}/account-activation`,
            data:{code}
        })
        .then( response => {
            console.log('Acount Activation Success', response)
            setValues({...values})
            
            history.push('/signin')

            toast.success(response.data.message)
        })
        .catch(error => {
            console.log('Acount Activation Error', error.response.data)
            toast.error(error.response.data.error)
        })
    }

    const actvationLink = () => (
      
        <form>
              <div className="text-center">
            <h1 className="p-5 text-center">Hey, {username}. Ready to activate youre account? </h1>
           
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
                
                {actvationLink()}   
                </div>      
            </div>  
            <div className="mm0 p-5 mt-1 mb-1 colinz3"></div>      
        </Layout>
    )
    
}


export default Activate
