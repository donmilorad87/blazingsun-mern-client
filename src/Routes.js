import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch , Route} from 'react-router-dom'

import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import EditEmail from './auth/EditEmail'


import Private from './core/Private'

import Admin from './core/Admin'
import Moderator from './core/Moderator'

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import ModeratorRoute from './auth/ModeratorRoute'

import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
import Users from './auth/Users'
import Upload from './auth/Upload'






import io from "socket.io-client";


import Chat from './auth/Chat'
import Chat2 from './auth/Chat2'


const Routes = () => {
  console.log('ruta')
  const [socket, setSocket] = useState(null);

  

  
  useEffect(() => {
    setSocket(io('http://localhost:8000'));


  }, []); 

 

    useEffect(() => {
      if (!socket) return;
      
      
  

      socket.on('countUpdated', (count) =>{
 
        //socket.emit('increment')
        
        })
      
      socket.on('wMessage', (message,conectedUsers) =>{
        console.log(message)
        console.log(conectedUsers)
      })
  
   
      socket.on('reconnect', (attemptNumber) => {
        console.log('reccc'); 
    
      });
          
      }, [socket])





        
    return(
        <BrowserRouter>
            <Switch> 

                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/users" exact component={Users} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/" exact component={Activate} />
                <Route path="/edit-email/" exact component={EditEmail} />
                <Route path="/upload/" exact component={Upload} />

                <PrivateRoute path="/private" exact component={Private}/>
  
                <Route path="/games/bingo" render={   
                  ({history}) => {
                 
      
                    return (
                     
                            <Chat2 socket={socket}/>
                              
                    )
                  }
                } />

                <Route path="/games/domine" render={  
                  ({history}) => {
                    
                    return (
                 
                       
                           <Chat2 socket={socket}/>
                             
                    )
                  }
                } />


                <Route path="/games" render={
                  ({history}) => {
             
                    

      
                    return (

                      
               
                      <Chat socket={socket} history={history}/>
              
                      
        
                    )
                  }
                } />

                <ModeratorRoute path="/moderator" exact component={Moderator} />
                
                <AdminRoute path="/admin" exact component={Admin} />

                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                
                
            </Switch> 
        </BrowserRouter>
    )
}

export default Routes