import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';

export default function ControlBtns(props) {
  return (
    <div className='controlBtnsWrapper'>
      <span onClick={props.favorite} className='material-icons font36'>
        {props.innerContent}
      </span>

      <a
        href={props.url}
        alt='MET-resource'
        target='_blank'
        rel='noopener noreferrer'
      >
        <span onClick={props.info} className='material-icons font36'>
          info
        </span>
      </a>
    </div>
  );
}
