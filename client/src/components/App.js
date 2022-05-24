import {Navbar} from "./navbar/Navbar";
import classes from "./App.module.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Authorization } from "./authorization/Authorization";
import { Login } from "./authorization/Login";
import { Disk } from "./disk/Disk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);
  
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar/>
        {!isAuth ? 
          <Routes>
          <Route path="/registration" element={<Authorization/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to="/login" replace />}/>
        </Routes>
        :
        <Routes>
          <Route exact path="/" element={<Disk/>}/>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
        }
    </BrowserRouter>
    </div>
    
    
  );
}

export default App;
