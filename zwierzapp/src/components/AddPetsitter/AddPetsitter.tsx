import { useState } from 'react'
import styles from './addPetsitter.module.scss'

function AddPetsitter(){




    //ustawianie ceny oferta
  const [priceCheckboxes, setPriceCheckboxes] = useState({
    walk: false,
    accomodation: false,
    homeVisit: false,
  })
  const handleCheckbox = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     setPriceCheckboxes(prevState => ({
    //   ...prevState,
    //   [id]: !prevState[id]
    // }))
    }
  // ^ ustawianie ceny oferta
  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const dog = formData.get("dog") as string | null;
    const dog = formData.get("dog") as string | null;
    const dog = formData.get("dog") as string | null;
    const dog = formData.get("dog") as string | null;
    const dog = formData.get("dog") as string | null;
    const dog = formData.get("dog") as string | null;
    const dog = formData.get("dog") as string | null;
        
    }
  }

  return (
    <div className={styles.AddPetsitterPage}>
        <article className={styles.addPetsitterContainer}>
            <h1>Zostań petsitterem!</h1>
            <h2>Jakimi zwierzętami chcesz się opiekować?</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.ipnutWrapper}>
                    <label htmlFor="dog"><input id='dog' type='checkbox' name='race' value='dog'/>PIES</label>
                    <label htmlFor="cat"><input id='cat' type='checkbox' name='race' value='cat'/>KOT</label>

                </div>
                    
                <div className={styles.ipnutWrapper}>
                    <h3>Aktywność  Fizyczna</h3>
                    <div className={styles.dog}>
                        <label htmlFor="dogLazyActivity"><input id='dogLazyActivity' type='checkbox' name='activity' value='lazy'/>LENIUCH</label>
                        <label htmlFor="dogAverageActivity"><input id='dogAverageActivity' type='checkbox' name='activity' value='medium'/>ŚREDNIAK</label>
                        <label htmlFor="dogCrazyActivity"><input id='dogCrazyActivity' type='checkbox' name='activity' value='crazy'/>WARIAT</label>
                    </div>
                    <div className={styles.cat}>
                        <label htmlFor="catLazyActivity"><input id='catLazyActivity' type='checkbox' name='activity' value='lazy'/>LENIUCH</label>
                        <label htmlFor="catAverageActivity"><input id='catAverageActivity' type='checkbox' name='activity' value='medium'/>ŚREDNIAK</label>
                        <label htmlFor="catCrazyActivity"><input id='catCrazyActivity' type='checkbox' name='activity' value='crazy'/>WARIAT</label>
                    </div>

                </div>
                <div>
                    <h3>WAGA</h3>
                    <div className={styles.dog}>
                        <label htmlFor="dogWeight0"><input id='dogWeight0' type='checkbox' name='weight' value='&lt;5'/>&lt;5kg</label>
                        <label htmlFor="dogWeight1"><input id='dogWeight1' type='checkbox' name='weight' value='5-10'/>5-10kg</label>
                        <label htmlFor="dogWeight2"><input id='dogWeight2' type='checkbox' name='weight' value='10-15'/>10-15kg</label>
                        <label htmlFor="dogWeight3"><input id='dogWeight3' type='checkbox' name='weight' value='15-20'/>15-20kg</label>
                        <label htmlFor="dogWeight4"><input id='dogWeight4' type='checkbox' name='weight' value='20+'/>20+kg</label>
                    </div>
                    <div className={styles.cat}>
                        <label htmlFor="catWeight0"><input id='catWeight0' type='checkbox' name='weight' value='&lt;5'/>&lt;2kg</label>
                        <label htmlFor="catWeight1"><input id='catWeight1' type='checkbox' name='weight' value='5-10'/>2-4kg</label>
                        <label htmlFor="catWeight2"><input id='catWeight2' type='checkbox' name='weight' value='10-15'/>4-6kg</label>
                        <label htmlFor="catWeight3"><input id='catWeight3' type='checkbox' name='weight' value='15-20'/>6-10kg</label>
                        <label htmlFor="catWeight4"><input id='catWeight4' type='checkbox' name='weight' value='20+'/>10+kg</label>
                    </div>
                </div>
                <div>
                    <h3>Oferta </h3>
                    <label htmlFor="">
                        <input type='checkbox' id='walk' checked={priceCheckboxes} onChange={handleCheckbox}/>
                        {priceCheckboxes && (
                            <div>
                                <input type='number' id='walkPrice'/>
                                <span>PLN/h</span>
                            </div>
                        )}
                    Spacer</label>
                    <label htmlFor=""><input type='checkbox'id='accomodation'checked={priceCheckboxes} onChange={handleCheckbox}/>Nocleg</label>

                    <label htmlFor=""><input type='checkbox'id='homeVisit'checked={priceCheckboxes} onChange={handleCheckbox}/>Wizyta domowa</label>
                </div>
                <button type='submit'>ZAPISZ</button>
            </form>
        </article>
                    
    </div>
  )
}

export default AddPetsitter