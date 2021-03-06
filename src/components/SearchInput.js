import React, { memo } from 'react'
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import './SearchInput.css'

export default memo(function SearchInput ({ onInputClicked, onKeyDown, placeholder }) {
  return (
    <div className='search-input-wrapper'>
      <SearchIcon fill='#ffffff' className='search-input-wrapper__icon' />
      <input
        autoComplete='off'
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onClick={onInputClicked}
        className='search-input'
      />
    </div>
  )
})
