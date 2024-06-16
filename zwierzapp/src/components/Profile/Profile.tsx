import styles from "./profile.module.scss";
import ProfileLeftSidebar from "./ProfileLeftSidebar/ProfileLeftSidebar"
import ProfileMain from "./ProfileMain/ProfileMain"
import ProfileRightSidebar from "./ProfileRightSidebar/ProfileRightSidebar"
function Profile() {
  return (
    <div className={styles.profileContainer}>
      <ProfileLeftSidebar />
      <ProfileMain/>
      <ProfileRightSidebar/>
    </div>
  )
}

export default Profile