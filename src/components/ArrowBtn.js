import React from 'react'

export default function ArrowBtn(props) {
  return (
    <div className='arrowIconWrapper'>
      <span onClick={props.onClick} className='material-icons font36'>
        keyboard_arrow_down
      </span>
    </div>
  );
}
