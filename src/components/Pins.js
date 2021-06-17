import React, { useState, useEffect } from 'react';
import Card from './Card';
import firebase from 'firebase/app';

export default function Pins() {
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const [queries, setQueries] = useState([]);
  const [loading, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    firestore
      .collection('myPins')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setQueries((prev) => [...new Set([...prev, doc.data().objID])]);
        });
      })
      .then(setLoaded(true))
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3 className='collectionTitle'>{auth.currentUser === null ? 'please Sign in' : 'Collection'}</h3>
      <main className='imgContainer'>
        {loading &&
          queries.map((objID) => {
            return <Card id={objID} className='imgCard' />;
          })}
      </main>
    </div>
  );
}
