import React from 'react'

export default function Error(props) {
  return (
    <div className='errorContainer'>
      <p className='errorMsg'>{props.msg}</p>
    </div>
  );
}
