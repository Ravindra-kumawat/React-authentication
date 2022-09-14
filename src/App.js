import './App.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>




          <Route exect path="/" element={<Signin />} />
          <Route exect path="/signin" element={<Signin />} />
          <Route exect path="/signup" element={<Signup />} />
          <Route exect path="/dashboard" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>





    </>
  );
}

export default App;
