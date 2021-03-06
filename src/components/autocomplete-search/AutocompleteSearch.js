import './AutocompleteSearch.css'
import { useState, memo, useCallback, useRef, useEffect } from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

function AutocompleteSearch ({ onSearchTriggered, results }) {
  const timeoutId = useRef()
  const [autocompleteState, setAutocompleteState] = useState({
    isResultsShown: true,
    highlightedItemIdx: -1
  })
  useEffect(() => {
    const $body = document.querySelector('body')
    const handleBodyClicked = (e) => {
      setAutocompleteState(autocompleteState => ({ ...autocompleteState, isResultsShown: false }))
    }
    $body.addEventListener('click', handleBodyClicked)
    return () => {
      $body.removeEventListener('click', handleBodyClicked)
    }
  }, [])
  const handleInputClicked = useCallback(e => {
    e.stopPropagation()
    if (!autocompleteState.isResultsShown) {
      setAutocompleteState((autocompleteState) => ({ ...autocompleteState, isResultsShown: true }))
    }
  }, [setAutocompleteState, autocompleteState])

  const handleMouseEnter = useCallback(index => e => {
    setAutocompleteState((autocompleteState) => ({ ...autocompleteState, highlightedItemIdx: index }))
  }, [])

  const handleKeyDown = useCallback(async (event) => {
    if (timeoutId) {
      // debounce the event
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(() => {
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
      } else if (key === 13) {
        // enter key
        window.open(results[autocompleteState.highlightedItemIdx].html_url, '_blank')
      } else {
      // use the query to make request to github api
        onSearchTriggered(event.target.value)
        setAutocompleteState((autocompleteState) => ({ ...autocompleteState, isResultsShown: true, highlightedItemIdx: 0 }))
      }
    }, 100)
  }, [autocompleteState.highlightedItemIdx, setAutocompleteState, onSearchTriggered, results])

  return (
    <div className='search-wrapper'>
      <SearchInput
        onInputClicked={handleInputClicked}
        onKeyDown={handleKeyDown}
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
