import React from 'react'
import SearchPetsitters from './SearchPetsitters/SearchPetsitters'
import ShowPetsitters from './ShowPetsitters/ShowPetsitters'
import styles from './Filter.module.scss'

const Filter = () => {
  return (
    <div className={styles.pageContainer}>
      <SearchPetsitters/>
      <ShowPetsitters/>
    </div>
  )
}

export default Filter
