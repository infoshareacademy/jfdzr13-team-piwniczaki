import { useState } from "react";
import avatarOne from "../../../assets/Avatars/Avatar 1.svg";
import avatarTwo from "../../../assets/Avatars/Avatar 2.svg";
import avatarThree from "../../../assets/Avatars/Avatar 3.svg";
import avatarFour from "../../../assets/Avatars/Avatar 4.svg";
import avatarFive from "../../../assets/Avatars/Avatar 5.svg";
import avatarSix from "../../../assets/Avatars/Avatar 6.svg";
import AvatarModal from "../AvatarModal/AvatarModal";
import styles from "./addAvatar.module.scss";

export type Avatar = { id: number; photo: string; alt: string };

const AddAvatar = () => {
  const avatars: Avatar[] = [
    { id: 1, photo: avatarOne, alt: "Avatar one" },
    { id: 2, photo: avatarTwo, alt: "Avatar two" },
    { id: 3, photo: avatarThree, alt: "Avatar three" },
    { id: 4, photo: avatarFour, alt: "Avatar four" },
    { id: 4, photo: avatarFive, alt: "Avatar five" },
    { id: 5, photo: avatarSix, alt: "Avatar six" },
  ];

  const [isClicked, setClick] = useState(false);
  const [avatar, setAvatar] = useState(avatars[0]);

  function toggleMenu(id?: number) {
    setClick(!isClicked);
    if (id) {
      setAvatar(avatars[id]);
    }
  } // jak id istnieje to ustaw mi awatar jako awatar.id . jak zmieniam state to w 39 linijce zdjęcie podmienia się ze stanu.

  return (
    <>
      <div className={styles.avatarContainer}>
        <button type="button" onClick={() => toggleMenu()}>
          Zmień
        </button>
        <img src={avatar.photo} alt={avatar.alt} />
        {isClicked ? (
          <AvatarModal avatars={avatars} toggleMenu={toggleMenu} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AddAvatar;
