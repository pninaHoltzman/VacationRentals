import { useState } from 'react';
import { LoginUser } from '../api';
import swal from "sweetalert2";
import {useNavigate } from "react-router";

import '../style.css';

export const Login = () => {
 const navigate =useNavigate()
  const [User, setUser] = useState({
    email: '',
    password: ''
    
});
  const onChange =(e) =>{
  
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
};
  
  const login =(e) =>{
    e.preventDefault();
  
  const currentUser = {
    email: User.email,
    password: User.password,
   
};
console.log(currentUser)
console.log(currentUser.token)
console.log(currentUser)



LoginUser(currentUser)
            .then(x => {
                console.log(x.data);  
                localStorage.setItem('token', x.data.token);
                localStorage.setItem('_id', x.data.ad._id);

                swal.fire({
                  icon: "success",
                  title: "התחברת בהצלחה",
                  timer: 2000
              });
            })
            .catch(err => {
                console.log("Error adding user:", err.response.data);
              
                swal.fire({
                  text: err.response.data.error,
                  icon: "info"
              });
            });
           
  };
  const toSignup =()=>{
    navigate('/Signup')
  }
  return (
<div id='bodyDiv1' >

<form class="signup"  autocomplete="off" 
    onSubmit={login}
    >
    <h1>התחברות לחשבון</h1>
    <br></br><br></br>
    <h2>אין לך חשבון עדיין? <span onClick={toSignup}>צור חשבון</span></h2>
  

    <br></br>
    <div class="signup__field">
      <input class="signup__input" type="text" name="email" id="email" required onChange={onChange}  value={User.email} />
      <label class="signup__label" for="email">אימייל</label>
    </div>
    <br></br>
  
    <div class="signup__field">
      <input class="signup__input" type="password" name="password" id="password" required onChange={onChange}  value={User.password} />
      <label class="signup__label" for="password">סיסמא</label>
    </div>
  <br></br>
  <br></br>

    <button className='next' type='Submit'>התחברות</button>
  </form>
  </div>
 
  )
};
