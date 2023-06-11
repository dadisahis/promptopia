import React from 'react'
import Link from 'next/link'
import "./form.scss"
function Form({
    type,
    post,
    setPost,
    submitting,
    handleSubmit
    }) {
  return (
    <div className='form'>
        <h1>{type} Post</h1>
        <p className="subtitle">
            {type} and share amazing prompts with the world and let yuor imagination run wild with any AI-powered platform
        </p>
        <form
        onSubmit={handleSubmit}
        className='form_container'
      >
        <label>
          <span className='prompt_label'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='tag_label'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='btn_container'>
          <button href='/' className='white_btn'>
            Cancel
          </button>

          <button
            type='submit'
            disabled={submitting}
            className='black_btn'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form