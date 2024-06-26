import React, { useEffect, useState } from 'react'


function PetInfo() {

const [userHasPets, setUserHasPets] = useState(null)

useEffect(()=>{
  //tutaj sprawdzam czy w kolekcji pets istnieje dokument, który zawiera userId = currentUser.uid
  //jeśli tak to ustawiam useState na true, jeśli nie to na false
})
  return (
//jeśli userHasPets jest true tozaciągam dane z bazy i wyświetlam imię zwierzaka/zwierzaków, które są linkami do formularza addPet
//jeśli userHasPets jest false lub falsy to wyświetlam przycisk dodaj zwierzaka, który przekierowuje na formularz addPet
    <div>
      {userHasPets ? 
      (<div>
    
      </div>)
      :
      (<div>

      </div>)}
    </div>  
   )
}

export default PetInfo
