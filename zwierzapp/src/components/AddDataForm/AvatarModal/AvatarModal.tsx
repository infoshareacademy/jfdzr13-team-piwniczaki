import { Avatar } from "../AddAvatar/AddAvatar";
import styles from "./avatarModal.module.scss";

type AvatarModalProps = {
  avatars: Avatar[];
  toggleMenu: (id: number) => void;
};

const AvatarModal = (props: AvatarModalProps) => {
  return (
    <div>
      <ul className={styles.avatarContainer}>
        {props.avatars.map((element, index) => (
          <li key={index}>
            <img
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
