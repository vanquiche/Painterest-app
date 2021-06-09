import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';
import CardPage from './components/CardPage';
import axios from 'axios';
import './style.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(15);
  const [noneToLoad, setNoneToLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://collectionapi.metmuseum.org/public/collection/v1/search', {
        params: {
          hasImage: true,
          medium: 'Paintings',
          q: query || 'art',
        },
      })
      .then((res) => {
        // console.log(res);
        setResults([...res.data.objectIDs]);
        setCount(15);
        setNoneToLoad(false);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [query]);

  function handleClick() {
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
          <CardContainer
            results={results}
            count={count}
            noneToLoad={noneToLoad}
            loading={loading}
            onClick={handleClick}
          />
        </Route>

        <Route exact path='/card'>
          <h1>Hello world</h1>
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
