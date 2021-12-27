import React from 'react';
import './SignUp.css';
import { Link } from "react-router-dom";
import Profile from './Profile';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {auth, db } from './firebase-config';
import { doc, setDoc, getDoc } from "firebase/firestore/lite";

function SignUp() {
    const[user,setUser] = React.useState({fName:'',lName:'',email:'',password:''})
    const[submit,setSubmit] = React.useState(false)
    const[currentuser, setcurrentuser] = React.useState()
    
      onAuthStateChanged(auth, (user) => {
      console.log('user1',user)
      setcurrentuser(user)
    })

    if(submit){
      return <Profile currentuser={currentuser}/>
    }
const inputHandler=(e)=>{
  e.preventDefault()
  const{name,value}=e.target
  setUser({...user,[name]:value})
}

  const register = async (e)=>{
    e.preventDefault()
    console.log("entered register")
  try{
  const currentUser = await createUserWithEmailAndPassword(auth,user.email,user.password);
  console.log('user registered')
  await setDoc(doc(db, "users", currentUser.user.uid),{
      fname: user.fName,
      lname: user.lName,
      email: user.email,
       })
       setSubmit(true)
}catch(error){
    alert(error);
}
  }
    return (
        <div className="content">
          <form onSubmit={register}>
          <div className="Sign-up-form">
          <div className="form-group">
          <input className="form-control" type="text" name="fName" placeholder="Enter your name" onChange={inputHandler} required></input>
          </div>
          <div className="form-group">
          <input className="form-control" type="text" name="lName" placeholder="Last Name" onChange={inputHandler} required></input>
          </div>
          <div className="form-group">
          <input className="form-control" type="email" name="email"  placeholder="Enter e-mail" onChange={inputHandler} required></input>
          </div>
          <div className="form-group">
          <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={inputHandler} required></input>
          </div>
          <div className="form-group">
          <button className="btn btn-success" type="submit">Submit</button>
          <small>Already have an account </small><Link to='/Login'>Sign In</Link>
          </div>
          </div>
          </form>
        </div>
    )
}

export default SignUp;
