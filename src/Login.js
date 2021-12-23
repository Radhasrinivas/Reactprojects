import React from 'react';
import Profile from './Profile';
import './Login.css';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebase-config';
import { Link } from "react-router-dom";


function LogIn() {
    const[login,setLogin] = React.useState(false)
    const[userlogin,setUserlogin] = React.useState({email:'',password:''})

    if(login){
        console.log('logged in',login)
        return <Profile userr={userlogin.email}/>
    }
     
    const inputHandleer=(e)=>{
        e.preventDefault()
        const{name,value}=e.target
        setUserlogin({...userlogin,[name]:value})
        console.log(userlogin)
      }

      const loginPage = async (e) => {
        e.preventDefault()
        try{
            const userAuthh = await signInWithEmailAndPassword(auth,userlogin.email,userlogin.password)
            console.log('users here',userAuthh)
            setLogin(true)
             }catch (error){
               alert(error.message)
             }
      }

      const restPassword = async (e) => {
        e.preventDefault()
        try{
            const userAuthh = await sendPasswordResetEmail(auth,userlogin.email)
            alert("Reset password mail has been sent to your email");
             }catch (error){
              alert(error.message)
             }
      }
    
    return (
        <div>
            <form>
            <div className="login">
            <div className="form-group">
            <input className="form-control" type="email" name="email"   placeholder="Enter e-mail" onChange={inputHandleer}></input>
             </div>
             <div className="form-group">
             <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={inputHandleer}></input>
             </div>
             <div className="form-group">
             <button className="btn btn-success" type="submit" onClick={loginPage}>Submit</button>
             <button className="btn btn-link" type="submit" onClick={restPassword}>Forgot password</button>
             </div>
             <div className="form-group">
             <small>Don't have an account </small><Link to='/'>Sign Up</Link>
             </div>
             </div>
             </form>
        </div>
    )
}

export default LogIn
