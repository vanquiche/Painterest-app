import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Card from './components/Card';
import CardPage from './components/CardPage';
import axios from 'axios';
import './style.css';

const Loading = () => {
  return <h3>Loading...</h3>;
};

const Error = () => {
  return <h3>No more to load</h3>;
};

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(15);
  const [noneToLoad, setNoneToLoad] = useState(false);
  const [loaded] = useState(false);

  useEffect(() => {
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
        setNoneToLoad(false);
        setCount(15);
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

        <Route exact path='/'
        >
          <p>{results.length} search results</p>
          <main>
            {results.slice(0, count).map((objID) => {
              return <Card id={objID} />;
            })}
          </main>
          {noneToLoad && <Error />}
          {loaded && <Loading />}
          <button onClick={handleClick}>Load more</button>

        </Route>

        <Route path='/card' component={CardPage} />

      </Switch>

    </Router>
  );
};

export default App;
