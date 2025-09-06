import React from "react";
import avatar from "../assets/avatar1.png"; // temporary image
import emailIcon from "../assets/email.png"; // temporary image
import searchIcon from "../assets/search.png"; // temporary image
import bellIcon from "../assets/avatar2.png"; // temporary image
import menuIcon from "../assets/avatar3.png"; // temporary image

const Profile = () => {
  return (
    <div className="flex h-screen w-screen font-[Poppins] bg-gradient-to-b from-[#0f1d2f] to-[#2b9ec0] text-white">
      
      {/* Sidebar */}
      <aside className="w-[60px] bg-black/20 p-5 flex flex-col items-center gap-6">
        <div className="flex flex-col gap-6">
          <img src={menuIcon} alt="menu" className="w-6 h-6 cursor-pointer" />
          <img src={menuIcon} alt="time" className="w-6 h-6 cursor-pointer" />
          <img src={menuIcon} alt="profile" className="w-6 h-6 cursor-pointer" />
          <img src={menuIcon} alt="job" className="w-6 h-6 cursor-pointer" />
          <img src={menuIcon} alt="settings" className="w-6 h-6 cursor-pointer" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col">
        
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[30px] font-semibold">Welcome, John</h2>
            <p className="text-[17px] -mt-2">Tue, 07 June 2022</p>
          </div>

          <div className="flex items-center bg-white rounded-md px-3 py-2 text-black w-[300px]">
            <img src={searchIcon} alt="search" className="w-4 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 border-none outline-none text-sm bg-white"
            />
          </div>

          <img src={bellIcon} alt="bell" className="w-6 h-6" />
        </header>

        {/* Profile Section */}
        <section>
          {/* User Info */}
          <div className="flex items-center gap-5 mb-4">
            <img src={avatar} alt="John" className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold">John</h3>
              <p className="text-sm text-gray-200">john@gmail.com</p>
            </div>
            <button className="ml-auto mr-16 text-lg w-[100px] py-2 bg-blue-500 text-white rounded-md">
              Edit
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { label: "Full Name", placeholder: "Enter name" },
              { label: "Degree", placeholder: "Your degree" },
              { label: "Email", placeholder: "Your email" },
              { label: "Contact", placeholder: "Your number" },
              { label: "Batch", placeholder: "Your batch" },
              { label: "Time Zone", placeholder: "Time Zone" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="mb-2 ml-2 text-base font-medium">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full md:w-[650px] h-10 px-3 ml-2 rounded-md text-black bg-white text-sm"
                />
              </div>
            ))}
          </div>

          {/* Email Section */}
          <div>
            <p className="mb-2 font-medium">My email Address</p>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md mb-3">
              <img src={emailIcon} alt="Email Icon" className="w-6 h-6" />
              <div>
                <p className="font-medium">john@gmail.com</p>
                <span className="text-xs text-gray-300">1 month ago</span>
              </div>
            </div>
            <button className="bg-blue-500/40 text-white px-4 py-2 rounded-md">
              + Add Email Address
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
