import styles from './AddPetsitter.module.scss';
import { useState, useEffect} from 'react';
import useAuth from '../../context/AuthContext';
import {addDoc,collection} from 'firebase/firestore';
import { db } from '../../utils/firebase'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useData from '../../context/DataContext';

//*** przy ofercie znak zapytania i na nim dymek "spacer cena za h, nocleg cena za opiekę całodobową, wizyta domowa cena za jednorazową wizytę w ciągu dnia"


function AddPetsitter(){
    const dataContext = useData();
    const authContext = useAuth();
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [checkboxes, setCheckboxes] = useState([{
        cat: false,
        catActivity0: false,
        catActivity1: false,
        catActivity2: false,
        catWeight0: false,
        catWeight1: false,
        catWeight2: false,
        catWeight3: false,
        catWeight4: false,
        catWeight5: false,
        catWalk: false,
        catAccom: false,
        catHomeVisit: false,
    },{
        dog: false,
        dogActivity0: false,
        dogActivity1: false,
        dogActivity2: false,
        dogWeight0: false,
        dogWeight1: false,
        dogWeight2: false,
        dogWeight3: false,
        dogWeight4: false,
        dogWeight5: false,
        dogWalk: false,
        dogAccom: false,
        dogHomeVisit: false,
    }
]);
const dogObj = checkboxes[1];
const catObj = checkboxes[0];

const [prices, setPrices] = useState([
    { catWalkPrice: 0, catAccomPrice: 0, catHomeVisitPrice: 0 },
    { dogWalkPrice: 0, dogAccomPrice: 0, dogHomeVisitPrice: 0 }
]);

const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    const [animal, key] = id.split('.');
    
    setCheckboxes((prev) => {
        const updated = [...prev];
        const index = animal === 'cat' ? 0 : 1;
        updated[index] = {
            ...updated[index],
            [key]: checked,
        };
        return updated;
    })
};


