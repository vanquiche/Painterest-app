import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';

export default function Card(props) {
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}`
      )
      .then((res) => {
        // console.log(res);
        setSrc(res.data.primaryImageSmall);
        setTitle(res.data.title);
        // setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [props.id]);

  return (
    <Router>
      <div className='imgWrapper'>
        <Link to='/card'>
          <img
            className='imgCard'
            id={props.id}
            key={props.id}
            alt={title}
            src={src}
          />
        </Link>
      </div>
    </Router>
  );
}
