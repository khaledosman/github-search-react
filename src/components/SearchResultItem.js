import React, { memo } from 'react'
import './SearchResultItem.css'

export default memo(function SearchResultItem ({ onMouseEnter, className, item }) {
  return (
    <a
      href={item.html_url} target='_blank' rel='noreferrer'
      key={item.id}
      className={className}
      onMouseEnter={onMouseEnter}
    >
      <img className='search-results__item__image' src={item.avatar_url} alt='item logo' />
      <div className='search-results__item__text'> {item.login} </div>
    </a>
  )
})
