import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Profile from "./Pages/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useSelector } from "react-redux";
import Blog from "./Pages/Blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="me" element={<Profile />} />
        </Route>
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
