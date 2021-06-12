import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'material-design-icons/iconfont/material-icons.css';

export default function Navbar(props) {
  const [search, setSearch] = useState('');
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

  return (
    <nav className='navbarContainer'>
      <Link to='/'>
        <p className='logo'><span className='material-icons'>crop_portrait</span>Painterest</p>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleChange}
          value={search}
          className='search'
        />
      </form>
      <Link to='/pins'>
        <span className='material-icons'>favorite</span>
      </Link>
      <button>Sign In</button>
    </nav>
  );
}
