import React, { useEffect, useState, Fragment} from 'react';
import io from "socket.io-client";

import { isAuth , signout} from '../auth/helpers'
import { getCookie,setCookie } from '../auth/helpers'

const UserInfo = (user,socket) => {
 



console.log('ovo je user: ', user)

  let helper

  //const [socketConnected, setSocketConnected] = useState(false)
  //const [dt, setDt] = useState('')

 

  // establish socket connection

  // subscribe to the socket event


 
    if (!socket) return;
   
    console.log(socket.id)

    if (user === null) {
      return;
    }
 
  socket.on('connected', (attemptNumber) => {
    console.log('reccc'); 

  });
  socket.on('disconnect', () => {
    socket.removeAllListeners();
 });
  socket.on('kek', (attemptNumber) => {
   
    console.log(attemptNumber); 

  }); 

    socket.on('countUpdated', (count) =>{
      
      console.log('count has been updated',count)
      //socket.emit('increment')
    
    })
    socket.on('disconnect', () => {
      socket.emit('dece', helper);
    });
    
    socket.on('wMessage', (message,conectedUsers) =>{
      console.log(message)
      
      console.log(conectedUsers)
    })

    socket.on('reconnect', (attemptNumber) => {
      console.log('reccc'); 
  
    });
     
     socket.on('socketId', (data) =>{
      if(!getCookie('socketId')){
          setCookie('socketId', data)
      } 
      socket.emit('increment',data)
      helper = data
    })




  // manage socket connection
  const conectToGameSystem = () => {
    
    if(isAuth()){ 
      socket.emit('userInfo', user)
    }
    else{
      console.log('not authenticated')
    }
  }

  const updateCounter2 = () => {
    if(isAuth()){ 
    socket.emit('tete', 'tet')
    }
    else{
      console.log('not authenticated')
    }
  }

  return (
    <Fragment>
      
                       
                       
    
   


        <input
        type="button"
        style={{ marginTop: 10 }}
        value="Conect To Game System"
        onClick={conectToGameSystem} /> 

        <input
        type="button"
        style={{ marginTop: 10 }}
        value='tet'
        onClick={updateCounter2} /> 

    
    

    </Fragment>               
 
  )
  
}

export default UserInfo