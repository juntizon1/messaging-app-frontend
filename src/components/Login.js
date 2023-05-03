import React from 'react'
import{Button} from '@material-ui/core'
import './Login.css'
import {auth,provider} from './firebase'
import{actionTypes} from './reducer'
import{useStateValue} from './StateProvider'

const Login = () => {
    const[{},dispatch] = useStateValue()
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user
                })
            })
            .catch(error => alert(error.message))

    }
    return(
        <div className = "login">
            <div className ="login_container">
                <img src = "logo512.png" alt="whatsapp" />
                <div className = "login_text">
                    <h1>Sign in to Messaging Appaokmdaskmdasdk</h1>
                </div>
                <Button onClick = {signIn} > Sign in with Google</Button>
            </div>
        </div>
    )
}
export default Login