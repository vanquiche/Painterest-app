import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';

export default function ControlBtns() {
  return (
    <ul className='controlBtnsWrapper'>
      <li>
        <span className='material-icons'>pageview</span>
      </li>
      <li>
        <span className='material-icons'>favorite</span>
      </li>
      <li>
        <span className='material-icons'>info</span>
      </li>
    </ul>
  );
}
