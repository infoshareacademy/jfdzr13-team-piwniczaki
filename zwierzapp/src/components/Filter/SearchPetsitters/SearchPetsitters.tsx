import React, { useEffect, useState } from "react";
import styles from "./SearchPetsitters.module.scss";
import getPetData from "../../../hooks/getPetData";
import useAuth from "../../../context/AuthContext";
import MultiRangeSlider from "multi-range-slider-react";
import { useSearchParams } from "react-router-dom";

interface FormField {
  [key: string]: string | number;
}

const initialFormData: FormField[] = [
  { petName: "" },
  { serviceType: "" },
  { city: "" },
  { startDate: "" },
  { endDate: "" },
  { minValue: 1 },
  { maxValue: 200 },
];

const SearchPetsitters = () => {
  const [formData, setFormData] = useState<FormField>(initialFormData);
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth() || {};
  const petsArr = getPetData(currentUser.uid);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let initialSearchQuery = "";

    Object.keys(formData).forEach((paramName) => {
      if (formData[paramName]) {
        if (initialSearchQuery) {
          initialSearchQuery += `&${paramName}=${formData[paramName]}`;
        } else {
          initialSearchQuery += `${paramName}=${formData[paramName]}`;
        }
      }
    });

    setSearchParams(initialSearchQuery);
  }, []);

  const handlePriceChange = (e: {
    min: number;
    max: number;
    minValue: number;
    maxValue: number;
  }) => {
    setFormData({
      ...formData,
      minValue: Number(e.minValue),
      maxValue: Number(e.maxValue),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPetId = e.target.value;
    const selectedPet = petsArr.find((pet) => pet.id === selectedPetId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = new FormData(e.target as HTMLFormElement);

    let searchQuery = "";

    formValues.entries().forEach(([paramName, paramValue]) => {
      if (paramValue) {
        if (searchQuery) {
          searchQuery += `&${paramName}=${paramValue}`;
        } else {
          searchQuery += `${paramName}=${paramValue}`;
        }
      }
    });

    if (formData.minValue) {
      if (searchQuery) {
        searchQuery += `&minValue=${formData.minValue}`;
      } else {
        searchQuery += `minValue=${formData.minValue}`;
      }
    }

    if (formData.maxValue) {
      if (searchQuery) {
        searchQuery += `&minValue=${formData.maxValue}`;
      } else {
        searchQuery += `minValue=${formData.maxValue}`;
      }
    }

    setSearchParams(new URLSearchParams(searchQuery));
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Wyszukaj opiekuna</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Imię zwierzaka
          <select name="petName" onChange={handleChange}>
            {petsArr.length >= 1 &&
              petsArr.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Rodzaj usługi
          <label>
            <input
              type="radio"
              name="serviceType"
              value="walk"
              onChange={handleChange}
              checked={formData.serviceType === "walk"}
            />{" "}
            Spacer{" "}
          </label>
          <label>
            <input
              type="radio"
              name="serviceType"
              value="accom"
              onChange={handleChange}
              checked={formData.serviceType === "accom"}
            />{" "}
            Nocleg{" "}
          </label>
          <label>
            <input
              type="radio"
              name="serviceType"
              value="homeVisit"
              onChange={handleChange}
              checked={formData.serviceType === "homeVisit"}
            />{" "}
            Wizyta domowa{" "}
          </label>
        </label>

        <label>
          Miasto
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>

        <label>
          Termin
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            min={currentDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            min={currentDate}
            onChange={handleChange}
          />
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
