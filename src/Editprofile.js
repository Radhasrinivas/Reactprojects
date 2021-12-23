import React from 'react';
import './Editprofile.css';
import Profile from './Profile';
import { FaUserAlt } from 'react-icons/fa';
function Editprofile(props) {
const uploadedImage = React.useRef(null);
const imageUploader = React.useRef(null);
const [save,setSave] = React.useState(false);
const [persdetails,setPersonaldetails] = React.useState({mobNo:'',DOB:'',adress:''})

   if(save){
       return <Profile persdetailsmobNo={persdetails.mobNo} persdetailsDOB={persdetails.DOB} persdetailsadress={persdetails.adress}/>
   }

 const handleImageUpload = e => {
    const [file] = e.target.files;
     if (file) {
       const reader = new FileReader();
       const { current } = uploadedImage;
       current.file = file;
       reader.onload = e => {
         current.src = e.target.result;
       };
       reader.readAsDataURL(file);
     }
   };
   
  const inputHandlerr=(e)=>{
     e.preventDefault()
     const{name,value}=e.target
    setPersonaldetails({...persdetails,[name]:value})
    console.log('persdetails',persdetails.DOB)
  }


  return (
     <div className="profile-info">
     {/* <div style={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
       <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader}
         style={{display: "none"}}/>
       <div style={{height: "150px",width: "150px",border: "1px solid black"}}
         onClick={() => imageUploader.current.click()}>
         <FaUserAlt />
         <img ref={uploadedImage}
           style={{width: "150",
                  height: "150px",
                   }}/>
       </div>
       Click to upload Image
     </div> */}
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
          <textarea className="form-control" type="text" name="adress" maxlength="50" onChange={inputHandlerr}></textarea>
          </div>
          <div className="form-group">
          <button className="btn btn-success" type="text"  onClick={()=>setSave(true)}>Save</button>
          </div>
          </form>
          
          {/* <label>Gender</label>
          <p>07-07-1998</p>
          <label>Mobile Number</label>
          <p>9886447243</p>
          <label>Mobile Number</label>
          <p>9886447243</p>
          <label>City</label>
          <p>Raichur</p> */}
         </div>
     </div>
  );
}

export default Editprofile