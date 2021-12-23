import React from 'react';
import './Profile.css';
import { FaUserAlt } from 'react-icons/fa';
import Editprofile from './Editprofile';

function Profile(props) {
  const [edit,setEdit] = React.useState(false)
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  if(edit){
    return <Editprofile />
}
  console.log(props.persdetails)
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

  return (
    <div className="profile-info">
    <div style={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
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
    </div>
    <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
        <h1 className="card-title">D Radha</h1>
        <h5 className="card-subtitle mb-2 text-muted">dradha014@gmail.com</h5>
        </div>
        </div>
        <div className="other-u-information">
          <h1>Personal Details</h1>
          {/* <label>Date of birth</label>
          <p>{props.fName}</p>
          <label>Gender</label>
          <p>07-07-1998</p> */}
          <label>Mobile Number:</label>
          <p>{props.persdetailsmobNo}</p>
          <label>Date of Birth:</label>
          <p>{props.persdetailsDOB}</p>
          <label>Adress:</label>
          <p>{props.persdetailsadress}</p>
          <button className="btn btn-success" type="text"  onClick={()=>setEdit(true)}>Edit</button>
        </div>
    </div>
  );
}

export default Profile