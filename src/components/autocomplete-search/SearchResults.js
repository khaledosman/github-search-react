import React, { memo } from 'react'
import SearchResultItem from './SearchResultItem'
import './SearchResults.css'

export default memo(function SearchResults ({ results, highlightedItemIndex, onMouseEnter }) {
  return (
    <div className='search-results'>
      {results.length > 0 && results.map((result, index) => {
        return <SearchResultItem key={result.id} isHighlighted={index === highlightedItemIndex} item={result} onMouseEnter={onMouseEnter(index)} />
      }
      )}
    </div>
  )
})
