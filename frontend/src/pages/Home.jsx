import React from 'react';
import Clients from '../components/client/Clients';
import AddClient from '../components/client/AddClient';
import Projects from '../components/project/Projects';

const Home = () => {
  return (
    <>
      <Projects />
      <hr />
      <AddClient />
      <Clients />
    </>
  );
};

export default Home;
