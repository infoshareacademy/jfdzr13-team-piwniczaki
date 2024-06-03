import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import { db } from "../../utils/firebase.ts";
import styles from "./mainPage.module.scss";

function MainPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "Not logged users"));
      const data = querySnapshot.docs.map((document) => {
        // console.log(document.data());
        return document.data();
      });

      setItems(data);
    };
    fetchUsers();
  }, []);
  console.log({ items });

  return (
    <>
      <div className={styles.mainPageContainer}>
        <p className={styles.mainText}>
          Znajdź najlepszą opiekę dla swojego
          <span className={styles.spanZwierzak}> zwierzaka </span> z naszą
          aplikacją
        </p>

        <div className={styles.buttonContainer}>
          <NavLink to="/register">
            <button className={styles.buttonZarejestruj}>
              Zarejestruj się!
            </button>
          </NavLink>
        </div>
      </div>

      {items.length > 0 ? (
        <Carousel>
          {items.map((element, index) => (
            <div className={styles.carousel} key={index}>
              <img src={element.path} />
              <p>{element.shortDesc}</p>
              <p>{element.name}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default MainPage;
