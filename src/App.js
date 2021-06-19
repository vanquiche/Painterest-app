// import React library
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import components
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';
import Error from './components/Error';
import CardPage from './components/CardPage';
import Pins from './components/Pins'
// import packages
import axios from 'axios';
// import styling
import './style.css';
import 'material-design-icons/iconfont/material-icons.css';

// import firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: 'AIzaSyAAcguM2aC6wvj2tZ_t0Hmfiqx6FV6alwo',
  authDomain: 'painterest-9e46f.firebaseapp.com',
  projectId: 'painterest-9e46f',
  storageBucket: 'painterest-9e46f.appspot.com',
  messagingSenderId: '811556305483',
  appId: '1:811556305483:web:8e47f68b96a52b120d2bce',
  measurementId: 'G-VJSCHJBX58',
});

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(15);
  const [noneToLoad, setNoneToLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNoResults(false);
    let cancel;
    axios
      .get('https://collectionapi.metmuseum.org/public/collection/v1/search', {
        params: {
          hasImage: true,
          medium: 'Paintings',
          q: query || 'art',
        },
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      .then((res) => {
        // console.log(res);
        console.log('new query');
        setResults([...res.data.objectIDs]);
        setCount(15);
        setNoneToLoad(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error: ' + error);
        setNoResults(true);
      });

      return () => cancel();

  }, [query]);

  function loadMore() {
    let increment = 15;
    if (count >= results.length - 1) {
      setNoneToLoad(true);
    }
    setCount((prev) => prev + increment);
  }

  return (
    <Router>
      <Navbar value={query} submitSearch={setQuery} />

      <Switch>
        <Route exact path='/'>
          {noResults && <Error msg='no search result found'/>}
          <CardContainer
            results={results}
            count={count}
            noneToLoad={noneToLoad}
            loading={loading}
            onClick={loadMore}
          />
        </Route>
        <Route path='/card/:id' component={CardPage} />
        <Route path='/pins' component={Pins} />
      </Switch>
    </Router>
  );
};

export default App;
