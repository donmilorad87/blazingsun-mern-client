import React, {Fragment} from 'react'

import logo from './blazingSun.gif'


const Logo = () =>{


    

   

    const logoLayout = () => (

        <img src={logo} alt="logo" />
        
              )   
    return (
        <Fragment>
             <nav className="bg-primary logo">
            
            
           {logoLayout()}
            
            
          
            </nav>  
         
 
        </Fragment>
    )
}

export default Logo