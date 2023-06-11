import React from 'react'
import "./profile.scss"
import PrompCard from './PrompCard'

function Profile({
    name,
    desc,
    data,
    handleEdit,
    handleDelete
}) {
  return (
    <div className='profile_page'>
        <h1>{name} Profile</h1>
        <p>{desc}</p>
        <div className='prompt_layout'>
            {data.map((post)=>(
                <PrompCard
                    key={post._id}
                    post={post}
                    handleDelete={()=> handleDelete && handleDelete(post)}
                    handleEdit={()=> handleEdit && handleEdit(post)}
                />
            ))}
        </div>
    </div>
  )
}

export default Profile