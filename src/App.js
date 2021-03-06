import './App.css'
import { useState, memo, useCallback } from 'react'
import { searchUsers, debounce } from './helpers/github-api-helpers'
import { ReactComponent as SearchIcon } from './assets/search-icon.svg'

function App () {
  const [githubUsers, setGithubUsers] = useState([])
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
      setAutocompleteState({ ...autocompleteState, highlightedResultIndex: autocompleteState.highlightedResultIndex >= githubUsers.length - 1 ? autocompleteState.highlightedResultIndex : autocompleteState.highlightedResultIndex + 1 })
    } else {
      // use the query to make request to github api
      const { items } = await searchUsers(event.target.value)
      setGithubUsers(items)
      setAutocompleteState({ ...autocompleteState, isResultsShown: true })
    }
  }

  const debouncedHandleKeyDown = e => debounce(() => handleKeyDown(e), 100)

  return (
    <div className='app'>
      <div className='search-wrapper'>
        <div className='search-input-wrapper'>
          <SearchIcon fill='#ffffff' className='search-input-wrapper__icon' />
          <input
            autoComplete='off' name='browser'
            placeholder='type a github username...'
            onKeyDown={debouncedHandleKeyDown}
            onClick={handleInputClicked}
            className='search-input'
          />
        </div>
        {
        autocompleteState.isResultsShown && githubUsers.length > 0 && <div className='search-results'>
          {githubUsers.length > 0 && githubUsers.map((user, index) => {
            const classes = `search-results__item ${index === autocompleteState.highlightedResultIndex ? 'search-results__item--highlighted' : null}`
            return (
              <a href={user.html_url} target='_blank' rel='noreferrer' key={user.id} className={classes} onMouseEnter={handleMouseEnter(index)}>
                <img className='search-results__item__image' src={user.avatar_url} alt='user logo' />
                <div className='search-results__item__text'> {user.login} </div>
              </a>
            )
          }
          )}
        </div>
        }
      </div>
      <div className='content-wrapper'>
        <p>Some content here</p>
      </div>
    </div>
  )
}

export default memo(App)
