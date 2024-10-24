// client/src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import ViewBlog from "./pages/ViewBlog/ViewBlog";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import EditBlog from "./pages/EditBlog/EditBlog";
import Header from "./components/Header/Header";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Login />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
