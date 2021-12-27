import React from 'react';
import './Profile.css';
import SignUp from './SignUp';
import { FaUserAlt } from 'react-icons/fa';
import Editprofile from './Editprofile';
import { onAuthStateChanged } from 'firebase/auth';
import {auth, db, storagee } from './firebase-config';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Profile(props) {
  const [edit,setEdit] = React.useState(false);
  const [loginuser, setloginuser] = React.useState();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [image,setImage] = React.useState();
  const [mobilenumber,setmobilenumber] = React.useState();
  const [dateofbirth,setdataofbirh] = React.useState();
  const [adress,setadress] = React.useState();
  const [prog, setProg] = React.useState();
  const [uploaded,setUploaded] = React.useState(false)

  React.useEffect( async () => {
  console.log("entered useEffect")
  const itemsDocs = await getDoc(doc(db, 'users', props.currentuser?.uid))
  console.log("itemsDocs here")
  setImage(itemsDocs.data().image)
  setmobilenumber(itemsDocs.data().phonenumber)
  setdataofbirh(itemsDocs.data().Dateofbirth)
  setadress(itemsDocs.data().adress)
  console.log("itemsDocs here",itemsDocs.data())
}, console.log(""))

  if(edit){
    return <Editprofile />
  }

  console.log(props.persdetails)
  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    if (file) {
      const uploadTask = ref(storagee,'file');
      const storageRef = uploadBytesResumable(uploadTask, file)
      storageRef.on("state_changed",(snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
        setProg(prog)
        setUploaded(true)
      },(erro)=>console.log(erro),
      ()=>{
        getDownloadURL(storageRef.snapshot.ref)
        .then(url => {
          setUploaded(false)
          console.log("url",url)
          try{
             updateDoc(doc(db, "users", props.currentuser.uid),{
              image:url
               })
              }catch(error){
                console.log(error)
              }})
      }  
      )
    }  
  }
  
  return (
    <div className="profile-info">
    <div style={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
      <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader}
        style={{display: "none"}}/>
      <div style={{height: "150px",width: "150px",border: "1px solid black"}}
        onClick={() => imageUploader.current.click()}>
        <FaUserAlt />
        <img src={image}
          style={{width: "150",
                  height: "150px",
                  }}/>
                {uploaded && <h4>Uploaded {prog} %</h4>}
      </div>
      Click to upload Image
    </div>
    <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
        <h1 className="card-title">D Radha</h1>
        <h5 className="card-subtitle mb-2 text-muted">{props.currentuser?.email}</h5>
        </div>
        </div>
        <div className="other-u-information">
          <h1>Personal Details</h1>
          <label>Mobile Number:</label>
          <p>{mobilenumber}</p>
          <label>Date of Birth:</label>
          <p>{dateofbirth}</p>
          <label>Adress:</label>
          <p>{adress}</p>
          <button className="btn btn-success" type="text"  onClick={()=>setEdit(true)}>Edit</button>
        </div>
    </div>
  );
}

export default Profile