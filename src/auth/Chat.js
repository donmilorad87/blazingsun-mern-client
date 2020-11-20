import React, {Fragment,useState,useEffect} from 'react' 
import Layout from '../core/Layout'
import { isAuth } from '../auth/helpers'

const Chat = ({socket,history}) =>{

    console.log('sss',socket, history)

    const [rooms, setRoom] = useState({
        room:'',
        game:'',
        username:''
    })
    

    const { room, game, username } = rooms

    useEffect(() => {
        checkUsername()
    }, []); 
    
    const handleInput = (name) => (event) => {
        setRoom({...rooms, [name]: event.target.value})
    }

    const setGame = (e) => {
        setRoom({...rooms, game: e.target.value})   
    }

    const checkUsername = () => {   
        if(localStorage.getItem("user")){
            setRoom({...rooms, username:JSON.parse(localStorage.getItem("user")).username})
        }
    }

    const startRoom = () => {            

        if(game !== '' && room !== ''){
          
            history.push(`/games/${game}`)
       
        }
    
    }

    const loginMustRoom = () => {
      if (isAuth()){

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
           
            <input
            type="button"
            style={{ marginTop: 10 }}
            value="Create room"
            onClick={startRoom} />   
            
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
 
            {loginMustRoom()}

    </Layout>
    
 
  )
}

export default React.memo(Chat)
