import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';

export default function ControlBtns(props) {
  return (
    <ul className='controlBtnsWrapper'>
      {/* zoom icon */}
      <li>
        <span className='material-icons font36'>pageview</span>
      </li>
      
      {/* pin icon */}
      <li onClick={props.onClick}>
        <span className='material-icons font36'>{props.innerContent}</span>
      </li>

      {/* info icon */}
      <li>
        <span className='material-icons font36'>info</span>
      </li>
    </ul>
  );
}
