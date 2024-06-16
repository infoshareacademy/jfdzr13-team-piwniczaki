import AccessibilityInfo from "./AccessibilityInfo/AccessibilityInfo";
import PetInfo from "./PetInfo/PetInfo";
import styles from "./ProfileRightSidebar.module.scss";

function ProfileRightSidebar() {
  return (
    <div className={styles.container}>
      <PetInfo/>
      <AccessibilityInfo/>
    </div>
  )
}

export default ProfileRightSidebar
