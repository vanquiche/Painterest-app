import React, { useState, useEffect } from 'react';
import Card from './Card';
import Error from './Error';
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
      
      {auth.currentUser === null && <Error msg='sign in to see collection' />}
      {auth.currentUser !== null && queries.length === 0 && <Error msg='no saved image in collection' />}

      <main className='imgContainer'>
        {loading &&
          queries.map((objID) => {
            return <Card id={objID} className='imgCard' />;
          })}
      </main>
    </div>
  );
}
