import './AutocompleteSearch.css'
import { useState, memo, useCallback } from 'react'
import { debounce } from '../helpers/github-api-helpers'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

function AutocompleteSearch ({ onSearchTriggered, results }) {
  const [autocompleteState, setAutocompleteState] = useState({
    isResultsShown: true,
    highlightedItemIdx: -1
  })

  const handleInputClicked = useCallback(e => {
    setAutocompleteState((autocompleteState) => ({ ...autocompleteState, isResultsShown: true }))
  }, [setAutocompleteState])

  const handleMouseEnter = useCallback(index => e => {
    setAutocompleteState((autocompleteState) => ({ ...autocompleteState, highlightedItemIdx: index }))
  }, [])

  const handleKeyDown = useCallback(async (event) => {
    const key = event.which

    if (key === 27) {
      // esc key
      setAutocompleteState((autocompleteState) => ({
        ...autocompleteState,
        isResultsShown: false
      }))
    } else if (key === 38) {
      // arrow down
      setAutocompleteState((autocompleteState) => ({
        ...autocompleteState,
        highlightedItemIdx: autocompleteState.highlightedItemIdx === 0 ? autocompleteState.highlightedItemIdx : autocompleteState.highlightedItemIdx - 1
      }))
    } else if (key === 40) {
      // arrow up
      setAutocompleteState((autocompleteState) => ({
        ...autocompleteState,
        highlightedItemIdx: autocompleteState.highlightedItemIdx >= results.length - 1 ? autocompleteState.highlightedItemIdx : autocompleteState.highlightedItemIdx + 1
      }))
    } else {
      // use the query to make request to github api
      onSearchTriggered(event.target.value)
      setAutocompleteState((autocompleteState) => ({ ...autocompleteState, isResultsShown: true }))
    }
  }, [setAutocompleteState, onSearchTriggered, results.length])

  const debouncedHandleKeyDown = useCallback(e => debounce(() => handleKeyDown(e), 200), [handleKeyDown])

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
          highlightedItemIndex={autocompleteState.highlightedItemIdx}
          onMouseEnter={handleMouseEnter}
        />}
    </div>

  )
}

export default memo(AutocompleteSearch)
