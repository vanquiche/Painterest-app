import React from 'react';
import Loading from './Loading';
import Search from './Search';
import Error from './Error';
import Card from './Card';

export default function CardContainer(props) {
  const results = props.results;
  return (
    <>
      {props.loading && <Loading />}
      <Search queries={results.length} />
      <main className='imgContainer'>
        {/* eslint-disable-next-line */}
        {results
          .slice(0, props.count)
          .filter((objId) => objId != 16580)
          .map((objID) => {
            return <Card id={objID} className='imgCard' />;
          })}
      </main>
      {props.noneToLoad && <Error />}
      <button className='btn' onClick={props.onClick}>load more...</button>
    </>
  );
}
