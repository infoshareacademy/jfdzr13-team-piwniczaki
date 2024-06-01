import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";


const Layout = () => {
	return (
		<div >
			<header>
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
