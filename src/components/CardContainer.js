import React from 'react';
import Card from './Card';
import Loading from './Loading';
import Error from './Error';
import Search from './Search';

export default function CardContainer(props) {
  const results = props.results;
  return (
    <>
      <Search queries={results.length} />
      <main>
        {results.slice(0, props.count).map((objID) => {
          return <Card id={objID} />;
        })}
      </main>
      {props.noneToLoad && <Error />}
      {props.loading && <Loading />}
      <button onClick={props.onClick}>Load more</button>
    </>
  );
}
