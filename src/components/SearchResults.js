import React, { memo } from 'react'
import SearchResultItem from './SearchResultItem'
import './SearchResults.css'

export default memo(function SearchResults ({ results, highlightedItemIndex, onMouseEnter }) {
  return (
    <div className='search-results'>
      {results.length > 0 && results.map((result, index) => {
        const classes = `search-results__item ${index === highlightedItemIndex ? 'search-results__item--highlighted' : null}`
        return <SearchResultItem key={result.id} className={classes} item={result} onMouseEnter={onMouseEnter(index)} />
      }
      )}
    </div>
  )
})
