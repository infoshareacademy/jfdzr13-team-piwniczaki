import { Avatar } from "../AddAvatar/AddAvatar";
import styles from "./avatarModal.module.scss";

type AvatarModalProps = {
  avatars: Avatar[];
  toggleMenu: (id?: number) => void;
};

const AvatarModal = (props: AvatarModalProps) => {
  return (
    <div>
      <ul className={styles.avatarContainer}>
        <p className={styles.avatarText}>WYBIERZ SWÓJ AWATAR</p>
        {props.avatars.map((element, index) => (
          <li className={styles.avatarImages} key={index}>
            <img className={styles.singleAvatarImage}
              src={element.photo}
              alt={element.alt}
              onClick={() => {
                props.toggleMenu(element.id);
                console.log(element);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvatarModal;
