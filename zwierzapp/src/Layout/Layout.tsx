import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header>
        <Navbar />
      </header>
      <main>
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
