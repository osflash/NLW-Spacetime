import React from 'react'

interface ButtonProps {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>
}
