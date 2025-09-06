import React from 'react'

const NavBar = () => {
  return (
          <nav className="fixed top-0 left-0 w-full z-20 flex justify-center py-5">
        <ul className="flex w-2/5 justify-between list-none p-0 m-0">
          <li className="cursor-pointer font-medium hover:text-blue-400 transition-colors duration-300">
            About Us
          </li>
          <li className="cursor-pointer font-medium hover:text-blue-400 transition-colors duration-300">
            Statistics
          </li>
          <li className="cursor-pointer font-medium hover:text-blue-400 transition-colors duration-300">
            Testimonials
          </li>
          <li className="cursor-pointer font-medium hover:text-blue-400 transition-colors duration-300">
            Our Team
          </li>
        </ul>
      </nav>
  )
}

export default NavBar
