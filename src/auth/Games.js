import React,{useEffect} from 'react';
import Layout from '../core/Layout'
import GameSystem from '../core/GameSystem'


  
const Games = () => {
 
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  

  if(!JSON.parse(localStorage.getItem("user"))){
    helper2 = `gost${1+(Math.random()*(99999999-1))}`
  }
  else{
    helper2 = JSON.parse(localStorage.getItem("user")).username
  }

  const [messages, setMessage] = useState({
    username:helper2,
    message:'',
    buttonState:true
  })

  const [rooms, setRoom] = useState({
    room:'',
    game:''
  })

  const { username, buttonState, message} = messages
  const { room, game} = rooms

  useEffect(() => {
    setSocket(io('http://localhost:8000'));

    setMessage({...messages, username:helper2})
  }, []); 

 
  useEffect(() => {
    if (!socket) return;
    
    
    socket.on('connect', () => {
  
      setSocketConnected(socket.connected);
      
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });
    socket.on('countUpdated', (count) =>{

      //socket.emit('increment')
      
      })
    
    socket.on('wMessage', (message,conectedUsers) =>{
      console.log(message)
      console.log(conectedUsers)
    })

    socket.on('message', (data) =>{
        console.log(data, 'rrrrddddddddddddddddd')

        let {message,username,time} = data
  
        chatTextField({message, username, time})

    
      })

    socket.on('reconnect', (attemptNumber) => {
      console.log('reccc'); 
  
    });
        
    }, [socket])  
  
    const handleSocketConnection = () => {
      if (socketConnected)
        socket.disconnect();
      else {
        socket.connect();
      }
    }

    const conectToGameSystem = () => {   
      user = localStorage.getItem("user")
      console.log('nothing')
    }
  
    const checkUsername = () => {   
  
      socket.emit('join',{username, room}); 

    }

    const sendMesage = () => {

      console.log('ovo je username', username, messages.username)

      helper = true
      let time = new Date().toLocaleString()

      console.log({message, username, time}, 'krrrmaaaa')

      socket.emit('sendMessage',{message, username, time}, (mmm) => {
        console.log('The message was delivered!', mmm)
      })
      
      chatTextField({message, username,time})

      console.log(message)

  

      document.getElementById("message").focus(); 
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
  
      setMessage({...messages, buttonState:helper, [name]: event.target.value})
      
      
      }
      
      const handleInput = (name) => (event) => {
        setRoom({...rooms, [name]: event.target.value})
      }
  
  
      const setGame = (e) => {
        setRoom({...rooms, game: e.target.value})   
      }
          
      const loginMustRoom = () => {
        if (isAuth()){
          checkUsername()
          return (
          <Fragment>
            <div className="form-group">
          <label className="text-muted"> Enter room name </label>
          <input onChange={handleInput('room')} id="room" value={room} type="text" className="form-control"/>
        </div>
  
        <div>
          <label>Chose game</label>
            <input
            type="button"
            style={{ marginTop: 10 }}
            value="domine"
            onClick={setGame} />
  
            <input
            type="button"
            style={{ marginTop: 10 }}
            value="bingo"
            onClick={setGame} />
            
            {game}                                                                                   
        </div>  
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
      const loginMust = () => {
        if (isAuth()){
          return (
            <Fragment>
                       
                       <h1> {game} </h1>
                       <h3> {room}</h3>   
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
  
  
      const startRoom =  () => {
                      
  
        if(game !== '' && room !== ''){
          let kimo = loginMust()
          console.log(kimo)
          history.push(`/games/${game}`)
          
       
          ReactDOM.render(kimo, document.getElementsByClassName('mainContainer')[0]);
        }
    
      } 
  return (
    <Layout>
     
                       
                       
 
   

    {GameSystem()}



       </Layout>              
 
  )
}

export default Games