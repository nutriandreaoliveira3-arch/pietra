import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './Layout';
import Login from './pages/Login';
import SetPassword from './pages/SetPassword';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Diary from './pages/Diary';
import Progress from './pages/Progress';
import Assistant from './pages/Assistant';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/definir-senha" element={<SetPassword />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/modulos" element={<Modules />} />
            <Route path="/diario" element={<Diary />} />
            <Route path="/progresso" element={<Progress />} />
            <Route path="/assistente" element={<Assistant />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
