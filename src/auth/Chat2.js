import React, {Fragment,useState,useEffect} from 'react' 
import Layout from '../core/Layout'
import { isAuth } from '../auth/helpers'

const Chat2 = ({socket}) =>{

    const [socketConnected, setSocketConnected] = useState(true);
    
    const [messages, setMessage] = useState({
        username:'',
        message:'',
        buttonState:true
      })
    
      let helper = true
    
      const { username, buttonState, message} = messages
    
      

      useEffect(() => {
        checkUsername()
    }, []); 

    useEffect(() => {
        if (!socket) return;
        
        
        socket.on('connect', () => {
     
          setSocketConnected(socket.connected);
         
        });
        
        socket.on('disconnect', () => {
          setSocketConnected(socket.connected);
        });
  
        socket.on('message', (data) =>{
          console.log(data, 'rrrrddddddddddddddddd')
  
          let {message,username,time} = data
    
          chatTextField({message, username, time})
  
      
        })
      }, [socket])

    const checkUsername = () => {   
        if(localStorage.getItem("user")){
            setMessage({...messages, username:JSON.parse(localStorage.getItem("user")).username})
        }
    }


      // manage socket connection
      const handleSocketConnection = () => {
        if (socketConnected)
          socket.disconnect();
        else {
          socket.connect();
        }
      }

      const conectToGameSystem = () => {   

        console.log('nothing')
      }
    


      const sendMesage = () => {

        console.log('ovo je username', username, messages.username)

        
        let time = new Date().toLocaleString()

        console.log({message, username, time}, 'krrrmaaaa')

        socket.emit('sendMessage',{message, username, time}, (mmm) => {
          console.log('The message was delivered!', mmm)
        })
        
        chatTextField({message, username,time})

        console.log(message)
        helper = false
        setMessage({...messages, message:'', buttonState:helper})
        
        document.getElementById("message").focus(); 
      }

      const chatTextField = (m) => { 
        let x = document.createElement('div')
        x.textContent = m.message;
    let y = document.createElement('div')
        y.textContent = m.username;
         
    let t = document.createElement('div')
      t.textContent = m.time;

      let xx = document.createElement('div')
      xx.appendChild(t)
        xx.appendChild(y)
        xx.appendChild(x)
        document.getElementById('messagesField').appendChild(xx)
      }

      const handleMessage = (name) => (event) => {
    
       
      if(event.target.value){
       helper = false
  
      }
  
      setMessage({...messages, message:'', buttonState:helper, [name]: event.target.value})
      
      
      }


      const loginMust = () => {
        if (isAuth()){
          return (
            <Fragment>
                       
        
                         <input
                         type="button"
                         style={{ marginTop: 10 }}
                         value="Conect To Game System"
                         onClick={conectToGameSystem} />   
  
                         <div>
                           <div id="messagesField">
                             <label className="text-muted"> Messages </label>
                           </div> 
                           <div className="form-group">
                             <label className="text-muted"> Message field </label>
                             <input onChange={handleMessage('message')} id="message" value={message} type="text" className="form-control"/>
                           </div>
  
                           <input
                           type="button"
                           style={{ marginTop: 10 }}
                           value="Send Mesage"
                           id="textField"
                           onClick={sendMesage}
                           disabled={buttonState}
                           /> 
                         </div>  
  
                         <div>
                           <b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}
                         </div>
                         <input
                         type="button"
                         style={{ marginTop: 10 }}
                         value={socketConnected ? 'Disconnect' : 'Connect'}
                         onClick={handleSocketConnection} />
                       </Fragment>
            )
        }else{
          return (
            
              <Fragment>
                <div id="loginMust"><h1>You must be loggedin to enter</h1></div>
              </Fragment>
          )
        }
      }
  

  return(



    <Layout>

              {loginMust()}     

                   
     </Layout>
          

    
 
  )
}

export default React.memo(Chat2)
