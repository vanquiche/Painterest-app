import React from 'react';
import Loading from './Loading';
import Search from './Search';
import Error from './Error';
import Card from './Card';
import ArrowBtn from './ArrowBtn'

export default function CardContainer(props) {
  const results = props.results;
  const searchResult = props === null ? 0 : results.length;
  return (
    <>
      {props.loading && <Loading />}
      <Search queries={searchResult} />
      <main className='imgContainer'>
        {results
          .slice(0, props.count)
          .filter((objId) => objId !== 16580)
          .map((objID) => {
            return <Card id={objID} className='imgCard' />;
          })}
      </main>
      {props.noneToLoad && <Error />}

      <ArrowBtn onClick={props.onClick}/>

    </>
  );
}
