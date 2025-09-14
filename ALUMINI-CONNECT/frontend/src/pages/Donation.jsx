import React, { useState } from 'react';
import Footer from "../component/Footer";

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    purpose: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 px-4">
      <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-[#d8def0] rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Kindly fill the form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              <span className="inline-flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-400 bg-transparent outline-none py-1 px-2 focus:border-indigo-600 transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Donation Amount */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              <span className="inline-flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1C5.9 1 1 5.4 1 12s4.9 11 11 11 11-4.4 11-11S18.1 1 12 1zm1 17.9V19h-2v-.1c-1.8-.2-3.2-1.7-3.2-3.5h2c0 .9.8 1.7 1.8 1.7s1.8-.8 1.8-1.7c0-.9-.8-1.7-1.8-1.7-2.3 0-4.2-1.6-4.2-3.6 0-1.8 1.4-3.2 3.2-3.5V5h2v.1c1.8.2 3.2 1.7 3.2 3.5h-2c0-.9-.8-1.7-1.8-1.7s-1.8.8-1.8 1.7c0 .9.8 1.7 1.8 1.7 2.3 0 4.2 1.6 4.2 3.6 0 1.8-1.4 3.3-3.2 3.5z"/>
                </svg>
                Donation Amount
              </span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-400 bg-transparent outline-none py-1 px-2 focus:border-indigo-600 transition-colors"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              <span className="inline-flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h10v2H4v-2z"/>
                </svg>
                Purpose
              </span>
            </label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-400 bg-transparent outline-none py-1 px-2 focus:border-indigo-600 transition-colors"
              placeholder="Donation purpose"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Donation;
