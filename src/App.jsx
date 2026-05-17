import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Music from './pages/Music.jsx';
import Design from './pages/Design.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import Tools from './pages/Tools.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="music" element={<Music />} />
        <Route path="design" element={<Design />} />
        <Route path="tools" element={<Tools />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
