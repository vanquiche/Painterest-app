import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function User(props) {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const user = props.user.split(' ') || 'friend';
  const collection = useRef();
  const signout = useRef();

  function toggleClass() {
    setDropDownIsOpen((prev) => !prev);
    const time = dropDownIsOpen === false ? 130 : 300;
    setTimeout(() => {
      collection.current.classList.toggle('slideDown');
    }, time);
    signout.current.classList.toggle('slideDown');
  }

  return (
    <div className='userContainer'>
      <div>
        <span className='userName'>hello {user[0]}</span>
        <span className='material-icons dropDownArrow' onClick={toggleClass}>
          menu
        </span>
      </div>

      <ul id='dropDown' className='dropDownContainer'>
        <Link to='/pins'>
          <li
            ref={collection}
            className='dropDownItem'
            onClick={props.collection}
          >
            collection
          </li>
        </Link>
        <li ref={signout} className='dropDownItem' onClick={props.signOut}>
          sign-out
        </li>
      </ul>
    </div>
  );
}
