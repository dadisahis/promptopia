"use client"
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import {signIn,signOut, useSession, getProviders } from 'next-auth/react'
import "./nav.scss"
function Nav() {
  const isUserLoggedIn = true;
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  console.log(session)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <nav className='navbar'>
        <Link href='/' className='nav_left'>
            <Image 
            src='/assets/images/logo.svg'
            alt='Promptopio Logo'
            width={30}
            height={30}
            className='logo_img'
            />
            <p className='logo_text'>Promptopia</p>

        </Link>
        <div className='nav_right'>
        {session?.user ? (
          <div className='nav_right_container'>
            <Link href='/create-prompt' className='black_btn'>
              <p>Create Prompt</p>
            </Link>

            <button type='button' onClick={signOut} className='white_btn'>
              <p>Sign Out</p>
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='profile_image'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                   signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
               ))} 
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav