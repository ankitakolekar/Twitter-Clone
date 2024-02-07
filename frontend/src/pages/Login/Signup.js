import React, { useState } from 'react'
import Twitter from '../../assets/image/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import './Login.css'
import axios from 'axios';

const Signup = () => {
  const [username, setusername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);


  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);


  if (user||googleUser) {
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

  // console.log(user)


  const handlesubmit = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
    
    const user = {
      username: username,
      name: name,
      email: email,
  }
  axios.post(`http://localhost:5000/register`,user)
  
  }
  const handleGooglesSignIn = ()=> {
    signInWithGoogle();
  }

  return (
    <div className='login-container'>
      <div className="image-container">
        <img className='image'src={Twitter} alt='' />
      </div>
      <div className="form-container">
        <div className='form-box'>
          <TwitterIcon className='Twittericon'style={{color:'skyblue'}}/>
          <h2 className='heading'>Happing now</h2>
          <h3 className='heading1'>Join twitter today</h3>
          <form onSubmit={handlesubmit}>

            <input type="text"
              className='display-name '
              placeholder='@username'
              onChange={(e) => setusername(e.target.value)}
            />
            <input type="text"
              className='display-name'
              placeholder='Enter full name'
              onChange={(e) => setName(e.target.value)}

            />

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
              <button type='submit' className='btn'>Signup</button>
            </div>
          </form>
          <hr />
          <div className='google-button'>
            <GoogleButton
              className='g-btn'
              type='light'
              onClick={handleGooglesSignIn}
            />

          </div>
          <div>
            Already have an account?
            <Link
              to='/login'
              style={{
                textDecoration: 'none',
                color: 'skyblue',
                fontWeight: '600',
                marginLeft: '5px'

              }}
            >
              Login
              </Link>
          </div>
          </div>

        </div>
      </div>
      );
};

      export default Signup;


// import React, { useState } from 'react'
// import twitterImage from '../../assets/image/twitter.jpeg';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

// import { Link, useNavigate } from 'react-router-dom'

// import auth from '../../firebase.init';
// import './Login.css'

// import GoogleButton from 'react-google-button'
// import axios from 'axios';

// const Signup = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     // const [errorMsg, setError] = useState('');
//     const [username, setUsername] = useState('');
//     const [name, setName] = useState('')

//     const Navigate = useNavigate();


//     const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
//     const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);


//     const handleSubmit = e => {
//         e.preventDefault();
//         createUserWithEmailAndPassword(email, password);

//         const user = {
//             username: username,
//             name:name,
//             email:email,
//         }

//         axios.post('http://localhost:5000/register', user)
//     }
//     if (user || googleUser) {
//         Navigate('/');
//         console.log(googleUser)
//         console.log(user);
//     }
//     if (error) {
//         console.log(error.message);
//     }
//     if (loading) {
//         console.log('Loading...');
//     }

//     const handleGoogleSignIn = () => {
//         signInWithGoogle();
//     }

//     return (
//         <div className='login-container'>
//             <div className="image-container">
//                 <img className='image' src={twitterImage} alt="twitter" />
//             </div>
//             <div className="form-container">
//                 <div className="form-box">
//                     <TwitterIcon className='Twitter-icon' style={{ color: 'skyblue' }} />
//                     <h2 className='heading'>Happening Now</h2>
//                     <h3 className="heading1">Join Twitter Now</h3>
//                     <form onSubmit={handleSubmit}>
//                         <input type="text" className='display-name' placeholder='@username' onChange={(e) => setUsername(e.target.value)} />
//                         <input type="text" className='display-name' placeholder='Enter Full Name' onChange={(e) => setName(e.target.value)} />
//                         <input type="email" className='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
//                         <input type="password" className='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
//                         <div className='btn-login'>
//                             <button type='submit' className="btn">SignUp</button>
//                         </div>
//                     </form>
//                     <br />
//                     <div className='google-button'>
//                         <GoogleButton className='g-btn' type='light' onClick={handleGoogleSignIn} />
//                     </div>
//                     <div>
//                         Already have an account?
//                         <Link to='/login' style={{ textDecoration: "none", color: 'skyblue', fontWeight: "600", marginLeft: '5px' }}>Login</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Signup