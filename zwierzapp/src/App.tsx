import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import AddCare from "./components/Profile/ProfileRightSidebar/AccessibilityInfo/AddCare/AddCare";
import AddDataForm from "./components/AddDataForm/AddDataForm";
import AddPet from "./components/AddPet/AddPet";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import PrivateRoute from "./utils/PrivateRoute";
import AddPetsitter from "./components/AddPetsitter/AddPetsitter";
import Filter from "./components/Filter/Filter";

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
          <Route path="/search" element={<Filter />} />
          <Route path="/form" element={<Form />} />
          <Route path="/personal-data" element={<AddDataForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addpetsitter" element={<AddPetsitter />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
