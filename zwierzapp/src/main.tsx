import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./styles/index.css";
import { DataProvider } from "./context/DataContext.tsx";
import PrivateRoute from './utils/PrivateRoute.tsx';
import AddPetsitter from './components/AddPetsitter/AddPetsitter';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
            <Route element={<PrivateRoute />}>
              <Route path="/addpetsitter" element={<AddPetsitter />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
