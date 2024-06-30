import { useEffect, useState } from "react";
import avatarOne from "../../../assets/Avatars/Avatar 1.svg";
import avatarTwo from "../../../assets/Avatars/Avatar 2.svg";
import avatarThree from "../../../assets/Avatars/Avatar 3.svg";
import avatarFour from "../../../assets/Avatars/Avatar 4.svg";
import avatarFive from "../../../assets/Avatars/Avatar 5.svg";
import avatarSix from "../../../assets/Avatars/Avatar 6.svg";
import edit from "../../../assets/Icons/pencil-edit.svg";
import AvatarModal from "../AvatarModal/AvatarModal";
import styles from "./addAvatar.module.scss";

export type Avatar = { id: number; photo: string; alt: string };

const AddAvatar = ({ avatar, setAvatar }) => {
  const avatars: Avatar[] = [
    { id: 1, photo: avatarOne, alt: "Avatar one" },
    { id: 2, photo: avatarTwo, alt: "Avatar two" },
    { id: 3, photo: avatarThree, alt: "Avatar three" },
    { id: 4, photo: avatarFour, alt: "Avatar four" },
    { id: 5, photo: avatarFive, alt: "Avatar five" },
    { id: 6, photo: avatarSix, alt: "Avatar six" },
  ];

  useEffect(() => {
    setAvatar(avatars[0]);
  }, []);

  const [isClicked, setClick] = useState(false);
  // const [avatar, setAvatar] = useState(avatars[0]);

  function toggleMenu(id?: number) {
    setClick(!isClicked);
    if (id) {
      setAvatar(avatars[id - 1]);
    }
  }

  return (
    <>
      <div className={styles.avatarContainer}>
        <button
          className={styles.avatarChangeButton}
          type="button"
          onClick={() => toggleMenu()}
        >
          <img className={styles.avatarEditImage} src={edit} />
        </button>
        <img
          className={styles.avatarMain}
          src={avatar.photo}
          alt={avatar.alt}
        />
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
