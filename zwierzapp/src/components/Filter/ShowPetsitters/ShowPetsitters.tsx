import findPetsittersByRace from "../../../hooks/findPetsittersByRace";
import styles from "./ShowPetsitters.module.scss";

const ShowPetsitters = () => {
  console.log(findPetsittersByRace());
  findPetsittersByRace();
  return <div className={styles.petsittersContainer}>Petistterzy</div>;
};

export default ShowPetsitters;
