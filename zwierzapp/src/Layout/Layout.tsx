import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import styles from './layout.module.scss'

const Layout = () => {
	return (
		<div >
			<header className={styles.header}>
				<Navbar />
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
