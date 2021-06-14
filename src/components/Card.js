import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import Loading from './Loading';

export default function Card(props) {
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel;
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}`,
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        // console.log(res);
        setSrc(res.data.primaryImageSmall);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((error) => console.log(error));

      return () => cancel();
      
  }, [props.id]);

  return (
    <div className='imgWrapper'>
      {loading && <Loading />}
      <Link to={`/card/${props.id}`}>
        <img
          className={props.className}
          id={props.id}
          key={uuidv4()}
          alt={title}
          src={src}
        />
      </Link>
    </div>
  );
}
