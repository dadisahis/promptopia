
'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'

function EditPrompt() {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const searchParams = useSearchParams()
    const promptID = searchParams.get('id')

    useEffect(()=>{
        const getPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${promptID}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptID){
            getPromptDetails()
        }
    },[promptID])

    const updatePrompt = async (e)=>{
        e.preventDefault()
        setSubmitting(true)
        if (!promptID){
            return alert('Prompt ID not found')   
        }
        try{
            
            const resp = await fetch(`/api/prompt/${promptID}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (resp.ok){
                router.push('/')
            }
        }catch(error){
            console.log(error)
        }finally{
            setSubmitting(false)
        }

    }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit = {updatePrompt}
    />
  )
}

export default EditPrompt