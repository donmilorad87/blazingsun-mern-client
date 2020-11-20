import React, {useState,Component} from 'react'


import Layout from '../core/Layout'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import { usernameChecker, passwordChecker,emailChecker,confirmPasswordChecker, iAgreeChecker} from './helpers'



  
const Signup = ({history}) => {
    
    const [values, setValues] = useState({
        username:'',
        usernameLabel:'',
        email:'',
        emailLabel:'',
        password:'asdqwE123~~',
        passowrdLabel:'',
        confirmPassword:'asdqwE123~~',
        confirmPasswordLabel:'',
        iAgreeCheckbox:'',
        iAgreeCheckboxLabel:'',
        buttonText:'Submit',
        buttonState:true
    })
    
    const {username,usernameLabel, email,emailLabel, password,passowrdLabel, confirmPassword,confirmPasswordLabel,iAgreeCheckbox, iAgreeCheckboxLabel, buttonText,buttonState} = values


    const handleChangeUsername = (name) => (event) => {

        console.log(event.target)

        
        let userCheck = usernameChecker(event.target.value)
   
      

      
        let xe 
        let xe2 = []

        if(!document.getElementById('chBox').checked){
            xe2.push('Therms and coditions must be aggreed.')
        }

        
        if( userCheck.length>0 || xe2.length>0 || userCheck.length>0 && xe2.length>0){
            xe =true
            document.getElementById('chBox').checked = false
            
        }else{
            console.log('ovdesmo')
           
  
                xe =false
                console.log('ovdesmo2')
            
        }

        setValues({...values,usernameLabel:userCheck.toString(), iAgreeCheckboxLabel:xe2.toString(), buttonState:xe,[name]: event.target.value})
    

    }

    const handleChangeEmail = (name) => (event) => {
        let userCheck = emailChecker(event.target.value)
        let xe 
        let xe2 = []

        if(!document.getElementById('chBox').checked){
            xe2.push('Therms and coditions must be aggreed.')
        }

        
        if( userCheck.length>0 || xe2.length>0 || userCheck.length>0 && xe2.length>0){
            xe =true
            document.getElementById('chBox').checked = false
            
        }else{
            console.log('ovdesmo')
           
         
                xe =false
                console.log('ovdesmo2')
            
        }

        setValues({...values,emailLabel:userCheck.toString(), iAgreeCheckboxLabel:xe2.toString(), buttonState:xe,[name]: event.target.value})
       
  
    }

    const handleChangePassword = (name) => (event) => {

        console.log(event.target)

        
        let userCheck = passwordChecker(event.target.value)
   
   
      

        let xe 
        let xe2 = []

        if(!document.getElementById('chBox').checked){
            xe2.push('Therms and coditions must be aggreed.')
        }

        if( userCheck.length>0 || xe2.length>0 || userCheck.length>0 && xe2.length>0){
            xe =true
            document.getElementById('chBox').checked = false
            
        }else{
            console.log('ovdesmo')
            
            
                xe =false
                console.log('ovdesmo2')
            
        }

        setValues({...values,passowrdLabel:userCheck, iAgreeCheckboxLabel:xe2, buttonState:xe,[name]: event.target.value})
        
     
  
    }
    const handleChangeConfirmPassword = (name) => (event) => {
        console.log(event.target)

        
        let userCheck = confirmPasswordChecker(event.target.value,password)
   
      
      
        let xe 
        let xe2 = []

        if(!document.getElementById('chBox').checked){
            xe2.push('Therms and coditions must be aggreed.')
        }

        if( userCheck.length>0 || xe2.length>0 || userCheck.length>0 && xe2.length>0){
            xe =true
            document.getElementById('chBox').checked = false
            
        }else{
            console.log('ovdesmo')
            
     
               xe =false
          
        }
      

        

        setValues({...values,confirmPasswordLabel:userCheck, iAgreeCheckboxLabel:xe2.toString(), buttonState:xe,[name]: event.target.value})
        
       
    }
   
    const handleChangeIAgree = (name) => (event) => {

   
      
        let xe
        let xe1= [] 
        let xe2= [] 
        let xe3= [] 
        let xe4= [] 
        let xe5 = []

        let xee = []
       
        if(!username|| usernameChecker(username).length>0){
                       
            if(usernameChecker(username).length>0){
                xe1.push(usernameChecker(username).toString())
                xee.push(usernameChecker(username).toString())
            }else{
                xe1.push('Username is required.')
                xee.push('Username is required.')
            }
        }
        if(!email || emailChecker(email).length>0){
            if(emailChecker(email).length>0){
                xe2.push(emailChecker(email).toString())
                xee.push(emailChecker(email).toString())
            }else{
                xe2.push('Email is required.')
                xee.push('Email is required.')
            }
        }
        if(!password || passwordChecker(password).length>0){
            if(passwordChecker(password).length>0){
                xe3.push(passwordChecker(password).toString())
                xee.push(passwordChecker(password).toString())
            }else{
                xe3.push('Password is required.')
                xee.push('Password is required.')
            }
        }
        if(!confirmPassword || confirmPasswordChecker(confirmPassword, password)){
            if(confirmPasswordChecker(confirmPassword, password).length>0){
                xe4.push(confirmPasswordChecker(confirmPassword, password).toString())
                xee.push(confirmPasswordChecker(confirmPassword, password).toString())
            }
        }

        
        if(!document.getElementById('chBox').checked){
            
            xe5.push('Therms and coditions must be aggreed.')
            xee.push('Therms and coditions must be aggreed.')
        }
        
        if( xee.length>0){
            xe =true
            document.getElementById('chBox').checked = false
        }else{
            
           
                xe =false
                console.log('ovdesmo2')
            
            
        }

        setValues({...values, 
            usernameLabel:xe1.toString(),
            emailLabel:xe2.toString() , 
            passowrdLabel:xe3.toString() ,
            confirmPasswordLabel:xe4.toString(),
            iAgreeCheckboxLabel:xe5.toString(), 
            buttonState:xe,
            [name]: event.target.value})


  
  
    }

    

    const clickSubmit = (event) => {

        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})

        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}/singup`,
            data:{username, email, password, confirmPassword}
        })
        .then( response => {
            console.log('SINGUP SUCCESS', response)
            setValues({...values, buttonText:'Submitted'})
            

            history.push({
                pathname:'/auth/activate/',
                state: {
                    username: username
                }
            })
            toast.success(response.data.message)

        })
        .catch(error => {
            console.log('SIGN UP error', error.response)
            setValues({...values, buttonText:'Submit'})
            toast.error(error.response.data.error)
        })

    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Username </label>
                <input pattern=".{8,}" title="Username must be at least 8 characters long" onChange={handleChangeUsername('username')} id="chUsername" value={username} type="text" className="form-control" required/>
                <label className=" awrp"> {usernameLabel} </label>
            </div>

            <div className="form-group">
                <label className="text-muted"> Email </label>
                <input onChange={handleChangeEmail('email')} title="Username must be at least 8 characters long" id="chEmail" value={email} type="email" className="form-control" required/>
                <label className=" awrp"> {emailLabel} </label>
            </div>

            <div className="form-group">
                <label className="text-muted"> Password </label>
                <input pattern=".{8,}" title="Password must be at least 8 characters long" onChange={handleChangePassword('password')} id="chPassword" value={password} type="password" className="form-control" required />
                <label className=" awrp"> {passowrdLabel} </label>
           
            </div>
            
            <div className="form-group">
                <label className="text-muted"> Confirm Password </label>
                <input pattern=".{8,}" title="Confirm password must be at least 8 characters long" onChange={handleChangeConfirmPassword('confirmPassword')} id="chConfirmPassword" value={confirmPassword} type="password" className="form-control" required/>
              
                <label className=" awrp">  { confirmPasswordLabel}  </label>
            </div>
       
         
            <div className="form-group">
                <label className="text-muted float-left"> I Agree. Terms and Conditions </label>
                <input required onChange={handleChangeIAgree('iAgreeCheckbox')} type="checkbox" id="chBox" className="form-control float-left" style={{
                    width: '38px',
                    margin:'-8px 8px 0px 8px'
                    }}/>
                <label className="float-left awrp"> {iAgreeCheckboxLabel}</label>
            </div>
         
            <div className="pt-4 p-0" style={{width:'100%', float:'left'}}>
                <button className="btn btn-primary " onClick={clickSubmit} disabled={buttonState}> {buttonText} </button>
            </div> 
        </form>
    )

    
    return(
        <Layout>
            <div className="mm0 p-5 mt-1 mb-1 colinz3">


            </div>
            <div className="mm0 p-5 mt-1 mb-1 colinz6 signup">
                <ToastContainer />
                <div className="formDiv">
                    <h1 className="p-4 text-center">Signup</h1>
                    {signupForm()}
                </div>
            </div>
            <div className="mm0 p-5 mt-1 mb-1 colinz3"></div>           
        </Layout>
    )
    
}


export default Signup