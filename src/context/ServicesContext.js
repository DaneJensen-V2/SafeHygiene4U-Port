import React, { useState, createContext, useContext } from 'react';
import { firebase } from '../firebase-config';

const ServiceContext = createContext();

export const ServiceContextProvider = ({ children }) => {
  const [servicesList, setServicesList] = useState([]);
  const entityRef = firebase.firestore().collection('entities');

  const getServices = async () => {
    console.log('Getting Services');
    const starCountRef = firebase.database().ref('Services');
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };

  return (
    <ServiceContext.Provider
      value={{
        getServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// create a new hook for authentication use
export const useServices = () => useContext(ServiceContext);
