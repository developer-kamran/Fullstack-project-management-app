import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container container-fluid'>
        <Link to='/' className='navbar-brand'>
          Project Management
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/projects/create'
              >
                Add Project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
