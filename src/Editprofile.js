import React from 'react';
import './Editprofile.css';
import Profile from './Profile';
import { FaUserAlt } from 'react-icons/fa';
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from './firebase-config';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore/lite";


function Editprofile(props) {
const uploadedImage = React.useRef(null);
const imageUploader = React.useRef(null);
const [save,setSave] = React.useState(false);
const [persdetails,setPersonaldetails] = React.useState({mobNo:'',DOB:'',adress:''})
const[currentuser, setcurrentuser] = React.useState()
    
      onAuthStateChanged(auth, (user) => {
      console.log('user1',user)
      setcurrentuser(user)
    })
    const updateDataOfUser = async (e)=>{
      e.preventDefault()
      try{
    await updateDoc(doc(db, "users", currentuser.uid),{
      phonenumber: persdetails.mobNo,
      Dateofbirth: persdetails.DOB,
      adress: persdetails.adress
       })
       setSave(true)
      }catch(error){
        console.log(error)
      }
      }

   if(save){
       return <Profile currentuser={currentuser} />
   }
 
  const inputHandlerr=(e)=>{
     e.preventDefault()
     const{name,value}=e.target
    setPersonaldetails({...persdetails,[name]:value})
    console.log('persdetails',persdetails.DOB)
  }


  return (
     <div className="profile-info">
     <div className="editprofile">
     <div className="card" style={{width: "18rem"}}>
         <div className="card-body">
        <h1 className="card-title">D Radha</h1>
        <h5 className="card-subtitle mb-2 text-muted">dradha014@gmail.com</h5>
         </div>
        </div>
        </div>
         <div className="other-use-information">
           <h1>Personal Details</h1>
          <form>
          <div className="form-group">
          <label>Mobile Number</label>
          <input className="form-control" type="text" name="mobNo" onChange={inputHandlerr}></input>
          </div>
          <div className="form-group">
          <label>Date of Birth</label>
          <input className="form-control" type="date" name="DOB" onChange={inputHandlerr}></input>
          </div>
          <div className="form-group">
          <label>Adress</label>
          <textarea className="form-control" type="text" name="adress" maxLength="50" onChange={inputHandlerr}></textarea>
          </div>
          <div className="form-group">
          <button className="btn btn-success" type="text"  onClick={updateDataOfUser}>Save</button>
          </div>
          </form>
         </div>
     </div>
  );
}

export default Editprofile