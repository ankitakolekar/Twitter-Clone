import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LockResetIcon from '@mui/icons-material/LockReset';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { useState, useEffect } from 'react';
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import EditProfile from '../EditProfile/EditProfile';

const MainPage = ({ user }) => {

    const navigate = useNavigate();
    const [loggedInUser] = useLoggedInUser();
    const [isLoading, setIsLoading] = useState(false);

    const username = user?.email?.split('@')[0];

    // console.log(loggedInUser)
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/userPost?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    }, [posts, user?.email])

    const handleUploadCoverImage = e => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=afa8cfe6870d9d56969fe30c5dd4f7fa", formData)
            .then(res => {
                const url = res.data.data.display_url;
                // setImageURL(url);
                // console.log(res.data.data.display_url);
                const userCoverImage = {
                    email: user?.email,
                    coverImage: url,
                }
                setIsLoading(false)

                if (url) {
                    fetch(`http://localhost:5000/userUpdates/${user?.email}`, {
                        method: "PATCH",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userCoverImage),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log('done', data);
                        })
                }

            })
            .catch((error) => {
                console.log(error);
                window.alert(error);
                setIsLoading(false);
            })
    }


    const handleUploadProfileImage = e => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=afa8cfe6870d9d56969fe30c5dd4f7fa", formData)
            .then(res => {
                const url = res.data.data.display_url;
                // setImageURL(url);
                // console.log(res.data.data.display_url);
                const userProfileImage = {
                    email: user?.email,
                    profileImage: url,
                }
                console.log(user)
                setIsLoading(false)
                if (url) {
                    fetch(`http://localhost:5000/userUpdates/${user?.email}`, {
                        method: "PATCH",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userProfileImage),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log('done', data);
                        })
                }

            })
            .catch((error) => {
                console.log(error);
                window.alert(error);
                setIsLoading(false);
            })
    }



    return (
        <div>
            <ArrowBackIcon className='arrow-icon' onClick={() => { navigate('/') }} />
            <h4 className='heading-4'>@{username}</h4>
            <div className="MainPage">
                <div className="profile-bio">
                    {
                        <div>
                            <div className="coverImageContainer">
                                <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} className='coverImage' alt="" />
                                <div className="hoverCoverImage">
                                    <label htmlFor="image" className='imageIcon'>
                                        {
                                            isLoading ?
                                                <LockResetIcon className='photoIcon photoIconDisabled' />
                                                :
                                                <CenterFocusWeakIcon className='photoIcon' />
                                        }
                                    </label>
                                    <div className="imageIcon_tweetButton">
                                        <input type="file" id='image' className='imageInput' onChange={handleUploadCoverImage} />
                                    </div>
                                </div>
                            </div>
                            <div className="avatar-img">
                                <div className="avatarContainer">
                                  {/* {console.log(loggedInUser[0]?.profileImage)} */}
                                    <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} className='avatar' alt="" />

                                    <div className="hoverAvatarImage">
                                        <div className="imageIcon_tweetButton">
                                            <label htmlFor="profileImage" className='imageIcon'>
                                                {
                                                    isLoading ?
                                                        <LockResetIcon className='photoIcon photoIconDisabled' />
                                                        :
                                                        <CenterFocusWeakIcon className='photoIcon' />
                                                }
                                            </label>
                                            <div className="imageIcon_tweetButton">
                                                <input type="file" id='profileImage' className='imageInput' onChange={handleUploadProfileImage} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="userInfo">
                                    <div>
                                        <h3 className='heading-3'>
                                            {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
                                        </h3>
                                        <p className="usernameSection">@{username}</p>
                                    </div>
                                    <EditProfile user={user} loggedInUser={loggedInUser} />
                                </div>
                                    <div className="infoContainer">
                                        {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}
                                        <div className="locationAndLink">
                                            {loggedInUser[0]?.location ? <p className='subInfo'> <MyLocationIcon /> {loggedInUser[0]?.location} </p> : ''}
                                            {loggedInUser[0]?.website ? <p className='subInfo link'> <AddLinkIcon /> {loggedInUser[0]?.website} </p> : ''}
                                        </div>
                                    </div>
                                    <h4 className='tweetsText'>Tweets</h4>
                                    <hr />
                                {
                                    posts.map(p => <Post id={p._id} p={p} />)
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage