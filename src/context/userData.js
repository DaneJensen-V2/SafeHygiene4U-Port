import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuthentication } from './useAuthentication';

export function UserData() {
  const [userData, setUserData] = React.useState();
  const { user } = useAuthentication();

  const getUserData = async () => {
    console.log('Getting user data...');

    const docRef = doc(db, 'Users', user.uid);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.data());
          setUserData(snapshot.data());
        } else {
          console.log('No data available');
        }
      }, [])
      .catch((error) => {
        console.error(error);
      });
  };
  console.log('User Data Change');
  if (user) {
    if (userData) {
      console.log('Return user');
      return userData;
    } else {
      console.log('Fetch user');
      getUserData();
    }
  } else {
    if (userData != null) {
      console.log('Setting to null');
      setUserData(null);
      return userData;
    }
  }
}
