import { useState } from "react";
import styles from "./inputDataPet.module.scss";
import toast from 'react-hot-toast';
import useAuth from "../../../context/AuthContext"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../utils/firebase"
import {  useNavigate } from 'react-router-dom';

function InputDatapet() {
    const navigate = useNavigate();
    const { currentUser } = useAuth() || {};
    const [isPies, czyWybranoPsa ] = useState('');
    const [sexOptions, setSex] = useState({
        male: 'Pies/Kocur',
        female: 'Suka/Kocica'
    });
    const [weightOptions, setWeight] = useState({
        weight0: "<5kg",
        weight1: "5-10kg",
        weight2: "10-15kg",
        weight3: "15-20kg",
        weight4: `20>kg`
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
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
            })
        } else if (value === 'cat') {
            setSex({
                male: 'Kot',
                female: 'Kocica'
            });
            setWeight({
                weight0: "<2kg",
                weight1: "2-4kg",
                weight2: "4-6kg",
                weight3: "6-10kg",
                weight4: `10>kg`
            })
        }
    };

    
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const data = {
            name: formData.get("name"),
            race: formData.get("race"),
            sex: formData.get("sex"),
            age: formData.get("age"),
            behavior: formData.get("behavior"),
            weight: formData.get("weight"),
            description: formData.get("description"),
            userID: currentUser.uid
        };
        if(formData.get("name") === ''){
            toast.error("Podaj imię zwierzaka")
            return
        }
        if (formData.get("name").toString().length < 2) {
            toast.error("Imie musi zawierać przynajmniej dwie litery")
            return
        }
        if(formData.get("description").toString().length > 100){
            toast.error("Za duży opis")
            return
        }
        if (!formData.get("name") || 
            !formData.get("race") || 
            !formData.get("sex") || 
            !formData.get("age") || 
            !formData.get("behavior") || 
            !formData.get("weight")) {
            toast.error("Zaznacz wszystkie pola");
            return;
        }
        console.log("Form Data Submitted: ", data);
        try {
            await addDoc(collection(db, "Pets"), { 
                name: formData.get("name"),
                race: formData.get("race"),
                sex: formData.get("sex"),
                age: formData.get("age"),
                behavior: formData.get("behavior"),
                weight: formData.get("weight"),
                description: formData.get("description"),
                userID: currentUser.uid
             });
            toast.success(`${formData.get("name")} dodano do konta bazy`);
            navigate("/profile");
        } catch (error) {
            toast.error("Błąd wysyłania danych");
        }
        
    };

    return (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
            <input className={styles.inputName} name="name" placeholder="WPISZ IMIĘ ZWIERZAKA"></input>
            <div className={styles.inputContainer}>

                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>isPies</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="dog" className={styles.singleRadio}><input id="dog" type="radio" name="race" value="dog" checked={isPies === 'dog'} onChange={handleChange} />Pies</label>
                        <label htmlFor="cat" className={styles.singleRadio}><input id="cat" type="radio" name="race" value="cat" checked={isPies === 'cat'} onChange={handleChange} />Kot</label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Płeć</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="male" className={styles.singleRadio}><input id="male" type="radio" name="sex" value="male" />{sexOptions.male}</label>
                        <label htmlFor="female" className={styles.singleRadio}><input id="female" type="radio" name="sex" value="female" />{sexOptions.female}</label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Wiek</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="young" className={styles.singleRadio}><input id="young" type="radio" name="age" value="young" />Młody</label>
                        <label htmlFor="adult" className={styles.singleRadio}><input id="adult" type="radio" name="age" value="adult" />Dorosły</label>
                        <label htmlFor="old" className={styles.singleRadio}><input id="old" type="radio" name="age" value="old" />Stary</label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Aktywność</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="lazyBehavior" className={styles.singleRadio}><input id="lazyBehavior" type="radio" name="behavior" value="lazyBehavior" />Leniuch</label>
                        <label htmlFor="averageBehavior" className={styles.singleRadio}><input id="averageBehavior" type="radio" name="behavior" value="averageBehavior" />Średniak</label>
                        <label htmlFor="crazyBehavior" className={styles.singleRadio}><input id="crazyBehavior" type="radio" name="behavior" value="crazyBehavior" />Wariat</label>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <p className={styles.nameOfInput}>Waga</p>
                    <div className={styles.inputSelectWrapper}>
                        <label htmlFor="weight0" className={styles.singleRadio}><input id="weight0" type="radio" name="weight" value="weight0" />{weightOptions.weight0}</label>
                        <label htmlFor="weight1" className={styles.singleRadio}><input id="weight1" type="radio" name="weight" value="weight1" />{weightOptions.weight1}</label>
                        <label htmlFor="weight2" className={styles.singleRadio}><input id="weight2" type="radio" name="weight" value="weight2" />{weightOptions.weight2}</label>
                        <label htmlFor="weight3" className={styles.singleRadio}><input id="weight3" type="radio" name="weight" value="weight3" />{weightOptions.weight3}</label>
                        <label htmlFor="weight4" className={styles.singleRadio}><input id="weight4" type="radio" name="weight" value="weight4" />{weightOptions.weight4}</label>
                    </div>
                </div>
                <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                    <p className={styles.nameOfInput}>Uwagi</p>
                    <textarea id="description" className={styles.descriptionStyle} name="description" maxlength='100' placeholder="Tutaj wpisz dodatkowe uwagi. 
Przykładowo 
alergie/choroby/upodobania
Limit znaków 100" />
                </div>
            </div>
            <button className={styles.buttonToSave} type="submit"> Zapisz </button>
        </form>
    );
}

export default InputDatapet;
