// import React, { useState } from 'react'
// import styles from './SearchPetsitters.module.scss'
// import getPetData from '../../../hooks/getPetData'
// import useAuth from '../../../context/AuthContext'
// import MultiRangeSlider from "multi-range-slider-react";

// const SearchPetsitters = () => {
//   const [formData, setFormData] = useState({
//     petName: '',
//     serviceType: '',
//     city: '',
//     startDate: '',
//     endDate: '',
//     priceRange: {
//       minValue: 0,
//       maxValue: 200
//     }
//   });
//   const {currentUser} = useAuth() || {}
//   const petsArr = getPetData(currentUser.uid)
//   const [minValue, set_minValue] = useState(0);
//   const [maxValue, set_maxValue] = useState(200)

//   const handlePriceChange = (e: { minValue: number; maxValue: number }) => {
//     setFormData({
//       ...formData,
//       priceRange: {
//         minValue: e.minValue,
//         maxValue: e.maxValue
//       }
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

   
//     console.log(formData);
//   };

//   return (
// <div className={styles.pageContainer}>
//   <h1>Wyszukaj opiekuna</h1>
//   <form className={styles.form} onSubmit={handleSubmit}>

//     <label>
//       Imię zwierzaka
//       <select>
//         {petsArr.length >= 1 && petsArr.map((pet)=> (<option key={pet.id}>{pet.name}</option>))}
//       </select>
//     </label>

//     <label>
//       Rodzaj usługi
//       <label><input type='radio' name='offer' value='walk'/> Spacer </label>
//       <label><input type='radio' name='offer' value='accom'/> Nocleg </label>
//       <label><input type='radio' name='offer' value='homeVisit'/> Wizyta domowa </label>
//     </label>

//     <label>
//       Miasto
//       <input type='text'/>
//     </label>
//     <label>
//       Termin
//       <input type='date' name='startDate'/>
//       <input type='date' name='endDate'/>
//     </label>

//     <label>
//       Cena
//       <MultiRangeSlider
// 			min={0}
// 			max={200}
// 			step={10}
// 			minValue={minValue}
// 			maxValue={maxValue}
// 			onInput={(e) => {
// 				handleInput(e);
// 			}}
// 		/>
//     </label>
//   </form>
//   <button type='submit'>Wyszukaj</button>
// </div>
//   )
// }

// export default SearchPetsitters

import React, { useState } from 'react';
import styles from './SearchPetsitters.module.scss';
import getPetData from '../../../hooks/getPetData';
import useAuth from '../../../context/AuthContext';
import MultiRangeSlider from 'multi-range-slider-react';

const SearchPetsitters = () => {
  const { currentUser } = useAuth() || {};
  const petsArr = getPetData(currentUser.uid);

  // Stan do przechowywania danych formularza
  const [formData, setFormData] = useState({
    petName: '',
    serviceType: '',
    city: '',
    startDate: '',
    endDate: '',
    minValue: 0,
    maxValue: 200
  });

  // Funkcja obsługująca zmianę wartości w formularzu dla  suwaka
  const handlePriceChange = (e: { minValue: number; maxValue: number }) => {
    setFormData({
      ...formData,
      minValue: e.minValue,
      maxValue: e.maxValue
    });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(formData);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Wyszukaj opiekuna</h1>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label>
          Imię zwierzaka
          <select name="petName" onChange={handleChange}>
            {petsArr.length >= 1 && petsArr.map((pet) => (<option key={pet.id} value={pet.name}>{pet.name}</option>))}
          </select>
        </label>

        <label>
          Rodzaj usługi
          <label><input type='radio' name='serviceType' value='walk' onChange={handleChange} checked={formData.serviceType === 'walk'} /> Spacer </label>
          <label><input type='radio' name='serviceType' value='accom' onChange={handleChange} checked={formData.serviceType === 'accom'} /> Nocleg </label>
          <label><input type='radio' name='serviceType' value='homeVisit' onChange={handleChange} checked={formData.serviceType === 'homeVisit'} /> Wizyta domowa </label>
        </label>

        <label>
          Miasto
          <input type='text' name='city' value={formData.city} onChange={handleChange} />
        </label>

        <label>
          Termin
          <input type='date' name='startDate' value={formData.startDate} onChange={handleChange} />
          <input type='date' name='endDate' value={formData.endDate} onChange={handleChange} />
        </label>

        <label>
          Cena
          <MultiRangeSlider
            min={0}
            max={200}
            step={10}
            minValue={formData.minValue}
            maxValue={formData.maxValue}
            onInput={handlePriceChange}
          />
        </label>

        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
};

export default SearchPetsitters;
