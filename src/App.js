import React, { memo, useState, useCallback } from 'react'
import { searchUsers } from './helpers/github-api-helpers'
import AutocompleteSearch from './components/autocomplete-search/AutocompleteSearch'
import './App.css'

export default memo(function App () {
  const [githubUsers, setGithubUsers] = useState([])

  const handleSearchTriggered = useCallback(async query => {
    const { items } = await searchUsers(query)
    setGithubUsers(items)
  }, [setGithubUsers])

  return (
    <div className='app'>
      <AutocompleteSearch
        onSearchTriggered={handleSearchTriggered}
        results={githubUsers}
      />
      <div className='content-wrapper'>
        <p>Some content here</p>
      </div>
    </div>
  )
})
