import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 flex items-center justify-center">
      <p className='text-center'>Copyright &copy; {currentYear} Get me a Chai - Fund your projects with Chai - All rights reserved</p>
    </footer>
  )
}

export default Footer