import React, { useState } from 'react'
import Twitter from '../../assets/image/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button'

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const[error,setError]=useState('');
  const navigate = useNavigate();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  if (user || googleUser) {
    navigate("/");
    console.log(user)
    console.log(googleUser)

  }
  if (error) {
    console.log(error.message)

  }
  if (loading) {
    console.log('loading...')
  }
  const handlesubmit = e => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
  }

  const handleGooglesSignIn = () => {
    signInWithGoogle();
  }


  return (
    <div className='login-container'>
      <div className="image-container">
        <img className='image' src={Twitter} alt='' />
      </div>
      <div className="form-container">
        <div className='form-box'>
          <TwitterIcon style={{ color: 'skyblue' }} />
          <h2 className='heading'>Happing now</h2>
          <h3 className='heading1'>What happening today </h3>
          <form onSubmit={handlesubmit}>
            <input
              type="email"
              className='email'
              placeholder='Email address'
              onChange={(e) => setEmail(e.target.value)}

            />
            <input
              type="password"
              className='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='btn-login'>
              <button type='submit' className='btn'>Login</button>
            </div>
          </form>
        </div>
        <hr />
        <div className='google-button'>
          <GoogleButton
            className='g-btn'
            type='light'
            onClick={handleGooglesSignIn}
          />

        </div>
        <div>
          Don't have an account?
          <Link
            to='/signup'
            style={{
              textDecoration: 'none',
              color: 'skyblue',
              fontWeight: '600',
              marginLeft: '5px'

            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
