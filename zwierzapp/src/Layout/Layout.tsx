import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import styles from './layout.module.scss'
import { Toaster } from 'react-hot-toast';


const Layout = () => {
	return (
		<div >
			<header className={styles.header}>
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
