import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold">Alumni<span className="text-blue-400">Connect</span></h3>
            <p className="text-white/70 mt-2 text-sm max-w-md">Building stronger bonds between students and alumni through mentorship, events, and opportunities.</p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Github" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><FaGithub /></a>
            <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><FaLinkedin /></a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><FaTwitter /></a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/60">
          <span>© {new Date().getFullYear()} AlumniConnect. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
