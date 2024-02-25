import { Routes, Route } from 'react-router-dom';
import Container from './components/ui/Container';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import Header from './components/ui/Header';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/projects/:id' element={<Project />}></Route>
          <Route path='/projects/create' element={<AddProject />}></Route>
          <Route path='/projects/update/:id' element={<EditProject />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
