import React from 'react';

export default function Search(props) {
  return (
    <div className='queryResults'>
      <p>{props.queries} results</p>
    </div>
  );
}
