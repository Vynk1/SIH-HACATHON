import React, { useState } from "react";
import {
  FaUser,
  FaBook,
  FaEnvelope,
  FaPhone,
  FaBell,
  FaSearch,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Example user data
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    degree: "B.Tech CSE",
    email: "john@gmail.com",
    phone: "+91 9876543210",
    batch: "2022",
    timeZone: "IST",
  });

  // Update field values
  const handleChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full font-[Poppins] bg-gradient-to-b from-[#0f1d2f] to-[#2b9ec0] text-white flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mb-8 gap-4 sm:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Welcome, {userData.fullName.split(" ")[0]}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-1">
            Tue, 07 June 2022
          </p>
        </div>

        <div className="flex items-center w-full sm:w-auto gap-3">
          <div className="flex items-center bg-white rounded-md px-3 py-2 text-black flex-1 sm:flex-none">
            <FaSearch className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 border-none outline-none text-sm bg-white text-black"
            />
          </div>
          <FaBell className="w-6 h-6" />
        </div>
      </header>

      {/* Profile Info */}
      <section className="flex flex-col w-full max-w-5xl bg-black/20 rounded-xl p-6 sm:p-10 gap-6">
        {/* Avatar & Name */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black text-3xl">
            <FaUser />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold">
              {userData.fullName}
            </h3>
            <p className="text-gray-300">{userData.email}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold"
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              label: "Full Name",
              icon: <FaUser />,
              value: userData.fullName,
              field: "fullName",
            },
            {
              label: "Degree",
              icon: <FaBook />,
              value: userData.degree,
              field: "degree",
            },
            {
              label: "Email",
              icon: <FaEnvelope />,
              value: userData.email,
              field: "email",
            },
            {
              label: "Phone (Optional)",
              icon: <FaPhone />,
              value: userData.phone,
              field: "phone",
            },
            {
              label: "Batch",
              icon: <FaUser />,
              value: userData.batch,
              field: "batch",
            },
            {
              label: "Time Zone",
              icon: <FaUser />,
              value: userData.timeZone,
              field: "timeZone",
            },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col w-full">
              <label className="mb-2 text-base font-medium flex items-center gap-2">
                {field.icon} {field.label}
              </label>

              {isEditing ? (
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleChange(e, field.field)}
                  className="w-full h-10 px-3 rounded-md text-black bg-white text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : (
                <p className="w-full h-10 px-3 flex items-center rounded-md bg-white/10 text-sm">
                  {field.value || "—"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Email Section */}
        <div className="flex flex-col gap-3 mt-4">
          <p className="mb-2 font-medium flex items-center gap-2">
            <FaEnvelope /> My Email Address
          </p>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md flex-wrap">
            <FaEnvelope className="w-6 h-6" />
            <div>
              <p className="font-medium">{userData.email}</p>
              <span className="text-xs text-gray-300">1 month ago</span>
            </div>
          </div>
          {isEditing && (
            <button className="bg-blue-500/40 hover:bg-blue-500/60 text-white px-4 py-2 rounded-md w-full md:w-auto transition">
              + Add Email Address
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
