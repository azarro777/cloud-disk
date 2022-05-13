import {Navbar} from "./navbar/Navbar";
import classes from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Registration } from "./registration/Registration";

function App() {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        
        <Navbar/>
        <Routes>
          <Route path="/registration" element={<Registration/>}/>
        </Routes>
        
    </BrowserRouter>
    </div>
    
    
  );
}

export default App;
