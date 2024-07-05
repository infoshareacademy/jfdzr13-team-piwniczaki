import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../context/AuthContext";
import styles from "./navBarProfile.module.scss";
import settingIcon from "../../../images/settings.svg";
import findIcon from "../../../images/person_search.svg";

function NavProfile() {
    const { currentUser, logout, avatar } = useAuth() || {};
    const [isClicked, setClick] = useState(false);
    const menuRef = useRef(null);

    function showMenu() {
        setClick((prevState) => !prevState);
    }
    function hideMenu() {
        setClick(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                hideMenu();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.profileNavBarContainer}>
            <img src={avatar.photo} onClick={showMenu} alt="Profile" className={styles.avatarImg}/>
            {isClicked && (
                <div
                    className={styles.hamburgerMenu}
                    ref={menuRef}
                >
                    <div className={styles.cornerBox}></div>
                    <div className={styles.userBox}>
                        <span className={styles.userName}>
                            {currentUser.name} {currentUser.surname}
                        </span>
                        <span className={styles.userMail}>
                            {currentUser.email}
                        </span>
                    </div>
                    <Link
                        to="/profile"
                        className={styles.settingButton}
                        onClick={hideMenu}
                    >
                        <img src={settingIcon} alt="Settings" />
                        Ustawienia konta
                    </Link>
                    <Link
                        to="/search"
                        className={styles.settingButton}
                        onClick={hideMenu}
                    >
                        <img src={findIcon} alt="Find" />
                        Znajdź Petsittera
                    </Link>
                    <Link
                        to="/"
                        className={styles.logoutButton}
                        onClick={logout}
                    >
                        Wyloguj się
                    </Link>
                </div>
            )}
        </div>
    );
}

export default NavProfile;
