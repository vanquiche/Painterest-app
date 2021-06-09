import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Navbar(props) {
  const [search, setSearch] = useState('');

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submitSearch(search);
    setSearch('');
  }

  return (
    <Router>
      <nav className='navbarContainer'>
        <Link to='/'>
          <p>Logo</p>
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
          <p>Pins</p>
        </Link>
        <button>Sign In</button>
      </nav>
    </Router>
  );
}
