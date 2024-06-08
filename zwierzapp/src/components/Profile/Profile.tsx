import styles from "./profile.module.scss";

function Profile() {
  return (
    <div className={styles.profileContainer}>
      <p>email:</p>
      <p>imię:</p>
      <p>nazwisko:</p>
    </div>
  )
}

export default Profile