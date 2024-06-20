import styles from './AddPetsitter.module.scss'
import { useState} from 'react';
import useAuth from '../../context/AuthContext';
import { getDocs, doc, setDoc,collection, query,where } from 'firebase/firestore';
import { db } from '../../utils/firebase'; 
function AddPetsitter(){
    const { currentUser } = useAuth();
    console.log(currentUser)
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

  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!currentUser || !('uid' in currentUser)) {
            console.error('Użytkownik niezalogowany');
            return;
        }
        try {
            console.log('jestem w try submita')
            const userDocRef = doc(db, 'Petsitters', currentUser.uid);

            const q = query(collection(db, 'Petsitters'), where('userId', '==', currentUser.uid));
            console.log('Zapytanie zostało wykonane:', q);

            const querySnapshot = await getDocs(q);
            console.log('Liczba znalezionych dokumentów:', querySnapshot.size);

            if (querySnapshot.empty) {
                console.warn('Nie znaleziono żadnych dokumentów dla podanego UID');
                return;
              }

            querySnapshot.forEach(async () => {
                await setDoc(userDocRef, { animals: checkboxes }, { merge: true });
                console.log(`Dane zostały zaktualizowane dla użytkownika o UID: ${currentUser.uid}`);
            });
            
            // if (event.currentTarget) {
            //     event.currentTarget.reset();
            //   } else {
            //     console.error('Nie można zresetować formularza: event.currentTarget jest null');}
        } catch (error) {
            console.error('Błąd podczas aktualizacji danych:', error);
        }
       
    };

 

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
                                        checked={checkboxes[1].dog}
                                    />
                                    PIES
                                </label>
                            </div>
                            {checkboxes[1].dog && (
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
                                                    checked={checkboxes[1].dogActivity0}
                                                />
                                                LENIUCH
                                            </label>
                                            <label htmlFor="dog.dogActivity1">
                                                <input
                                                    id='dog.dogActivity1'
                                                    type='checkbox'
                                                    name='activity'
                                                    onChange={handleCheckboxChange}
                                                    checked={checkboxes[1].dogActivity1}
                                                />
                                                ŚREDNIAK
                                            </label>
                                            <label htmlFor="dog.dogActivity2">
                                                <input
                                                    id='dog.dogActivity2'
                                                    type='checkbox'
                                                    name='activity'
                                                    onChange={handleCheckboxChange}
                                                    checked={checkboxes[1].dogActivity2}
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
                                                    checked={checkboxes[1].dogWeight0}
                                                />
                                                &lt;5kg
                                            </label>
                                            <label htmlFor="dog.dogWeight1">
                                                <input
                                                    id='dog.dogWeight1'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={checkboxes[1].dogWeight1}
                                                />
                                                5-10kg
                                            </label>
                                            <label htmlFor="dog.dogWeight2">
                                                <input
                                                    id='dog.dogWeight2'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={checkboxes[1].dogWeight2}
                                                />
                                                10-15kg
                                            </label>
                                            <label htmlFor="dog.dogWeight3">
                                                <input
                                                    id='dog.dogWeight3'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={checkboxes[1].dogWeight3}
                                                />
                                                15-20kg
                                            </label>
                                            <label htmlFor="dog.dogWeight4">
                                                <input
                                                    id='dog.dogWeight4'
                                                    type='checkbox'
                                                    name='weight'
                                                    onChange={handleCheckboxChange}
                                                    checked={checkboxes[1].dogWeight4}
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
                                                checked={checkboxes[1].dogWalk}
                                            />
                                            SPACER
                                        </label>
                                        <label htmlFor="dog.dogAccom">
                                            <input
                                                type='checkbox'
                                                id='dog.dogAccom'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[1].dogAccom}
                                            />
                                            NOCLEG
                                        </label>
                                        <label htmlFor="dog.dogHomeVisit">
                                            <input
                                                type='checkbox'
                                                id='dog.dogHomeVisit'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[1].dogHomeVisit}
                                            />
                                            WIZYTA DOMOWA
                                        </label>
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
                                        checked={checkboxes[0].cat}
                                    />
                                    KOT
                                </label>
                            </div>
                            {checkboxes[0].cat && (
                                <>
                                    <div className="catActivity">
                                        <h3>AKTYWNOŚĆ FIZYCZNA</h3>
                                        <label htmlFor="cat.catActivity0">
                                            <input
                                                id='cat.catActivity0'
                                                type='checkbox'
                                                name='activity'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catActivity0}
                                            />
                                            LENIUCH
                                        </label>
                                        <label htmlFor="cat.catActivity1">
                                            <input
                                                id='cat.catActivity1'
                                                type='checkbox'
                                                name='activity'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catActivity1}
                                            />
                                            ŚREDNIAK
                                        </label>
                                        <label htmlFor="cat.catActivity2">
                                            <input
                                                id='cat.catActivity2'
                                                type='checkbox'
                                                name='activity'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catActivity2}
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
                                                checked={checkboxes[0].catWeight0}
                                            />
                                            &lt;2kg
                                        </label>
                                        <label htmlFor="cat.catWeight1">
                                            <input
                                                id='cat.catWeight1'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catWeight1}
                                            />
                                            2-4kg
                                        </label>
                                        <label htmlFor="cat.catWeight2">
                                            <input
                                                id='cat.catWeight2'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catWeight2}
                                            />
                                            4-6kg
                                        </label>
                                        <label htmlFor="cat.catWeight3">
                                            <input
                                                id='cat.catWeight3'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catWeight3}
                                            />
                                            6-8kg
                                        </label>
                                        <label htmlFor="cat.catWeight4">
                                            <input
                                                id='cat.catWeight4'
                                                type='checkbox'
                                                name='weight'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catWeight4}
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
                                                checked={checkboxes[0].catWalk}
                                            />
                                            SPACER
                                        </label>
                                        <label htmlFor="cat.catAccom">
                                            <input
                                                type='checkbox'
                                                id='cat.catAccom'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catAccom}
                                            />
                                            NOCLEG
                                        </label>
                                        <label htmlFor="cat.catHomeVisit">
                                            <input
                                                type='checkbox'
                                                id='cat.catHomeVisit'
                                                name='offer'
                                                onChange={handleCheckboxChange}
                                                checked={checkboxes[0].catHomeVisit}
                                            />
                                            WIZYTA DOMOWA
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <button type="submit">Zapisz</button>
                </form>
            </article>
        </div>
    );

}

export default AddPetsitter