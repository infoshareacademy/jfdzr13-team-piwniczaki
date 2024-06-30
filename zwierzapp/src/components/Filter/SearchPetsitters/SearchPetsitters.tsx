
import React, { useState } from 'react';
import styles from './SearchPetsitters.module.scss';
import getPetData from '../../../hooks/getPetData';
import useAuth from '../../../context/AuthContext';
import MultiRangeSlider from 'multi-range-slider-react';
import { useParams } from 'react-router';

const SearchPetsitters = () => {
  const { currentUser } = useAuth() || {};
  const petsArr = getPetData(currentUser.uid);


  const [formData, setFormData] = useState({
    petName: '',
    serviceType: '',
    city: '',
    startDate: '',
    endDate: '',
    minValue: 0,
    maxValue: 200
  });

useParams
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
