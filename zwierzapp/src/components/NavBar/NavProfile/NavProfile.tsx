import styles from "./navBarProfile.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../context/AuthContext";

import profileImg from "../../../images/Profile button.png";
import settingIcon from "../../../images/settings.svg";
import findIcon from "../../../images/person_search.svg";

function NavProfile() {
    const { currentUser, logout } = useAuth() || {};
    const [ isClicked, setClick ] = useState(false);
    function showMenu() {
        setClick((prevState) => !prevState);
    }

    function hideMenu() {
        setClick(false);
    }

    function hideMenu(){
        setClick(false)
        console.log("działa")
    }

    return (
        <div className={styles.profileNavBarContainer}>
            <img src={profileImg} onClick={showMenu} alt="Profile" />
            {isClicked && (
                <div
                    className={styles.hamburgerMenu}
                    onMouseLeave={hideMenu}
                >
                    <div className={styles.cornerBox}></div>
                    <div className={styles.userBox}>
                        <span className={styles.userName}>{currentUser.name} {currentUser.surname}</span>
                        <span className={styles.userMail}>{currentUser.email}</span>
                    </div>
                    <Link to="/profile" className={styles.settingButton} onClick={hideMenu}><img src={settingIcon}  />Ustawienia konta</Link>
                    <Link to="/filter" className={styles.settingButton} onClick={hideMenu}><img src={findIcon}  />Znajdź Petsittera</Link>
                    <Link to="/" className={styles.logoutButton} onClick={logout}>Wyloguj się</Link>
                </div>
            )}
        </div>
    );
}

export default NavProfile;