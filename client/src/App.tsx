import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';

function App() {
  return (
    <>
      <Routes location={'/'}>
        <Route path='/' element={<Navbar />}>
          <Route path='/maandlijst' element={<p>maandlijst</p>} />
          <Route path='*' element={<p>404</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
