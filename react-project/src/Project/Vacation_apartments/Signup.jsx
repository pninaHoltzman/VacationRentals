import '../style.css';
import { useEffect, useState } from "react";
import { SignupUser } from '../api';
import { current } from '@reduxjs/toolkit';
import { Extension } from '@mui/icons-material';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import swal from "sweetalert2";

export const Signup = () => {
  const nav =useNavigate();
  const [NewUser, setNewUser] = useState({
    email: '',
    password: '',
    phone: '',
    morePhone: ''
});
  const onChange =(e) =>{
  
    const { name, value } = e.target;
    setNewUser({ ...NewUser, [name]: value });
};
  
  const signup =(e) =>{
    e.preventDefault();
  
  const currentUser = {
    email: NewUser.email,
    password: NewUser.password,
    phone: NewUser.phone,
    morePhone: NewUser.morePhone,

};


console.log(currentUser)
SignupUser(currentUser)
            .then(x => {
                console.log(x.data);  
                localStorage.setItem('token', x.data.token);
                console.log(x.data.newAdvertiser._id);  

                localStorage.setItem('_id', x.data.newAdvertiser._id);

                swal.fire({
                  icon: "success",
                  title: "נרשמת בהצלחה",
                  timer: 2000
              });
            })
            .catch(err => {
                console.log("Error adding user:", err.response.data);
                swal.fire({
                  text:err.response.data.error,
                  icon: "info"
              });
            });
         
  };
  const toLogIn =()=>{
    nav('/Login');
  }
  return (
    <div id='bodyDiv2' >
<form class="signup" onSubmit={signup} autocomplete="off">
  <h1> יצירת חשבון</h1>
  <h2>כבר יש לך חשבון? <span onClick={toLogIn}>הירשם</span></h2>


  <div class="signup__field">
    <input class="signup__input" type="text" name="email" id="email" required onChange={onChange}  value={NewUser.email}/>
    <label class="signup__label" for="email">אימייל</label>
  </div>

  <div class="signup__field">
    <input class="signup__input" type="password" name="password" id="password" required onChange={onChange}  value={NewUser.password}/>
    <label class="signup__label" for="password">סיסמא</label>
  </div>

  <div class="signup__field">
    <input class="signup__input" type="text" name="phone" id="username" required onChange={onChange}  value={NewUser.phone}/>
    <label class="signup__label" for="username">נייד</label>
  </div>
  <div class="signup__field">
    <input class="signup__input" type="text" name="morePhone" id="username"  onChange={onChange}  value={NewUser.morePhone} />
    <label class="signup__label" for="username">נייד נוסף</label>
  </div>
  
  

  <button className='next' type="submit">הרשמה</button>
</form> 
</div>
 );
};
