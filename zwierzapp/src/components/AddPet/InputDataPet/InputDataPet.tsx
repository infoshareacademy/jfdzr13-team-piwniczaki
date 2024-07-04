import { useState, useEffect } from "react";
import styles from "./inputDataPet.module.scss";
import toast from 'react-hot-toast';
import useAuth from "../../../context/AuthContext";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useNavigate, useParams } from 'react-router-dom';
import getPetData from "../../../hooks/getPetData";

function InputDatapet() {
    const navigate = useNavigate();
    const { currentUser } = useAuth() || {};
    const [isPies, czyWybranoPsa] = useState('');
    const [sexOptions, setSex] = useState({
        male: 'Pies/Kocur',
        female: 'Suka/Kotka'
    });
    const [weightOptions, setWeight] = useState({
        weight0: "<5kg",
        weight1: "5-10kg",
        weight2: "10-15kg",
        weight3: "15-20kg",
        weight4: `20>kg`
    });
    const [formData, setFormData] = useState({
        name: '',
        race: '',
        sex: '',
        age: '',
        behavior: '',
        weight: '',
        description: ''
    });
    const [isNewPet, setIsNewPet] = useState(true);  
    const queryParams = useParams();
    const petData = getPetData(currentUser.uid);

    useEffect(() => {
        const pet = petData.find((element) => element.id === queryParams.petId);
        if (pet) {
            setFormData({
                name: pet.name,
                race: pet.race,
                sex: pet.sex,
                age: pet.age,
                behavior: pet.behavior,
                weight: pet.weight,
                description: pet.description
            });
            czyWybranoPsa(pet.race);
            setIsNewPet(false);  
            if (pet.race === 'dog') {
                setSex({
                    male: 'Pies',
                    female: 'Suka'
                });
                setWeight({
                    weight0: "<5kg",
                    weight1: "5-10kg",
                    weight2: "10-15kg",
                    weight3: "15-20kg",
                    weight4: `20>kg`
                });
            } else if (pet.race === 'cat') {
                setSex({
                    male: 'Kot',
                    female: 'Kotka'
                });
                setWeight({
                    weight0: "<2kg",
                    weight1: "2-4kg",
                    weight2: "4-6kg",
                    weight3: "6-10kg",
                    weight4: `10>kg`
                });
            }
        }
    }, [queryParams, currentUser.uid, petData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'race') {
            czyWybranoPsa(value);
            if (value === 'dog') {
                setSex({
                    male: 'Pies',
                    female: 'Suka'
                });
                setWeight({
                    weight0: "<5kg",
                    weight1: "5-10kg",
                    weight2: "10-15kg",
                    weight3: "15-20kg",
                    weight4: `20>kg`
                });
            } else if (value === 'cat') {
                setSex({
                    male: 'Kot',
                    female: 'Kotka'
                });
                setWeight({
                    weight0: "<2kg",
                    weight1: "2-4kg",
                    weight2: "4-6kg",
                    weight3: "6-10kg",
                    weight4: `10>kg`
                });
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSubmit = new FormData(event.currentTarget);

        if (formDataToSubmit.get("name") === '') {
            toast.error("Podaj imię zwierzaka");
            return;
        }
        if (formDataToSubmit.get("name").toString().length < 2) {
            toast.error("Imie musi zawierać przynajmniej dwie litery");
            return;
        }
        if (formDataToSubmit.get("description").toString().length > 100) {
            toast.error("Za duży opis");
            return;
        }
        if (!formDataToSubmit.get("name") ||
            !formDataToSubmit.get("race") ||
            !formDataToSubmit.get("sex") ||
            !formDataToSubmit.get("age") ||
            !formDataToSubmit.get("behavior") ||
            !formDataToSubmit.get("weight")) {
            toast.error("Zaznacz wszystkie pola");
            return;
        }

        try {
            if (isNewPet) {
                await addDoc(collection(db, "Pets"), {
                    name: formDataToSubmit.get("name"),
                    race: formDataToSubmit.get("race"),
                    sex: formDataToSubmit.get("sex"),
                    age: formDataToSubmit.get("age"),
                    behavior: formDataToSubmit.get("behavior"),
                    weight: formDataToSubmit.get("weight"),
                    description: formDataToSubmit.get("description"),
                    userID: currentUser.uid
                });
                toast.success(`${formDataToSubmit.get("name")} dodano do bazy`);
            } else {
                const petDoc = doc(db, "Pets", queryParams.petId);
                await updateDoc(petDoc, {
                    name: formDataToSubmit.get("name"),
                    race: formDataToSubmit.get("race"),
                    sex: formDataToSubmit.get("sex"),
                    age: formDataToSubmit.get("age"),
                    behavior: formDataToSubmit.get("behavior"),
                    weight: formDataToSubmit.get("weight"),
                    description: formDataToSubmit.get("description")
                });
                toast.success(`${formDataToSubmit.get("name")} zaktualizowano`);
            }
            navigate("/profile");
        } catch (error) {
            toast.error("Błąd wysyłania danych");
        }
    };

    const handleDelete = async () => {
        if (isNewPet) return; 
        try {
            const petDoc = doc(db, "Pets", queryParams.petId);
            await deleteDoc(petDoc);
            toast.success("Rekord został usunięty");
            navigate("/profile");
        } catch (error) {
            toast.error("Błąd usuwania danych");
        }
    };

    return (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
            <input 
                className={styles.inputName} 
                name="name" 
                placeholder="WPISZ IMIĘ ZWIERZAKA" 
                value={formData.name} 
                onChange={handleChange} 
            />
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Rasa</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="dog" className={styles.singleRadio}>
                            <input 
                                id="dog" 
                                type="radio" 
                                name="race" 
                                value="dog" 
                                checked={isPies === 'dog'} 
                                onChange={handleChange} 
                            />Pies
                        </label>
                        <label htmlFor="cat" className={styles.singleRadio}>
                            <input 
                                id="cat" 
                                type="radio" 
                                name="race" 
                                value="cat" 
                                checked={isPies === 'cat'} 
                                onChange={handleChange} 
                            />Kot
                        </label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Płeć</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="male" className={styles.singleRadio}>
                            <input 
                                id="male" 
                                type="radio" 
                                name="sex" 
                                value="male" 
                                checked={formData.sex === 'male'} 
                                onChange={handleChange} 
                            />{sexOptions.male}
                        </label>
                        <label htmlFor="female" className={styles.singleRadio}>
                            <input 
                                id="female" 
                                type="radio" 
                                name="sex" 
                                value="female" 
                                checked={formData.sex === 'female'} 
                                onChange={handleChange} 
                            />{sexOptions.female}
                        </label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Wiek</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="young" className={styles.singleRadio}>
                            <input 
                                id="young" 
                                type="radio" 
                                name="age" 
                                value="young" 
                                checked={formData.age === 'young'} 
                                onChange={handleChange} 
                            />Młody
                        </label>
                        <label htmlFor="adult" className={styles.singleRadio}>
                            <input 
                                id="adult" 
                                type="radio" 
                                name="age" 
                                value="adult" 
                                checked={formData.age === 'adult'} 
                                onChange={handleChange} 
                            />Dorosły
                        </label>
                        <label htmlFor="old" className={styles.singleRadio}>
                            <input 
                                id="old" 
                                type="radio" 
                                name="age" 
                                value="old" 
                                checked={formData.age === 'old'} 
                                onChange={handleChange} 
                            />Stary
                        </label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Aktywność</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="lazyBehavior" className={styles.singleRadio}>
                            <input 
                                id="lazyBehavior" 
                                type="radio" 
                                name="behavior" 
                                value="lazyBehavior" 
                                checked={formData.behavior === 'lazyBehavior'} 
                                onChange={handleChange} 
                            />Leniuch
                        </label>
                        <label htmlFor="averageBehavior" className={styles.singleRadio}>
                            <input 
                                id="averageBehavior" 
                                type="radio" 
                                name="behavior" 
                                value="averageBehavior" 
                                checked={formData.behavior === 'averageBehavior'} 
                                onChange={handleChange} 
                            />Średniak
                        </label>
                        <label htmlFor="crazyBehavior" className={styles.singleRadio}>
                            <input 
                                id="crazyBehavior" 
                                type="radio" 
                                name="behavior" 
                                value="crazyBehavior" 
                                checked={formData.behavior === 'crazyBehavior'} 
                                onChange={handleChange} 
                            />Wariat
                        </label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Waga</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="weight0" className={styles.singleRadio}>
                            <input 
                                id="weight0" 
                                type="radio" 
                                name="weight" 
                                value="weight0" 
                                checked={formData.weight === 'weight0'} 
                                onChange={handleChange} 
                            />{weightOptions.weight0}
                        </label>
                        <label htmlFor="weight1" className={styles.singleRadio}>
                            <input 
                                id="weight1" 
                                type="radio" 
                                name="weight" 
                                value="weight1" 
                                checked={formData.weight === 'weight1'} 
                                onChange={handleChange} 
                            />{weightOptions.weight1}
                        </label>
                        <label htmlFor="weight2" className={styles.singleRadio}>
                            <input 
                                id="weight2" 
                                type="radio" 
                                name="weight" 
                                value="weight2" 
                                checked={formData.weight === 'weight2'} 
                                onChange={handleChange} 
                            />{weightOptions.weight2}
                        </label>
                        <label htmlFor="weight3" className={styles.singleRadio}>
                            <input 
                                id="weight3" 
                                type="radio" 
                                name="weight" 
                                value="weight3" 
                                checked={formData.weight === 'weight3'} 
                                onChange={handleChange} 
                            />{weightOptions.weight3}
                        </label>
                        <label htmlFor="weight4" className={styles.singleRadio}>
                            <input 
                                id="weight4" 
                                type="radio" 
                                name="weight" 
                                value="weight4" 
                                checked={formData.weight === 'weight4'} 
                                onChange={handleChange} 
                            />{weightOptions.weight4}
                        </label>
                    </div>
                </div>
                <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                    <p className={styles.nameOfInput}>Uwagi</p>
                    <textarea 
                        id="description" 
                        className={styles.descriptionStyle} 
                        name="description" 
                        maxLength='100' 
                        placeholder="Tutaj wpisz dodatkowe uwagi. Przykładowo alergie/choroby/upodobania. Limit znaków 100" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <button className={styles.buttonToSave} type="submit"> Zapisz </button>
            {!isNewPet && (
                <button className={styles.buttonToSave} type="button" onClick={handleDelete}> Usuń zwierzaka </button>
            )}
        </form>
    );
}

export default InputDatapet;
