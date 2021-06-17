import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function User(props) {
  const user = props.user.split(' ') || 'friend';

  const collection = useRef();
  const signout = useRef();

  function toggleClass() {
    function timeout() {
      setTimeout(() => {
        collection.current.classList.toggle('slideDown');
      }, 280);
      signout.current.classList.toggle('slideDown');
    }
    timeout();
    setTimeout(() => {
      timeout();
    }, 3000);
  }

  return (
    <div className='userContainer'>
      <div>
        hello, {user[0]}
        <span className='material-icons dropDownArrow' onClick={toggleClass}>
          keyboard_arrow_down
        </span>
      </div>

      <ul id='dropDown' className='dropDownContainer'>
        <Link to='/pins'>
          <li
            ref={collection}
            className='dropDownItem'
            onClick={props.collection}
          >
            Collection
          </li>
        </Link>
        <li ref={signout} className='dropDownItem' onClick={props.signOut}>
          Sign-Out
        </li>
      </ul>
    </div>
  );
}
