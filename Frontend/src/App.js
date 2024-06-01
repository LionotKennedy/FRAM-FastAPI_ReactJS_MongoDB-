// App.js
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Authentification/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Operation from "./components/operation/Operation";
import Users from "./components/users/Users";

import "./style/style.css";
import "./style/style_2.css";

function App() {
  return (
    <div className="AppContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Header />}>
            <Route path="/admin" element={<Home />}></Route>
            <Route path="/admin/operation" element={<Operation />}></Route>
            <Route path="/admin/users" element={<Users />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
