import findPetsitterByRace from "../../../hooks/findPetsitterByRace";
import styles from "./ShowPetsitters.module.scss";

const ShowPetsitters = () => {
  console.log(findPetsitterByRace());
  findPetsitterByRace();
  return <div className={styles.petsittersContainer}>Petistterzy</div>;
};

export default ShowPetsitters;
