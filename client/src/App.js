import './App.css';
import {BrowserRouter,Routes,Route,Navigate,Outlet} from "react-router-dom"
import Home from './pages/Home';
import  Auth  from './components/Auth';
import Header from './components/Header';
import Createpost from './pages/Createpost';
import { useState,useEffect} from 'react';
import Login from './components/Login';
import Allpost from './pages/Allpost';
import Description from './pages/Description';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/auth"/>
  );
};

function App() {
  const [isAuthenticated,isUserAuthenticated]=useState(false);
  const [search,setsearch]=useState("");
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      isUserAuthenticated(true);
    } else {
      isUserAuthenticated(false);
    }
  }, []);
  // console.log(search);
  return (
    <>
    <div className="none" ><h3>Not Supported on Smaller Screens</h3></div>
    <div className="app">
      <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} isUserAuthenticated={isUserAuthenticated} setsearch={setsearch}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/allPost' element={<Allpost search={search}/>}/>
          <Route path='/allPost/:id' element={<Allpost search={search}/>}/>
          <Route
              path="/auth"
              element={<Login isUserAuthenticated={isUserAuthenticated}/>}
            />
          <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
            <Route path="/create" element={<Createpost/>} />
            </Route>
            <Route
              path="/description"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
            <Route path="/description" element={<Description/>} />
            </Route>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
      </div>
      </>
  );
}

export default App;
