'use client'

import React, { useEffect, useState } from 'react'
import './feed.scss'
import PrompCard from './PrompCard'
export const PromptCardList = ({data, handleTagClick}) =>{
    console.log(data)
    return (
        <div className='prompt_layout'>
            
            {data.map((post)=>(
                <PrompCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

function Feed() {
    const [searchText, setSearchText] = useState('')
    const [posts,setPosts] = useState([])
    const [searchResults,setSearchResults]= useState([])
    const [searchTimeout,setSearchTimeout] = useState(null)
    const handleSearchChange = (e)=>{
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)
        setSearchTimeout(
            setTimeout(()=> {
                const searchResult = filterPrompts(e.target.value)
                setSearchResults(searchResult)
            }, 500)
        )  
    }
    const fetchPosts = async () =>{
        const resp = await fetch('/api/prompt')
        const data = await resp.json()
        setPosts(data)
    }
    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText,'i')
        return posts.filter((item)=>
            regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
        )
    }
    const handleTagClick = (tag)=>{
        setSearchText(tag)
        const searchResult = filterPrompts(tag)
        setSearchResults(searchResult)

    }
    useEffect(()=>{
        fetchPosts()
    },[])

    
  return (
    <div className='feed'>
        <form className='search_form'>
            <input 
            type="text" 
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input'
            />
        </form>
        {
            searchText ? 
            <PromptCardList 
            data={searchResults}
            handleTagClick={handleTagClick}
        />
            :

        <PromptCardList 
            data={posts}
            handleTagClick={handleTagClick}
        />
        }
    </div>
  )
}

export default Feed