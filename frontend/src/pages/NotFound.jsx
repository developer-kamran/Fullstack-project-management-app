import React from 'react';
import { Frown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
      <AlertTriangle size={100} strokeWidth={1} color='#fff' fill='#cc0000' />
      <h1>404</h1>
      <p className='lead'>
        <Frown /> Sorry, this page does not exist.
      </p>
      <Link to='/' className='btn btn-primary'>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
