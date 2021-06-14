import React from 'react';

export default function Title(props) {
  return (
    <div className='titleWrapper'>
      <span className='title'>{props.title}</span>{' '}-{' '}
      <span className='artist'>{props.name}</span>
    </div>
  );
}
