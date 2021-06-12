import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function Card(props) {
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}`
      )
      .then((res) => {
        // console.log(res);
        setSrc(res.data.primaryImageSmall);
        setTitle(res.data.title);
      })
      .catch((error) => console.log(error));
  }, [props.id]);

  return (
    <div className='imgWrapper'>
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