useEffect(() => {
    const fetchData = async () => {

        if(dataContext && authContext && authContext.currentUser) {   
            const {getUserFromDatabase} = dataContext;
            const {currentUser} = authContext;
            const uid = currentUser.uid;
            const userData = await getUserFromDatabase('Petsitters',uid);
            console.log('currentUser:', currentUser)

            if(userData) {
                setCheckboxes(userData.checkboxes || []);
                setPrices(userData.prices || []);
                setIsEditMode(false);
                setIsFirstTime(false);
            }else{
                console.error('Current user nie jest petsitterem');
                setIsFirstTime(true)
                setIsEditMode(true)
            }
        }else {
            console.error('Current user or data context is null or undefined');
        }
    }
    fetchData();
    }, [dataContext, authContext]);

        
    const handleEditClick = () => {
        setIsEditMode(true);
    };


    const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const [animal, key] = id.split('.');
    const index = animal === 'cat' ? 0 : 1;

    setPrices((prev) => {
        const updated = [...prev];
        updated[index] = {
            ...updated[index],
            [key]: Number(value),
        };
        return updated;
    });
  }

  const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loadingToastId = toast.loading('Dodawanie danych...');

        if (!dogObj.dog && !catObj.cat) {
            toast.dismiss(loadingToastId);
            toast.error('Zaznacz przynajmniej jedną opcję', { id: 'race' });
            return;
        }
        if ((dogObj.dog && !(dogObj.dogActivity0 || dogObj.dogActivity1||dogObj.dogActivity2)) || (catObj.cat && !(catObj.catActivity0 || catObj.catActivity1 || catObj.catActivity2))) {
            toast.dismiss(loadingToastId);
            toast.error('Zaznacz przynajmniej jeden rodzaj aktywności fizycznej', { id: 'activity' });
            return;
        }
        if ((dogObj.dog && !(dogObj.dogWeight0|| dogObj.dogWeight1 ||dogObj.dogWeight2 ||dogObj.dogWeight3 ||dogObj.dogWeight4 ||dogObj.dogWeight5)) || (catObj.cat && !(catObj.catWeight0 || catObj.catWeight1 || catObj.catWeight2  || catObj.catWeight3  || catObj.catWeight4  || catObj.catWeight5))) {
            toast.dismiss(loadingToastId);
            toast.error('Zaznacz przynajmniej jeden zakres wagi', { id: 'weight'});
            return;
        }
        if((dogObj.dog && !(dogObj.dogHomeVisit|| dogObj.dogWalk ||dogObj.dogAccom)) || (catObj.cat && !(catObj.catHomeVisit || catObj.catWalk|| catObj.catAccom)))  {
            toast.dismiss(loadingToastId);
            toast.error('Zaznacz przynajmniej jedną usługę', { id: 'offer' });
            return;
        }

    
        try {
                if (dataContext && authContext && authContext.currentUser) {
                const { currentUser } = authContext;
                const { updateUserToDatabase } = dataContext;
                const uid = currentUser.uid;
            
                    if (isFirstTime) {
                        await addDoc(collection(db, 'Petsitters'), {
                        prices: prices,
                        checkboxes: checkboxes,
                        userId: currentUser.uid,
                        });
                        toast.success('Przesłano dane', { id: loadingToastId });
                        setIsFirstTime(false)
                    } else {
                        await updateUserToDatabase('Petsitters', uid, { prices, checkboxes });
                        toast.success('Zaktualizowano dane', { id: loadingToastId });
                        setIsEditMode(false);
                    }
                
                    setTimeout(() => {
                        navigate('/profile');
                    }, 2000);
                    }
            } catch (error) {
                toast.dismiss(loadingToastId);
                toast.error('Błąd podczas zapisywania danych');
          }
          
        }
 

    return (
        <div className={styles.AddPetsitterPage}>
            <article className={styles.addPetsitterContainer}>
                <h1>Zostań petsitterem!</h1>
                <h2>Jakimi zwierzętami chcesz się opiekować?</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.dog}>
                            <div className="dogRace">
                                <label htmlFor="dog.dog">
                                    <input
                                        id='dog.dog'
                                        type='checkbox'
                                        name='race'
                                        onChange={handleCheckboxChange}
                                        checked={dogObj.dog}
                                        disabled={!isEditMode}
                                    />
                                    PIES
                                </label>
                            </div>
                            {dogObj.dog && (
                                <>
                                    <div className="dogActivity">
                                        <h3>Aktywność Fizyczna</h3>
                                        <div className={styles.dog}>
                                            <label htmlFor="dog.dogActivity0">
                                                <input
                                                    id='dog.dogActivity0'
                                                    type='checkbox'
                                                    name='activity'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogActivity0}
                                                    disabled={!isEditMode}
                                                />
                                                LENIUCH
                                            </label>
                                            <label htmlFor="dog.dogActivity1">
                                                <input
                                                    id='dog.dogActivity1'
                                                    type='checkbox'
                                                    name='activity'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogActivity1}
                                                    disabled={!isEditMode}
                                                />
                                                ŚREDNIAK
                                            </label>
                                            <label htmlFor="dog.dogActivity2">
                                                <input
                                                    id='dog.dogActivity2'
                                                    type='checkbox'
                                                    name='activity'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogActivity2}
                                                    disabled={!isEditMode}
                                                />
                                                WARIAT
                                            </label>
                                        </div>
                                    </div>
                                    <div className='dogWeight'>
                                        <h3>WAGA</h3>
                                        <div>
                                            <label htmlFor="dog.dogWeight0">
                                                <input
                                                    id='dog.dogWeight0'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogWeight0}
                                                    disabled={!isEditMode}
                                                />
                                                &lt;5kg
                                            </label>
                                            <label htmlFor="dog.dogWeight1">
                                                <input
                                                    id='dog.dogWeight1'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogWeight1}
                                                    disabled={!isEditMode}
                                                />
                                                5-10kg
                                            </label>
                                            <label htmlFor="dog.dogWeight2">
                                                <input
                                                    id='dog.dogWeight2'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogWeight2}
                                                    disabled={!isEditMode}
                                                />
                                                10-15kg
                                            </label>
                                            <label htmlFor="dog.dogWeight3">
                                                <input
                                                    id='dog.dogWeight3'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogWeight3}
                                                    disabled={!isEditMode}
                                                />
                                                15-20kg
                                            </label>
                                            <label htmlFor="dog.dogWeight4">
                                                <input
                                                    id='dog.dogWeight4'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={dogObj.dogWeight4}
                                                    disabled={!isEditMode}
                                                />
                                                20+kg
                                            </label>
                                        </div>
                                    </div>
                                    <div className='dogOffer'>
                                        <h3>OFERTA </h3>
                                        <label htmlFor="dog.dogWalk">
                                            <input
                                                type='checkbox'
                                                id='dog.dogWalk'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={dogObj.dogWalk}
                                                disabled={!isEditMode}
                                            />
                                            SPACER
                                        </label>
                                        {dogObj.dogWalk && 
                                        <label htmlFor='dog.dogWalkPrice'>
                                            <input 
                                                type='number' 
                                                id='dog.dogWalkPrice' 
                                                name='price' 
                                                
                                                value={prices[1]?.dogWalkPrice || 0}
                                                min='0'
                                                onChange={handlePriceInput}
                                            />
                                            <span>PLN</span>
                                        </label>}

                                        <label htmlFor="dog.dogAccom">
                                            <input
                                                type='checkbox'
                                                id='dog.dogAccom'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={dogObj.dogAccom}
                                                disabled={!isEditMode}
                                            />
                                            NOCLEG
                                        </label>
                                        {dogObj.dogAccom && 
                                        <label htmlFor='dog.dogAccom'>
                                            <input 
                                                type='number' 
                                                id='dog.dogAccom' 
                                                name='price' 
                                                 
                                                value={prices[1]?.dogAccomPrice || 0}
                                                min='0'
                                                onChange={handlePriceInput}
                                            />
                                            <span>PLN</span>
                                        </label>}

                                        <label htmlFor="dog.dogHomeVisit">
                                            <input
                                                type='checkbox'
                                                id='dog.dogHomeVisit'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={dogObj.dogHomeVisit}
                                                disabled={!isEditMode}
                                            />
                                            WIZYTA DOMOWA
                                        </label>
                                        {dogObj.dogHomeVisit && 
                                        <label htmlFor='dog.dogHomeVisit'>
                                            <input 
                                                type='number' 
                                                id='dog.dogHomeVisit' 
                                                name='price' 
                                                
                                                value={prices[1]?.dogHomeVisitPrice || 0}
                                                min='0'
                                                onChange={handlePriceInput}
                                            />
                                            <span>PLN</span>
                                        </label>}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={styles.cat}>
                            <div className='catRace'>
                                <label htmlFor="cat.cat">
                                    <input
                                        id='cat.cat'
                                        type='checkbox'
                                        name='race'
                                        onChange={handleCheckboxChange}
                                        checked={catObj.cat}
                                        disabled={!isEditMode}
                                    />
                                    KOT
                                </label>
                            </div>
                            {catObj.cat && (
                                <>
                                    <div className="catActivity">
                                        <h3>AKTYWNOŚĆ FIZYCZNA</h3>
                                        <label htmlFor="cat.catActivity0">
                                            <input
                                                id='cat.catActivity0'
                                                type='checkbox'
                                                name='activity'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catActivity0}
                                                disabled={!isEditMode}
                                            />
                                            LENIUCH
                                        </label>
                                        <label htmlFor="cat.catActivity1">
                                            <input
                                                id='cat.catActivity1'
                                                type='checkbox'
                                                name='activity'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catActivity1}
                                                disabled={!isEditMode}
                                            />
                                            ŚREDNIAK
                                        </label>
                                        <label htmlFor="cat.catActivity2">
                                            <input
                                                id='cat.catActivity2'
                                                type='checkbox'
                                                name='activity'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catActivity2}
                                                disabled={!isEditMode}
                                            />
                                            WARIAT
                                        </label>
                                    </div>
                                    <div className='catWeight'>
                                        <h3>WAGA</h3>
                                        <label htmlFor="cat.catWeight0">
                                            <input
                                                id='cat.catWeight0'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catWeight0}
                                                disabled={!isEditMode}
                                            />
                                            &lt;2kg
                                        </label>
                                        <label htmlFor="cat.catWeight1">
                                            <input
                                                id='cat.catWeight1'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catWeight1}
                                                disabled={!isEditMode}
                                            />
                                            2-4kg
                                        </label>
                                        <label htmlFor="cat.catWeight2">
                                            <input
                                                id='cat.catWeight2'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catWeight2}
                                                disabled={!isEditMode}
                                            />
                                            4-6kg
                                        </label>
                                        <label htmlFor="cat.catWeight3">
                                            <input
                                                id='cat.catWeight3'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catWeight3}
                                                disabled={!isEditMode}
                                            />
                                            6-8kg
                                        </label>
                                        <label htmlFor="cat.catWeight4">
                                            <input
                                                id='cat.catWeight4'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catWeight4}
                                                disabled={!isEditMode}
                                            />
                                            8+kg
                                        </label>
                                    </div>
                                    <div className='catOffer'>
                                        <h3>OFERTA </h3>
                                        <label htmlFor="cat.catWalk">
                                            <input
                                                type='checkbox'
                                                id='cat.catWalk'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catWalk}
                                                disabled={!isEditMode}
                                            />
                                            SPACER
                                        </label>
                                        {catObj.catWalk && 
                                            <label htmlFor='cat.catWalkPrice'>
                                                <input 
                                                    type='number' 
                                                    id='cat.catWalkPrice' 
                                                    name='price' 
                                                    placeholder='0' 
                                                    value={prices[0].catWalkPrice}
                                                    onChange={handlePriceInput}
                                                />
                                                <span>PLN</span>
                                            </label>}
                                        <label htmlFor="cat.catAccom">
                                            <input
                                                type='checkbox'
                                                id='cat.catAccom'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catAccom}
                                                disabled={!isEditMode}
                                            />
                                            NOCLEG
                                        </label>
                                        {catObj.catAccom &&
                                            <label htmlFor='cat.catAccomPrice'>
                                                <input 
                                                    type='number' 
                                                    id='cat.catAccomPrice' 
                                                    name='price' 
                                                    placeholder='0'
                                                    value={prices[0].catAccomPrice} 
                                                    onChange={handlePriceInput}
                                                />
                                                <span>PLN</span>
                                            </label>}
                                        <label htmlFor="cat.catHomeVisit">
                                            <input
                                                type='checkbox'
                                                id='cat.catHomeVisit'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={catObj.catHomeVisit}
                                                disabled={!isEditMode}
                                            />
                                            WIZYTA DOMOWA
                                        </label>
                                        {catObj.catHomeVisit && 
                                            <label htmlFor='cat.catHomeVisit'>
                                                <input 
                                                    type='number' 
                                                    id='cat.catHomeVisit' 
                                                    name='price'
                                                    placeholder='0'
                                                    value={prices[0].catHomeVisitPrice} 
                                                    onChange={handlePriceInput}
                                                />
                                            <span>PLN</span>
                                        </label>}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        {!isFirstTime && !isEditMode && (
                            <button type="button" onClick={handleEditClick}>
                                Edytuj
                            </button>
                        )}
                        
                        <button type="submit">
                            Zapisz
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );

}

export default AddPetsitter