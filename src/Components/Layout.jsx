import React, { Component, useContext, useEffect, useState } from 'react'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MyContext } from './ContextProvider'
import { useAuthState } from 'react-firebase-hooks/auth';

import { onAuthStateChanged } from 'firebase/auth';
import { app, auth } from '../Firebase/firebase';

export default function Layout() {
  let { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext)
  const { userObj, setUserObj } = useContext(MyContext);
  let { myAuth, setMyAuth } = useContext(MyContext)
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setUserObj(user);
      setMyAuth("Logged in")
      setprofilePhotoURL(user.photoURL);
    } else {
      setMyAuth("Not Logged in")
      setUserObj(null);
      setprofilePhotoURL("https://ssniper.sirv.com/Images/3.png");
    }
  }, [user]);


  // if (user) {
  //   setUserObj(user)
  //   if (userObj !== null && userObj.photoURL) {
  //     setMyAuth("Logged in")
  //     setprofilePhotoURL(userObj.photoURL);
  //   }
  //   // setprofilePhotoURL(userObj.photoURL)
  // }
  // }
  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser != null) {
  //     setUserObj(currentUser)
  //     setMyAuth("Logged in")
  //     console.log(userObj);
  //     if (userObj !== null && userObj.photoURL) {
  //       setprofilePhotoURL(userObj.photoURL);
  //     }
  //     // setprofilePhotoURL(userObj.photoURL)
  //   }

  // })

  return (
    <>
      <div className='tall GreenishBG'>
        <Outlet />
      </div>
      <NavbarComponent />
      {/* <Footer /> */}
    </>
  )
}