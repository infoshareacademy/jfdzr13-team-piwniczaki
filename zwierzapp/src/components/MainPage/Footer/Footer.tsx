import facebook from "../../../assets/facebook-icon.svg";
import instagram from "../../../assets/instagram-icon.svg";
import mail from "../../../assets/mail-icon.svg";
import phone from "../../../assets/phone-icon.svg";
import twitter from "../../../assets/twitter-icon.svg";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <main className={styles.footerWrapper}>
      <h1 className={styles.contactHeader}>Skontaktuj się z nami</h1>
      <ul className={styles.footerItemsList}>
        <li className={styles.footerItem}>
          <img className={styles.phoneIcon} src={phone} alt="phone icon"></img>
          <p>+ 48 500 100 100</p>
        </li>
        <li className={styles.footerItem}>
          <img className={styles.mailIcon} src={mail} alt="mail icon"></img>
          <p>zwierzapp@zwierzapp.com</p>
        </li>
      </ul>
      <h1 className={styles.addressWrapper}>Siedziba firmy</h1>
      <p> Ul. Leśna 22</p>
      <p>87-100 Toruń</p>
      <h1 className={styles.mediaHeader}>Śledź nas w Social Media</h1>
      <ul className={styles.mediaList}>
        <li>
          <img
            className={styles.facebookIcon}
            src={facebook}
            alt="facebook icon"
          ></img>
        </li>
        <li>
          <img
            className={styles.instagramIcon}
            src={instagram}
            alt="instagram icon"
          ></img>
        </li>
        <li>
          <img className={styles.twitterIcon} src={twitter} alt="twitter"></img>
        </li>
      </ul>
    </main>
  );
};

export default Footer;
