import React, { useState } from "react";
import { CiMail } from "react-icons/ci";

const EnterCode = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // move to next input automatically
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entered OTP: " + otp.join(""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Phone-style container */}
      <div className="bg-gradient-to-b from-white to-gray-50 w-[460px] h-[620px] rounded-3xl shadow-2xl flex flex-col items-center p-10">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-xl mb-8 shadow-sm">
          <CiMail className="text-indigo-500" size={32} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Enter your code
        </h2>
        <p className="text-gray-500 text-sm mb-10 text-center">
          We’ve sent a verification code to your email.
        </p>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="flex justify-center gap-4 mb-12">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-14 h-14 border border-indigo-300 text-indigo-600 bg-white rounded-lg text-center text-2xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold py-3 rounded-xl shadow-md transition"
          >
            SUBMIT
          </button>
        </form>

        {/* Extra Hint */}
        <p className="text-gray-500 text-xs mt-6">
          Didn’t receive the code? <span className="text-sky-600 font-medium cursor-pointer hover:underline">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default EnterCode;
