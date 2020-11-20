import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from './helpers'

const ModeratorRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={
        props => isAuth() && isAuth().role === 'moderator' ? <Component {...props} /> : <Redirect to={{
            pathname: "/signin",
            state: {from:props.location}
        }} />
    }>

    </Route>
)

export default ModeratorRoute