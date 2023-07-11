import React, { useState } from 'react';
import PT from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues);
  // ✨ where are my props? Destructure them here --????????
  const {loginUrl} = props; 
  // -- idk what props to do


  //instead of useHistory -- in onSubmit -- to navigate to another page after successful logging 
  const navigate = useNavigate();

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // make our call
    console.log('login values', values);
    axios
      //server url/API that you make the request to get info 
      .post(loginUrl, values)
      .then(resp=>{
        console.log('RESPONSE', resp);
        localStorage.setItem('token', resp.data.token);
        navigate('/articles');
      })
      .catch(err=>{
        console.log(err)
        localStorage.removeItem('token');
      })
  }

  const isDisabled = (values) => {
    console.log('values:', values)
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();

    if (trimmedUsername.length >= 3 && trimmedPassword.length >= 8){
      console.log("Credentials are valid.");
      // i feel like i need to add something here... 
    } else {
      console.log("Credentials are invalid.")
    }
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled(values)} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
