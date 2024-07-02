import findPetsitter from "../../../hooks/findPetsitter";
import styles from "./ShowPetsitters.module.scss";

const ShowPetsitters = () => {
  // console.log(findPetsitter());
  findPetsitter();
  return <div className={styles.petsittersContainer}>Petistterzy</div>;
};

export default ShowPetsitters;
