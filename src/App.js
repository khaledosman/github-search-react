import React, { memo, useState } from 'react'
import { searchUsers } from './helpers/github-api-helpers'
import AutocompleteSearch from './components/AutocompleteSearch'
import './App.css'

export default memo(function App () {
  const [githubUsers, setGithubUsers] = useState([])

  const handleSearchTriggered = async query => {
    const { items } = await searchUsers(query)
    setGithubUsers(items)
  }

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
