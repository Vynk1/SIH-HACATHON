import React, { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center sm:justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-white tracking-wide">
          Alumni<span className="text-blue-400">Connect</span>
        </div>

        {/* Nav Links */}
        <ul className="hidden sm:flex gap-6 md:gap-12 list-none p-0 m-0">
          {[
            { name: "About", href: "#about" },
            { name: "Statistics", href: "#stats" },
            { name: "Testimonials", href: "#testimonials" },
            { name: "Our Team", href: "#team" },
          ].map((item, index) => (
            <li
              key={index}
              className="relative cursor-pointer font-medium text-white hover:text-blue-400 transition-colors duration-300 group"
            >
              <a href={item.href}>{item.name}</a>
              {/* Underline hover effect */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(v => !v)} className="sm:hidden text-white focus:outline-none">☰</button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden bg-black/80 backdrop-blur-md">
          <ul className="flex flex-col gap-4 px-6 py-4">
            {[
              { name: "About", href: "#about" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Our Team", href: "#team" },
            ].map((item, index) => (
              <li key={index}>
                <a href={item.href} className="block text-white py-1">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
