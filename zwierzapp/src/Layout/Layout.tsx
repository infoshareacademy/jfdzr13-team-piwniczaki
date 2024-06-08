import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import { Toaster } from 'react-hot-toast';


const Layout = () => {
	return (
		<div >
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
