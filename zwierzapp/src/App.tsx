import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./Layout/Layout";
import MainPage from "./components/MainPage/MainPage";
import Register from "./components/Register/Register";
import AddCare from "./components/AddCare/AddCare";
import AddPet from "./components/AddPet/AddPet";
import Profile from "./components/Profile/Profile";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
// import styles from "./styles/app.module.scss"
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/addcare" element={<AddCare />} />
          <Route path="/addpet" element={<AddPet />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
