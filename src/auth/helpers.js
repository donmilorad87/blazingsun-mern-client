import cookie from 'js-cookie'

// set in cookie

export const setCookie = (key, value) => {
    if(typeof window !== 'undefined'){
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// remove from cookie

export const removeCookie = (key) => {
    if(typeof window !== 'undefined'){
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get from cookie such as stored token
// will be useful when we need to make request to server with token

export const getCookie = (key) => {
    if(typeof window !== 'undefined'){
        return cookie.get(key)
    }
}

// set in localstorage

export const setLocalStorage = (key, value) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// remove from localstorage

export const removeLocalStorage = (key) => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

// access user info from localstorage

export const isAuth = () => {
    if(typeof window !== 'undefined'){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

// logout

export const signout = next => {
    removeCookie('token')
    if(getCookie('G_AUTHUSER_H')){
        removeCookie('G_AUTHUSER_H')
    }
    if(getCookie('G_ENABLED_IDPS')){
        removeCookie('G_ENABLED_IDPS')
    }
    removeLocalStorage('user')
    next()
}

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORADGE helpers', response)
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}

export const usernameChecker = (x) => {
    let array = []

    
    if(/[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(x)){
        array.push('Username must not contain any special caracters (. and - and _ and @ are allowed)') 
    }
    if(countSpecialCharacters(x)){
        array.push('There is maximum 4 special caracters allowed')
    }
    if(x.length<8){
        array.push('Username must be at least 8 characters long')
    }
    
    if(x.replace(/[^0-9]/g,"").length > 6 ){
        array.push('There is maximum 6 numbers in username allowed')
    }
   

    return array;
    
}

const countSpecialCharacters= (s) => {
    let a
    if(s !== undefined){
        a = s.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
    }
   
    if(a !== undefined){
        if(a !== null && a.length>4){
            return true
        }
    }   
   
}

export const passwordChecker = (x) => {
    let array = []

    if(x.length<8){
        array.push('Pasword must be at least 8 characters long is required')
    }
    if(!/\d/.test(x)){
        array.push('Password must have at least 1 number')
    }
    if(!x.match(/[a-z]/)){
        array.push('Password must have at least 1 lower case character')
    }
    if(!x.match(/[A-Z]/)){
        array.push('Password must have at least 1 upper case character')
    }
    if(!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(x)){
        array.push('Password must have at least 1 special character')
    }
    
    
    


    return array;
    
}

export const emailChecker = (x) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    let array = []
    
    if(x.length<1){
        array.push('Email must be prvided')
    }
    if(!re.test(String(x).toLowerCase())){
        array.push('Email must be in e-mail format')
    }
    
  
    
    return array
    
    
}

export const confirmPasswordChecker = (x,y) => {
    let array = []

    if(x !== y ){
        array.push('Passwords do not match')
    }
    if(x === '' ){
        array.push('Confirm password is required')
    }

    return array
    
}


export const iAgreeChecker = (x) => {
    let array = []
   
    if(!x){
        array.push('You must agree Therms and Conditions')
    }

    console.log(array)
    return array
    
}