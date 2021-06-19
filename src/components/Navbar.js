import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import User from './User';

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
    return <button className='signInBtn' onClick={signInWithGoogle}>Sign In</button>;
  }

  return (
    <nav className='navbarContainer'>
      <Link to='/'>
        <div className='logoContainer'>
          <span className='material-icons logoIcon'>crop_portrait</span>
          <span className='logoText'>Painterest</span>
        </div>
      </Link>
      <form className='searchForm' onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleChange}
          value={search}
          className='searchBar'
          placeholder='search...'
          maxLength='35'
        />
      </form>

      {user ? (
        <User
          user={auth.currentUser.displayName}
          signOut={() => auth.signOut()}
        />
      ) : (
        <SignIn />
      )}
    </nav>
  );
}
