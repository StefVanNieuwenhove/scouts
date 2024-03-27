import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { MaandlijstPage, MembersPage, NotFoundPage } from './pages';
import Kapoenen from './pages/aanwezigheden/Kapoenen';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}>
          {/* root routes */}
          <Route path='maandlijst' element={<MaandlijstPage />} />

          {/* aanwezigheden routes */}
          <Route path='aanwezigheden'>
            <Route path=':group' element={<Kapoenen />} />
          </Route>

          {/* admin routes */}
          <Route path='/admin/leden' element={<MembersPage />} />

          {/* 404 */}
          <Route path='not-found' element={<NotFoundPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
