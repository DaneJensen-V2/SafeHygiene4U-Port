import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase-config';

export async function serviceData() {
  const [serviceData, setServiceData] = React.useState();
  const [showers, setShowers] = useState([]);
  const [Clothing, setClothing] = useState([]);
  const [nonProfits, setNonProfits] = useState([]);
  var reviewList = []

  const getData = async () => {
    console.log('DLFJDKFLJF');
    var serviceList = [];

    setShowers([]);
    setClothing([]);
    setNonProfits([]);

    console.log('Getting Data');

    await getShowers();
    await getClothing();
    await getNonProfit();
    await getNonProfit();

    serviceList.push(showers);
    serviceList.push(Clothing);
    serviceList.push(nonProfits);

    console.log('Got Data');
  };

  const getShowers = async () => {
    setShowers([]);
    const showerQuery = query(collection(db, 'Services'), where('serviceType', '==', 'Shower'));

    const querySnapshot = await getDocs(showerQuery);

    querySnapshot.forEach(async (service) => {
      let name = service.data().name;
      const reviewQuery = doc(db, 'Reviews', name);

      const reviews = await getDoc(reviewQuery);

      if (reviews.exists()) {
        console.log('Rating: ', reviews.data()['Overall Rating']);
        reviewList.push(reviews.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No reviews!');
        reviewList.push("None")
      }

      showers.push(service.data());
    });
  };

  const getClothing = async () => {
    setClothing([]);
    const showerQuery = query(collection(db, 'Services'), where('serviceType', '==', 'Clothing'));

    const querySnapshot = await getDocs(showerQuery);

    querySnapshot.forEach(async (service) => {
      let name = service.data().name;
      const reviewQuery = doc(db, 'Reviews', name);

      const reviews = await getDoc(reviewQuery);

      if (reviews.exists()) {
        console.log('Rating: ', reviews.data()['Overall Rating']);
        reviewList.push(reviews.data())

      } else {
        // docSnap.data() will be undefined in this case
        console.log('No reviews!');
        reviewList.push("None")

      }

      Clothing.push(service.data());
    });
  };

  const getNonProfit = async () => {
    setNonProfits([]);
    const showerQuery = query(collection(db, 'Services'), where('serviceType', '==', 'Non-Profit'));

    const querySnapshot = await getDocs(showerQuery);

    querySnapshot.forEach(async (service) => {
      let name = service.data().name;
      const reviewQuery = doc(db, 'Reviews', name);

      const reviews = await getDoc(reviewQuery);

      if (reviews.exists()) {
        console.log('Rating: ', reviews.data()['Overall Rating']);
        reviewList.push(reviews.data())

      } else {
        // docSnap.data() will be undefined in this case
        console.log('No reviews!');
        reviewList.push("None")

      }

      nonProfits.push(service.data());
    });
  };

  if (serviceData) {
    console.log('Returned Service Data');

    return serviceData;
  } else {
    console.log('Fetching Services');
    setServiceData(await getData());

    console.log('SERVICES RESULT:');
    console.log(serviceData);
    return serviceData;
  }
}
