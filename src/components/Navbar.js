import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// css imports
import 'material-design-icons/iconfont/material-icons.css';

// firebase imports
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';


export default function Navbar(props) {
  const auth = firebase.auth();
  const [search, setSearch] = useState('');
  const [user] = useAuthState(auth);
  let history = useHistory();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submitSearch(search);
    setSearch('');
    history.push('/');
  }

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>Sign In</button>;
  }

  function SignOut() {
    return auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>;
  }

  // console.log(auth.currentUser.displayName)

  return (
    <nav className='navbarContainer'>
      <Link to='/'>
        <p className='logo'>
          <span className='material-icons'>crop_portrait</span>Painterest
        </p>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleChange}
          value={search}
          className='search'
          placeholder='search...'
        />
      </form>
      <Link to='/pins'>
        <span className='material-icons pinIcon'>favorite</span>
      </Link>
      {user ? <SignOut /> : <SignIn />}
    </nav>
  );
}
