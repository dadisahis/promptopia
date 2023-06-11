'use client'

import React,{useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname,useRouter } from 'next/navigation'
import "./prompcard.scss"
function PrompCard({post, handleTagClick, handleEdit, handleDelete}) {
  const {data: session} = useSession()
  const pathname =  usePathname()
  const [copied,setCopied]= useState(false)
  const handleCopy=()=>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=> setCopied(false), 3000)
  }
  return (
    <div className='prompt_card'>
      <div className='prompt_card_container'>
        <div
          className='prompt_top'
          onClick={()=>{}}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='user_image'
          />

          <div className='prompt_user_details'>
            <h3 className='username'>
              {post.creator.username}
            </h3>
            <p className='email'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <div className="prompt_card_bottom">
        <p className='prompt_text'>{post.prompt}</p>
        <p
          className='prompt_tag'
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
        
      </div>
      {session.user.id === post.creator._id &&
          pathname==='/profile' && (
            <div className="prompt_btn_container">
              <p className="edit" onClick={handleEdit}>Edit</p> 
              <p>|</p>
              <p className='delete' onClick={handleDelete}>Delete</p>

            </div>
          )
      }
    </div>
  )
}

export default PrompCard