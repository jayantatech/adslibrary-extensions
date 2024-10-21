import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ActivationCodeComponent = () => {
  const [activationCode, setActivationCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submission logic here
    console.log("Submitted code:", activationCode);
  };
  const redirectToActivationKeyPage = () => {
    console.log("Redirecting to activation key page...");
    navigate(
      "https://adslibrary-alternative.vercel.app/extension-activation-key"
    );
  };
  return (
    <div
      className={`w-full mx-auto flex h-full absolute bg-black bg-opacity-50 top-0 left-0 items-center justify-center z-20 ${
        isActive ? "block" : "hidden"
      }`}
      onClick={() => setIsActive(false)}
    >
      <div className="h-auto w-[93.8%] bg-white border rounded-lg shadow-md p-4 text-black font-OpenSans">
        <div className=" flex items-center justify-between bg-skdy-600 mb-2">
          <div>
            <h2 className="text-xl font-bold  bg-redd-500">
              Activate Your Account
            </h2>
          </div>
          <div
            className="h-[26px] w-[26px] bg-lightBlue flex items-center justify-center border rounded cursor-pointer"
            onClick={() => setIsActive(false)}
          >
            <IoClose className="text-black text-[18px]" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <input
              type="text"
              placeholder="Enter your activation code"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              className="w-full px-2 py-2 border focus:outline-mainBlue text-[16px] rounded bg-white text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-2 py-1.5 bg-mainBlue font-OpenSans text-[16px] hover:scale-[.98] transition-all duration-150 rounded text-white font-semibold"
          >
            Submit
          </button>
        </form>
        <div className="mt-2">
          <button
            className="w-full px-2 py-1.5 bg-transparent border border-mainBlue font-OpenSans hover:bg-lightBlue hover:text-mainBlue text-[14px] hover:scale-[.98] transition-all duration-150 rounded text-black font-semibold"
            onClick={redirectToActivationKeyPage}
          >
            Don't have a code? Get it here
          </button>
        </div>
        <div className="mt-6 flex items-center text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p>We care about your security. Your code is encrypted and secure.</p>
        </div>
      </div>
    </div>
  );
};

export default ActivationCodeComponent;
