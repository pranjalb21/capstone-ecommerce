import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

function UserProfilePage() {
  return (
    <Navbar>
      <h1 className='mb-3 ml-7 text-xl'>My profile</h1>
      <UserProfile />
    </Navbar>
  )
}

export default UserProfilePage
