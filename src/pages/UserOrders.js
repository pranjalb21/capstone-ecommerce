import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrder from '../features/user/components/UserOrder'

function UserOrders() {
  return (
    <Navbar>
      <h1 className='mb-3 ml-7 text-xl'>My orders</h1>
      <UserOrder />
    </Navbar>
  )
}

export default UserOrders
