import React, { useEffect, useState } from 'react'
import useData from '../../../../context/DataContext'
import useAuth from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


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
    <div>
      {pets.length > 0 ? (
        <div>
          <h1>Twoje zwierzaki</h1>
          <ul>
            {pets.map(pet => (
              <li key={pet.id} onClick={() => handleEditPet(pet.id)}>
                {pet.name}
              </li>
            ))}
          </ul>
          <button onClick={handleAddPet}>Dodaj zwierzaka</button>
        </div>
      ) : (
        <div>
          <h1>Twoje zwierzaki</h1>
          <button onClick={handleAddPet}>Dodaj zwierzaka</button>
        </div>
      )}
    </div>
   )
}

export default PetInfo
