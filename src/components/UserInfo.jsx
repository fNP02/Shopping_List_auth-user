import React from 'react'
import { useAuth } from '../store/UserAuth'

export const UserInfo = () => {
    const {currentUser, currentUserPermissions}=useAuth()

  return (
    <div>
        <h2>User Information</h2>
        <p><b>Email: </b> {currentUser?.email||'-'}</p>
        <p><b>Permission: </b> {currentUserPermissions?.rol||'-'}</p>
    </div>
  )
}
