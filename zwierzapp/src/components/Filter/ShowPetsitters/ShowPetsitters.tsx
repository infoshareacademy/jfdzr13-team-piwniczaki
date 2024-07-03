import useFindPetsitters from "../../../hooks/useFindPetsitters";
import styles from "./ShowPetsitters.module.scss";

const ShowPetsitters = () => {
  useFindPetsitters();
  console.log(useFindPetsitters());
  return <div className={styles.petsittersContainer}>Petistterzy</div>;
};

export default ShowPetsitters;
