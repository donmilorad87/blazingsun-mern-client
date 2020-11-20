import React, { useEffect, useState, Fragment} from 'react';


import { isAuth , signout} from '../auth/helpers'

import { getCookie,setCookie } from '../auth/helpers'

const CreateRoom = (socket) => {
 
  

  //const [socketConnected, setSocketConnected] = useState(false)
  //const [dt, setDt] = useState('')

  useEffect(() => {
    
    if (!socket) return;

   console.log(socket)

   socket.on('reconnect', (attemptNumber) => {
    console.log('reccc'); 

  });
   
   socket.on('socketId', (data) =>{
    if(!getCookie('socketId')){
        setCookie('socketId', data)
    } 
    
  })
  

  }, [socket])

  // establish socket connection

  

  // manage socket connection
  const updateCounter = () => {
    if(isAuth()){ 
    socket.emit('tete', 'tet')
    }
    else{
      console.log('not authenticated')
    }
  }

  return (
    <Fragment>
      
                       
                       
    <div>
   
   

        <input
        type="button"
        style={{ marginTop: 10 }}
        value='tet'
        onClick={updateCounter} /> 

        
    </div>
    

    </Fragment>               
 
  )
  
}

export default CreateRoom