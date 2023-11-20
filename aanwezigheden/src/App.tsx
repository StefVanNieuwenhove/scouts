import { Route, Routes } from 'react-router-dom';
import { NavAdmin, RedirectRoute } from './components';
import {
  Dashboard,
  Login,
  Kapoen,
  Wouter,
  Jonggiver,
  Giver,
  Jin,
  Logout,
  Members,
  Leiding,
  Profile,
} from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<RedirectRoute url='login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/admin' element={<NavAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path='kapoen' element={<Kapoen />} />
          <Route path='wouter' element={<Wouter />} />
          <Route path='jonggiver' element={<Jonggiver />} />
          <Route path='giver' element={<Giver />} />
          <Route path='jin' element={<Jin />} />
          <Route path='members' element={<Members />} />
          <Route path='leiding' element={<Leiding />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
