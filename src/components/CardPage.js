import React, { useState, useEffect } from 'react';
import ControlBtns from './ControlBtns';
import Loading from './Loading';
import Card from './Card';

import axios from 'axios';

export default function CardPage({ match }) {
  const id = match.params.id;
  const [query, setQuery] = useState([]);
  const [count, setCount] = useState(15);
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
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

  function displayMore() {
    // console.log('render');
    // console.log(count);
    return query.slice(0, count).map((objID) => {
      return <Card id={objID} className='imgCardSmall' />;
    });
  }

  return (
    <div>
      <div className='imgLargeFrame'>
        {loading && <Loading />}
        <img class='imgLarge' src={src} alt={title} />
        <ControlBtns />
      </div>
      <h3 style={{ textAlign: 'center' }}>
        {title} by {artist}
      </h3>

      <p>{query.length}</p>

      <div className='imgContainer'>{viewMore && displayMore()}</div>

      <button onClick={handleClick}>similar images</button>
    </div>
  );
}
