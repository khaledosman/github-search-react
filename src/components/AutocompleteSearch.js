import './AutocompleteSearch.css'
import { useState, memo } from 'react'
import { debounce } from '../helpers/github-api-helpers'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

function AutocompleteSearch ({ onSearchTriggered, results }) {
  const [autocompleteState, setAutocompleteState] = useState({
    isResultsShown: true,
    highlightedResultIndex: -1
  })

  const handleInputClicked = e => {
    setAutocompleteState({ ...autocompleteState, isResultsShown: true })
  }

  const handleMouseEnter = index => e => {
    setAutocompleteState({ ...autocompleteState, highlightedResultIndex: index })
  }

  const handleKeyDown = async (event) => {
    const key = event.which

    if (key === 27) {
      // esc key
      setAutocompleteState({
        ...autocompleteState,
        isResultsShown: false
      })
    } else if (key === 38) {
      // arrow down
      setAutocompleteState({ ...autocompleteState, highlightedResultIndex: autocompleteState.highlightedResultIndex === 0 ? autocompleteState.highlightedResultIndex : autocompleteState.highlightedResultIndex - 1 })
    } else if (key === 40) {
      // arrow up
      setAutocompleteState({ ...autocompleteState, highlightedResultIndex: autocompleteState.highlightedResultIndex >= results.length - 1 ? autocompleteState.highlightedResultIndex : autocompleteState.highlightedResultIndex + 1 })
    } else {
      // use the query to make request to github api
      onSearchTriggered(event.target.value)
      setAutocompleteState({ ...autocompleteState, isResultsShown: true })
    }
  }

  const debouncedHandleKeyDown = e => debounce(() => handleKeyDown(e), 200)

  return (
    <div className='search-wrapper'>
      <SearchInput
        onInputClicked={handleInputClicked}
        onKeyDown={debouncedHandleKeyDown}
        placeholder='type a github username...'
      />
      {autocompleteState.isResultsShown && results.length > 0 &&
        <SearchResults
          results={results}
          highlightedItemIndex={autocompleteState.highlightedResultIndex}
          onMouseEnter={handleMouseEnter}
        />}
    </div>

  )
}

export default memo(AutocompleteSearch)
