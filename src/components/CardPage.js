import React, { useState, useEffect } from 'react';
import ControlBtns from './ControlBtns';
import Loading from './Loading';
import Card from './Card';
import Title from './Title';
import ArrowBtn from './ArrowBtn';

import axios from 'axios';

// firebase imports
import firebase from 'firebase/app';

export default function CardPage({ match }) {
  const firestore = firebase.firestore();
  const id = match.params.id;

  const [query, setQuery] = useState([]);
  const [count, setCount] = useState(15);
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const [imageHasPin, setImageHasPin] = useState(false);

  useEffect(() => {
    let cancel;
    setLoading(true);
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        setSrc(res.data.primaryImage);
        setTitle(res.data.title);
        setArtist(res.data.artistDisplayName);
      })
      .then(() => {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }, 500);
        setLoading(false);
      })
      .catch((error) => console.error(error));

    return () => cancel();
  }, [id]);

  // checking whether image has been liked and added to DB
  useEffect(() => {
    firestore
      .collection('myPins')
      .where('objID', '==', id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc) {
            // console.log('match');
            // image is alread saved in DB
            setImageHasPin(true);
          }
        });
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [id]);

  function handleClick() {
    if (query.length === 0) {
      axios
        .get(
          'https://collectionapi.metmuseum.org/public/collection/v1/search',
          {
            params: {
              hasImage: true,
              medium: 'Paintings',
              q: artist,
            },
          }
        )
        .then((res) => {
          // console.log(res.data.objectIDs);
          setQuery([...res.data.objectIDs]);
        })
        .catch((error) => console.error(error));
      setViewMore(true);
    } else setCount((prev) => prev + 15);
  }

  function displaySimilarImgs() {
    // console.log('render');
    // console.log(count);
    return query.slice(0, count).map((objID) => {
      return <Card id={objID} className='imgCardSmall' />;
    });
  }

  function pinImage() {
    if (imageHasPin === false) {
      firestore
        .collection('myPins')
        .add({
          artist: artist,
          title: title,
          objID: id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setImageHasPin(true);
          console.log('added');
        })
        .catch((err) => console.error('error adding document', err));
    }
    else {
      firestore
        .collection('myPins')
        .where('objID', '==', id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
            setImageHasPin(false);
            console.log('deleted');
          });
        });
    }
  }

  // TODOS:
  // zoom function
  // info function

  return (
    <div>
      <div className='imgLargeFrame'>
        {loading && <Loading />}

        <img className='imgLarge' src={src} alt={title} />
        <ControlBtns
          innerContent={imageHasPin === true ? 'favorite' : 'favorite_border'}
          onClick={pinImage}
        />
      </div>

      {loading === false && <Title title={title} name={artist} />}

      <p>{query.length}</p>

      <div className='imgContainer'>{viewMore && displaySimilarImgs()}</div>

      <ArrowBtn onClick={handleClick} />
    </div>
  );
}
