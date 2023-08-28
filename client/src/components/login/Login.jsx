import { Typography } from '@mui/material'
import React from 'react'
import { RoleSelector } from '../roleSelector/RoleSelector'

export const Login = () => {
  return (
    <div>
        <Typography variant='h3' textAlign="center">Welcome to MoneyTrack</Typography>
        <RoleSelector />
    </div>
  )
}
