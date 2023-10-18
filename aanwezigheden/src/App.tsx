import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NavAdmin, RedirectRoute } from './components';
import { AuthProvider } from './context';
import {
  Dashboard,
  GiverAdmin,
  JinAdmin,
  JonggiverAdmin,
  KapoenAdmin,
  Login,
  WouterAdmin,
} from './pages';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<RedirectRoute url='login' replace />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<NavAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path='kapoen' element={<KapoenAdmin />} />
              <Route path='wouter' element={<WouterAdmin />} />
              <Route path='jonggiver' element={<JonggiverAdmin />} />
              <Route path='giver' element={<GiverAdmin />} />
              <Route path='jin' element={<JinAdmin />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
