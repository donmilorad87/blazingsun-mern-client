import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'



const Facebook = ({informParent = f => f}) => {
    const responseFacebook = (response) =>{
        console.log(response)
       /* axios({
            method:'post',
            url:`${process.env.REACT_APP_FACEBOOK_APP_ID}/google-login`,
            data:{idToken: response.tokenId}
        })
        .then(response => {
            console.log('GOOGLE SIGN IN SUCCESS', response)
            //inform parent component
            informParent(response)
        })
        .catch(response =>{
            console.log('GOOGLE SIGNINM ERROR', response)
        })*/
    }

    return(
        <div className="pb-3">
            <FacebookLogin
            appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
            autoLoad={false}
            callback={responseFacebook}
            render={renderProps => (
                <button onClick={renderProps.onClick}>This is my custom FB button</button>
              )}
            />
        </div>
    )
}

export default Facebook
 

