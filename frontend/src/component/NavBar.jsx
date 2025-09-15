import React from "react";

const NavBar = () => {
  const [active, setActive] = React.useState("#about");
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
      const sections = ["#about", "#stats", "#testimonials", "#team"];
      let current = "#about";
      let minDelta = Infinity;
      sections.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const delta = Math.abs(rect.top - 80);
        if (rect.top <= window.innerHeight - 120 && delta < minDelta) {
          minDelta = delta;
          current = sel;
        }
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md ${isScrolled ? "bg-black/60 shadow-lg" : "bg-black/40 shadow-md"}`}>
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
              className={`relative cursor-pointer font-medium transition-colors duration-300 group ${active === item.href ? "text-blue-400" : "text-white hover:text-blue-400"}`}
            >
              <a href={item.href}>{item.name}</a>
              {/* Underline hover and active effect */}
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${active === item.href ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="sm:hidden text-white focus:outline-none">☰</button>
      </div>
    </nav>
  );
};

export default NavBar;
