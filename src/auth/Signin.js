import React, {useState, setState} from 'react'
import { Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


import {authenticate, isAuth, usernameChecker, passwordChecker} from './helpers'
 

import Google from './Google'
import Facebook from './Facebook'

const Signin = ({history}) => {
    
    const [values, setValues] = useState({
        username:'',
        usernameLabel:'',
        password:'',
        passwordLabel:'',
        buttonText:'Submit',
        buttonState:true
    })

    const {username, usernameLabel, password,passwordLabel, buttonText,buttonState} = values
    
    const handleChangeUsername = (name) => (event) => {

      
        let userCheck = usernameChecker(event.target.value)
 
   
    
        let xe 
        if( userCheck.length>0){
            xe = true
        }else{
            xe = false
        }

        setValues({...values,usernameLabel:userCheck.toString(),buttonState:xe, [name]: event.target.value})

    }

    const handleChangePassword = (name) => (event) => {
    
        let userCheck = passwordChecker(event.target.value)
     

        let xe 
        if( userCheck.length>0){
            xe =true
        }else{
            xe =false
        }

        setValues({...values,passwordLabel:userCheck.toString(),buttonState:xe,[name]: event.target.value})
   
    }

    const informParent = response => {
        authenticate(response, () => {      
            if(isAuth() && isAuth().role === 'admin'){
                history.push('/admin')
            }else if(isAuth() && isAuth().role === 'moderator'){
                history.push('/moderator')
            }else{
                history.push('/private')
            }
            
        })
    }

    const clickSubmit = (event) => {

        event.preventDefault()

  
       if(username === '' || password === ''){
     
        }else{
    
            
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
            if(re.test(String(username).toLowerCase())){
                let email = username;
                setValues({...values,buttonText:<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>})
                signiner({email, password})
            
            }
            else{


                setValues({...values,buttonText:<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>})
                signiner({username, password})


            }
        }

        
    }

    const signiner = (obj) => {
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}/signin`,
            data: obj
        })
        .then( response => {
            console.log('SIGN IN SUCCESS', response)
                
                authenticate(response, () => {
             
                    setValues({...values,username:'',password:''})
                
                    console.log(`Hello ${response.data.user.username}! You are seccesefly loggioned.`)
                    
                    if(isAuth() && isAuth().role === 'admin'){
                        history.push('/admin')
                    }else if(isAuth() && isAuth().role === 'moderator'){
                        history.push('/moderator')
                    }else{
                        history.push('/private')
                    }
                    
                })
                toast.success(`Hello ${response.data.user.username}! You are seccesefly loggioned.`)
        })
        .catch(error => {
            console.log('SIGN IN error', error.response.data)
            setValues({...values, buttonText:'Submit'})
            toast.error(error.response.data.error)
        })
        
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Username or email</label>
                <input pattern=".{8,}" title="Username must be at least 8 characters long" onChange={handleChangeUsername('username')} value={username} name="username" type="text" className="form-control" required/>
                <label className="awrp"> {usernameLabel} </label>
            </div>

            <div className="form-group">
                <label className="text-muted"> Password </label>
                <input pattern=".{8,}" title="Username must be at least 8 characters long" onChange={handleChangePassword('password')} value={password} name="password" type="password" className="form-control" required/>
                <label className="awrp"> {passwordLabel} </label>
            </div>
            <div>
                <button className="btn btn-primary float-right ml-2" onClick={clickSubmit} disabled={buttonState}> {buttonText} </button>
                <Link to="/auth/password/forgot" className="btn btn-outline-danger float-right">
                    Forgot Password
            </Link>
            </div> 
            
        </form>
    )

    return(
        <Layout>
            <div className="mm0 p-5 mt-1 mb-1 colinz3"></div>
            <div className="mm0 p-5 mt-1 mb-1 colinz6 signin">
                <ToastContainer />
                {isAuth() ? <Redirect to='/' /> : null}
                <div className="formDiv">
                    <h1 className="p-5 text-center">Signin</h1>
                    <Google informParent={informParent}/>
                    <Facebook informParent={informParent}/>
                    
                    {signinForm()}
                </div>
              
                
            </div>
            <div className="mm0 p-5 mt-1 mb-1 colinz3"></div>

        </Layout>
    )
    
}


export default Signin