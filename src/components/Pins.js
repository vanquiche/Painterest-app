import React, { useState, useEffect } from 'react';
// import { useCollectionData } from 'react-firebase-hooks';
import firebase from 'firebase/app';

export default function Pins() {
  const [pins, setPins] = useState([]);
  const [loading, setLoaded] = useState(false);
  const firestore = firebase.firestore();

  useEffect(() => {
    setLoaded(false);
    firestore
      .collection('myPins')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPins(prev => [...new Set ([...prev, doc.data().objID])]);
        });
      });
    setLoaded(true);
  }, []);

  return (
    <div>
      <h1>My Pins</h1>
      <ul>{loading && pins.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
