import { useEffect, useState } from 'react'
import useData from '../../../../context/DataContext'
import useAuth from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import styles from './PetInfo.module.scss'


function PetInfo() {
const dataContext = useData();
const authContext = useAuth();
const [pets, setPets] = useState<{ id: string, name: string }[]>([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();


useEffect(()=>{
  const fetchData = async () => {
    if (dataContext && authContext && authContext.currentUser) {
      const { getUsersDocs } = dataContext;
      const { currentUser } = authContext;
      const uid = currentUser.uid;
      
      try {
        const petData = await getUsersDocs('Pets', uid);
        if (petData) {
          setPets(petData);
        } else {
          console.error('Nie znaleziono żadnych zwierzaków');
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Current user or data context is null or undefined');
      setLoading(false);
    }
  };
  fetchData();
}, [dataContext, authContext]);

const handleAddPet = () => {
  navigate('/addpet'); // Przekierowuje do formularza dodawania zwierzaka
};

const handleEditPet = (petId:string) => {
  navigate(`/addpet/${petId}`); // Przekierowuje do formularza edycji zwierzaka
};

if (loading) {
  return <p>Loading pet data...</p>;
}

  return (
    <div className={styles.petContainer}>
      {pets.length > 0 ? (
        <div className={styles.petWrapper}>
          <p>Twoii pupile</p>
          <ul className={styles.petList}>
            {pets.map(pet => (
              <li key={pet.id} onClick={() => handleEditPet(pet.id)}>
                {pet.name}
              </li>
            ))}
          </ul>
          <button onClick={handleAddPet} className={styles.buttonAdd}>Dodaj zwierzaka</button>
        </div>
      ) : (
        <div className={styles.noPets}>
          <button onClick={handleAddPet} className={styles.buttonAdd}>Dodaj zwierzaka</button>
        </div>
      )}
    </div>
   )
}

export default PetInfo
