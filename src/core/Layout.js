import React, {Fragment,useEffect} from 'react'
import {Link, withRouter } from 'react-router-dom'
import { isAuth , signout} from '../auth/helpers'



const Layout = ({children, match, history}) =>{


    const isActive = path => {
        if(match.path === path){
            return {fontWeight: '900', color:'#fff', textDecoration:'underline', pointerEvents:'none'}
        }else{
            return {color:'#fff'}
        }
    }
    
    

    const nav = () => (
        <Fragment>
        <ul className="glMenu">
        <li className="navItem">
            <Link  to="/" style={isActive('/')}>Home</Link>
        </li>
        <li className="navItem">
            <Link  to="/users" style={isActive('/users')}>Users</Link>
        </li>
        <li className="navItem">
            <Link  to="/upload" style={isActive('/upload')}>Upload</Link>
        </li>
        {isAuth() && (     
              
        <li className="navItem">
            <Link  to="/games" style={isActive('/games')}>Games</Link>
        </li>
        )}
    </ul>
        
            <ul className="userMenu">
            {!isAuth() && (
                        <Fragment>
                            <li className="nav-item float-left mr-2">
                                <Link  to="/signup" style={isActive('/signup')}>Signup</Link>
                            </li>
                            <li className="nav-item float-left">
                                <Link  to="/signin" style={isActive('/signin')}> Signin</Link>
                            </li>
                        </Fragment>
                        
                )}
                {isAuth() && isAuth().role === 'admin' && (
                   
                        <li className="nav-item text-light float-left mr-2">
                          
                                <Link  style={isActive('/admin')} to="/admin">
                                    
                                    {isAuth().username}
                                
                                </Link>
                           
                        </li>
                )}   
                {isAuth() && isAuth().role === 'subscriber' && (
                   
                   <li className="nav-item text-light float-left mr-2">
                  
                           <Link  style={isActive('/private')} to="/private">
                               
                               {isAuth().username}
                           
                           </Link>
                      
                   </li>
                )}
                {isAuth() && isAuth().role === 'moderator' && (
                   
                   <li className="nav-item text-light float-left mr-2">
                  
                           <Link  style={isActive('/moderator')} to="/moderator">
                               
                               {isAuth().username}
                           
                           </Link>
                      
                   </li>
                )}        
                {isAuth() && (        
                        <li className="nav-item text-light float-left">
                            <span  style={{cursor:'pointer'}}
                                onClick={() => {
                                    signout(()=>{
                                        history.push('/')
                                    })
                                }}>
                                Signout
                            </span>
                        </li>
                        
                    
                )}

            </ul>
            </Fragment>
    )



    return (
        <Fragment>
            
            
            
         
            
            {nav()}
            <menu></menu>
            <div className="mainContainer">
                {children}
            </div>
            <aside></aside>      
                       
                     
                    
              
            <footer className="footer bg-dark text-white-50">
        <div className="container text-center">
        <small className="mdSmall"> © Blazing Sun 2020. All rights reserved.</small>
        </div>
        </footer>
        </Fragment>
    )
}

export default withRouter(Layout)