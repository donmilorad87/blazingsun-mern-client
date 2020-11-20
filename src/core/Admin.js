import React,  {useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import axios from 'axios'
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers'



const Admin = ({history}) => {
    
    const [values, setValues] = useState({
        role:'',
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        activePassword:'',
        newPassword:'',
        confirmNewPassword:'',
        buttonText:'Submit',
        buttonText1:'Submit'
    })

    const token = getCookie('token')

    useEffect(()=>{
        loadProfile()
    }, [])

    const loadProfile = () =>{
        axios({
            method:'GET',
            url: `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Private profile update', response )
            const {role, username, email} = response.data
            setValues({...values, role, username, email})
        })
        .catch(error => {
            console.log('Private profile update error', error.response.data)

            if(error.response.status === 401){
                signout(() => {
                   history.push('/')
                })

            }
        })

    }

    const {role, username, email,password, confirmPassword, activePassword, newPassword, confirmNewPassword, buttonText,buttonText1} = values
    const handleChange = (name) => (event) => {

        console.log(event.target.value)

        setValues({...values, [name]: event.target.value})

    }
    const clickSubmit0 = event =>{
        event.preventDefault()
    }
    const clickSubmit1 = event =>{
        event.preventDefault()
        setValues({...values, username, buttonText: 'Submitting'})

        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/user/update/username`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data:{username}
        })
        .then( response => {
            console.log('Username Update SUCCESS', response)

            updateUser(response, () => {
                setValues({...values, buttonText:'Submitted'})
                toast.success('Profile updated successfully')
            })

            
        })
        .catch(error => {
            console.log('Username Update error', error.response.data)
            setValues({...values, buttonText:'Submit'})
            toast.error(error.response.data.error)
        }).finally(
            setValues({ buttonText:'Submit'})
        )
    }

    const clickSubmit2 = (event) => {
        event.preventDefault()
        setValues({...values, email, buttonText: 'Email Submited'})

        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/user/update/email`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data:{email}
        })
        .then( response => {
            console.log('Email change verification send on requested email. SUCCESS', response)

            toast.success('Email change verification send on requested email.')
            
            setValues({...values, buttonText: 'Submitting'})
            
        })
        .catch(error => {
            console.log('Email change verification send error', error.response.data)
            setValues({...values, buttonText:'Submit'})
            toast.error(error.response.data.error)
        }).finally(
            setValues({ buttonText:'Submit'})
        )

    }
    const clickSubmit3 = (event) => {

        event.preventDefault()
        setValues({...values, activePassword, newPassword, confirmNewPassword, buttonText: 'Submitting'})

        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/user/update/password`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data:{activePassword, newPassword, confirmNewPassword}
        })
        .then( response => {
            console.log('Private Password Update SUCCESS', response)
            setValues({...values, buttonText:'Submit'})
            

           /* let contentPassings = document.getElementsByClassName('passChange')[0].getElementsByClassName('formInput')[0]
                contentPassings.innerHTML = ''
            
            let h2 = document.createElement('h2')
                h2.innerHTML='Password Updated'
            let p = document.createElement('p')
                p.innerHTML = response.data.message

                contentPassings.append(h2)
                contentPassings.append(p)*/
            toast.success(response.data.message)
        })
        .catch(error => {
            console.log('Private Profile Update error', error)
            setValues({...values, buttonText:'Submit'})
            toast.error(error.response.data.error)
        }).finally(
            setValues({ buttonText:'Submit'})
        )

    

    }

    const clickSubmit = (event) => {
        event.preventDefault()
      
        setValues({...values,  buttonText1: <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>})

        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API_URL}/admin/update`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data:{username, email, password, confirmPassword}
        })
        .then( response => {
            console.log('Private Profile Update SUCCESS', response)

            updateUser(response, () => {
              
                    setValues({...values, buttonText1: 'Submitted'})
               
            
                toast.success('Profile updated successfully')
            })

            
        })
        .catch(error => {
            console.log('Private Profile Update error', error.response.data)
            setValues({...values, buttonText1:'Submit'})
            toast.error(error.response.data.error)
        }).finally(
            setValues({...values, buttonText1:'Submit'})
        )

    

    }
    const onOff = (event) => {
       
            console.log('clickeddd', event.target)
            event.currentTarget.parentElement.parentElement.parentElement.classList.toggle("pen")
            event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('formInput')[0].classList.toggle("noHeightOpa")
            event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('formInput')[0].classList.toggle("d-none")
            event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('formInput')[1].classList.toggle("noHeightOpa")
            event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('middleAll')[1].classList.toggle("noHeightOpa") 
            event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('formInput')[1].classList.toggle("d-none")
            event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('middleAll')[1].classList.toggle("d-none") 
        
             
    }
    const onOffButton = (num) => {
        num = 'customSwitches' + num
        return(
    <div className="pl-0 form-check middleAll">
        <div className='custom-control custom-switch'>
            <input
            type='checkbox'
            className='custom-control-input customSwitches'
            id={num}
            readOnly
            onClick={onOff}
            />
            <label className='custom-control-label' htmlFor={num}></label>
        </div>
    </div> 
                        
        )}
    

    const updateForm = () => (
        <form>
             <div>

    



  </div>
             <div className="d-flex p-2 form-group border rounded pen">
                 {onOffButton(1)}
                 <div className="formInput">
                    <div><h3 className="pTextEdit">Edit rlole</h3></div>
                </div> 
                    <div className="formInput noHeightOpa d-none">
                    <label className="text-muted"> Role </label>
                    <input defaultValue={role} type="text" className="form-control"/>
                    <label className="text-muted invisible" id="role">  </label>
                </div>
                <div className="middleAll noHeightOpa d-none">
                    <button className="btn btn-primary" onClick={clickSubmit0}> {buttonText} </button>
                </div>
            </div>
          

            <div className="d-flex p-2 form-group border rounded pen">
                
                {onOffButton(2)}
                <div className="formInput">
                    <div><h3 className="pTextEdit">Edit Username</h3></div>
                </div> 
                <div className="formInput noHeightOpa d-none">
                    <label className="text-muted"> Username </label>
                    <input onChange={handleChange('username')} value={username} type="text" className="form-control" />
                    <label className="text-muted invisible" id="username">  </label>
                </div>
                <div className="middleAll noHeightOpa d-none">
                    <button className="btn btn-primary" onClick={clickSubmit1}> {buttonText} </button>
                </div>
            </div>

            <div className="d-flex p-2 form-group border rounded pen">
                {onOffButton(3)}
                <div className="formInput">
                    <div><h3 className="pTextEdit">Edit Email</h3></div>
                </div>  
                <div className="formInput noHeightOpa d-none">
                <label className="text-muted"> Email </label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
                <label className="text-muted invisible" id="email">  </label>
                </div>
                <div className="middleAll noHeightOpa d-none">
                    <button className="btn btn-primary" onClick={clickSubmit2}> {buttonText} </button>
                </div>
            </div>

            <div className="d-flex p-2 form-group border rounded passChange pen" >
                {onOffButton(4)}
                <div className="formInput">

                    <div><h3 className="pTextEdit">Edit Password</h3></div>
                </div>   
                <div className="formInput noHeightOpa d-none">
                    <div>
                        <label className="text-muted"> Active Password </label>
                        <input onChange={handleChange('activePassword')} value={activePassword} type="password" className="form-control" />
                        <label className="text-muted invisible" id="activePassword">  </label>
                    </div>
                    <div className="d-flex" >
                        <div className="newPass">
                            <label className="text-muted"> New Password </label>
                            <input onChange={handleChange('newPassword')} value={newPassword} type="password" className="form-control" />
                            <label className="text-muted invisible" id="newPassword">  </label>
                        </div>

                        <div className="newPassConfirm">
                            <label className="text-muted"> Confirm New Password </label>
                            <input onChange={handleChange('confirmNewPassword')} value={confirmNewPassword} type="password" className="form-control" />
                            <label className="text-muted invisible" id="confirmNewPassword">  </label>
                        </div>
                        <div className="middleAll noHeightOpa d-none">
                            <button className="btn btn-primary" onClick={clickSubmit3}> {buttonText} </button>
                        </div>
                    </div>
                </div>    
            </div> 
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}> {buttonText1} </button>
            </div> 
        </form>
    )
    
    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                
                <h1 className="pt-5 text-center">Admin</h1>
                <p className="lead text-center">Profil update</p>
                <p className="text-break">{JSON.stringify({username, email, activePassword, newPassword, confirmNewPassword})}</p>
                {updateForm()}   
            </div>           
        </Layout>
    )
    
}


export default Admin