import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Login_Register/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeManager from "./HomeManager/Main/HomeManager";
import Employee from "./HomeEmployee/EmployeeMain/Employee";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home-m" element={<HomeManager />}></Route>
          <Route exact path="/home" element={<Employee />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
