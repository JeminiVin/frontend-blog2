import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CreateBlog from './pages/CreateBlog';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import EditBlog from './pages/EditBlog';
import BlogDetail from './pages/BlogDetail';
function App() {
  return (
    <div >
      <Router>
        <Navbar />
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          {/* Protect this route so only logged-in users can access */}
          <Route path='/create' element={<ProtectedRoute element={<CreateBlog />} />} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
