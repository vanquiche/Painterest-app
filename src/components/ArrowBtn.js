import React from 'react'

export default function ArrowBtn(props) {
  return (
    <div className='arrowIconWrapper'>
      <span className='arrowMsg' >{props.msg}</span>
      <span onClick={props.onClick} className='material-icons font36 cursor'>
        keyboard_arrow_down
      </span>
    </div>
  );
}
