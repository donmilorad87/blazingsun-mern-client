import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'



const Google = ({informParent = f => f}) => {
    const responseGoogle = (response) =>{
        console.log(response)
        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/google-login`,
            data:{idToken: response.tokenId}
        })
        .then(response => {
            console.log('GOOGLE SIGN IN SUCCESS', response)
            //inform parent component
            informParent(response)
        })
        .catch(response =>{
            console.log('GOOGLE SIGNINM ERROR', response)
        })
    }

    return(
        <div className="pb-3">
            <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google
 

