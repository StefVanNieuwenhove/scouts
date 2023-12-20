import { Route, Routes } from 'react-router-dom';
import {
  Taxation,
  Giver,
  Home,
  Jin,
  Jonggiver,
  Kapoenen,
  Login,
  Logout,
  Root,
  Wouter,
  Members,
  Management,
  Profile,
  Activities,
  HomePublic,
  NotFound,
} from './pages';
import { Navbar, PrivateRoute, RoleBasedRoute, Sidebar } from './components';

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePublic />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Logout />} />

        {/* private routes */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Sidebar />
            </PrivateRoute>
          }>
          <Route
            index
            element={
              <PrivateRoute>
                <RoleBasedRoute route='dashboard'>
                  <Home />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route path='profile' element={<Profile />} />
          <Route path='aanwezigheden'>
            <Route
              index
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='aanwezigheden'>
                    <Root />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='kapoen'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='aanwezigheden/kapoen'>
                    <Kapoenen />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='wouter'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='aanwezigheden/wouter'>
                    <Wouter />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='jonggiver'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='aanwezigheden/jonggiver'>
                    <Jonggiver />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='giver'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='aanwezigheden/giver'>
                    <Giver />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='jin'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='aanwezigheden/jin'>
                    <Jin />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='rvb'>
            <Route
              path='fiscaliteit'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='rvb/fiscaliteit'>
                    <Taxation />
                  </RoleBasedRoute>
                </PrivateRoute>
              }></Route>
          </Route>
          <Route path='admin'>
            <Route
              path='leden'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='admin'>
                    <Members />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='leiding'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='admin'>
                    <Management />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='maandlijst'
              element={
                <PrivateRoute>
                  <RoleBasedRoute route='admin'>
                    <Activities />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />
          </Route>
        </Route>

        {/* catch all routes */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
