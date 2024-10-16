import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MdArrowOutward } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { BsFileText } from "react-icons/bs";
import UserCard from "./UserCard";
import { LuKeySquare } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { getAccessToken } from "./tokenUtils";
enum tabEnum {
  Save_ads = "Save_ads",
  Download_Ads = "Download_Ads",
  Screenshot = "Screenshot",
}

const Popup = () => {
  const [activeTab, setActiveTab] = useState<tabEnum>(tabEnum.Save_ads);
  const [activationCode, setActivationCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await getAccessToken();
      console.log("Access token for popup:", accessToken);

      if (!accessToken) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  // useEffect(() => {
  //   refreshToken().then((success) => {
  //     if (success) {
  //       console.log("Token refreshed successfully");
  //     }
  //   });
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/verify-key",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extension_key: activationCode }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && data.data.accessToken && data.data.refreshToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        setIsAuthenticated(true);
        setIsActive(false);
      }
    } catch (error) {
      console.error("Error during activation:", error);
    }
  };

  return (
    <div className="w-[510px]  min-h-[474px] h-auto px-4 pb-4 -mt-2">
      {/* <div className="w-[510px]  min-h-[474px] h-auto px-4 pb-4 -mt-2"> */}
      <div className="w-full h-auto flex items-center justify-between gap-4">
        <img
          src={
            "https://adslibrary-alternative.vercel.app/_next/static/media/logoipsum-297.faefabb7.svg"
          }
          className="w-[164px] h-full"
          alt="logo"
        />
        <div className="w-full flex-1 h-full flex items-center justify-end gap-3 flex-row">
          {isAuthenticated ? (
            <>
              <div className="flex items-center justify-center gap-2">
                <button className="px-2 py-1 border-slate-300 font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border hover:border-mainBlue">
                  <MdArrowOutward className="text-[18px]" />
                  My Library
                </button>
                <button className="px-2 py-1 border-slate-300 font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border  hover:border-mainBlue">
                  <BsFileText className="text-[18px]" />
                  Tutorial
                </button>
              </div>
              <div className="h-full w-[60px] flex items-end justify-center ">
                <UserCard />
              </div>
            </>
          ) : (
            <div>
              <button
                className="px-2 py-1 border-slate-300 bg-mainBlue font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border hover:border-mainBlue text-white"
                onClick={() => setIsActive(true)}
              >
                <LuKeySquare className="text-[18px] pr-1" />
                Confirm Key Authenticity
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`w-full mx-auto flex h-full absolute bg-black bg-opacity-50 top-0 left-0 items-center justify-center z-20 ${
          isActive ? "block" : "hidden"
        }`}
      >
        <div className="h-auto w-[93.8%] bg-white border rounded-lg shadow-md p-4 text-black font-OpenSans">
          <div className=" flex items-center justify-between bg-skdy-600 mb-2">
            <div>
              <h2 className="text-xl font-bold  bg-redd-500">
                Activate Your Extension
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
                className="w-full px-2 py-1.5 border focus:outline-mainBlue text-[16px] rounded bg-white text-black"
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
            <button className="w-full px-2 py-1.5 bg-transparent border border-mainBlue font-OpenSans hover:bg-lightBlue hover:text-mainBlue text-[14px] hover:scale-[.98] transition-all duration-150 rounded text-black font-semibold">
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
            <p>
              We care about your security. Your code is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[404px] my-2 flex flex-col ">
        <div className=" w-full h-[48px] border rounded p-2 flex items-center justify-between gap-2">
          <div
            className={`w-1/3 h-full rounded bg-lightBlue flex items-center justify-center font-OpenSans text-[16px] font-semibold cursor-pointer hover:bg-mainBlue border hover:text-white ${
              activeTab === tabEnum.Save_ads
                ? "bg-mainBlue text-white"
                : "bg-lightBlue text-black"
            }`}
            onClick={() => setActiveTab(tabEnum.Save_ads)}
          >
            Save Ads
          </div>
          <div
            className={`w-1/3 h-full rounded bg-lightBlue flex items-center justify-center font-OpenSans text-[16px] font-semibold cursor-pointer border hover:bg-mainBlue hover:text-white ${
              activeTab === tabEnum.Download_Ads
                ? "bg-mainBlue text-white"
                : "bg-lightBlue text-black"
            }`}
            onClick={() => setActiveTab(tabEnum.Download_Ads)}
          >
            Download Ads
          </div>
          <div
            className={`w-1/3 h-full rounded bg-lightBlue flex items-center justify-center font-OpenSans text-[16px] font-semibold cursor-pointer border hover:bg-mainBlue hover:text-white ${
              activeTab === tabEnum.Screenshot
                ? "bg-mainBlue text-white"
                : "bg-lightBlue text-black"
            }`}
            onClick={() => setActiveTab(tabEnum.Screenshot)}
          >
            Screenshot{" "}
          </div>
        </div>

        <div
          className={`w-full h-[360px] ${
            activeTab === tabEnum.Save_ads ? "block" : "hidden"
          }`}
        >
          <p className="font-OpenSans text-[15px] font-medium pt-1">
            Ad Platform
          </p>
          <div className=" w-full h-[158px] pt-2 flex flex-col gap-2">
            <div className="w-full h-[40px] flex  gap-2 flex-row">
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaFacebook className="text-[24px] text-blue-700" />
                <span className="text-[16px] font-semibold -mt-1">
                  Meta Ad Library
                </span>
              </div>
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaFacebook className="text-[24px] text-blue-700" />
                <span className="text-[16px] font-semibold -mt-1">
                  Facebook
                </span>
              </div>
            </div>
            <div className="w-full h-[40px] flex  gap-2 flex-row">
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaTiktok className="text-[24px] text-black" />
                <span className="text-[16px] font-semibold -mt-1">
                  TikTok Ad Library
                </span>
              </div>
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaTiktok className="text-[24px] text-black" />
                <span className="text-[16px] font-semibold -mt-1">
                  TikTok Creative Center
                </span>
              </div>
            </div>
            <div className="w-full h-[40px] flex  gap-2 flex-row">
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaTiktok className="text-[24px] text-black" />
                <span className="text-[16px] font-semibold -mt-1">
                  Tiktok Organic{" "}
                </span>
              </div>
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded">
                  <GrInstagram className="text-[24px] text-white  rounded-md scale-90 " />
                </div>
                <span className="text-[16px] font-semibold -mt-1">
                  Instagram Organic
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] bg-lightBlue rounded flex items-center justify-center font-OpenSans gap-1">
            <FaCircleInfo className="text-[20px]" />
            <span className="text-[16px]">Please Select Ads to Save!</span>
          </div>
          <div className="w-full h-[110px] mt-2">
            <p className="font-OpenSans text-[15px] py-1">Select Group</p>
            <div className="w-full h-auto flex flex-col gap-1">
              <div className="w-full h-[44px] bg-white cursor-pointer rounded border px-2 py-2 flex items-center justify-between">
                <div className=" h-[32px] w-[68px] bg-lightBlue rounded border items-center flex  justify-center font-OpenSans text-[14px] ">
                  Library
                </div>
                <MdOutlineKeyboardArrowDown className="text-[24px]" />
              </div>
              <button className="w-full h-[44px] bg-mainBlue rounded font-OpenSans text-[16px] font-semibold text-white cursor-pointer hover:scale-[.98] transition-all duration-200">
                Save to AdsLibrary
              </button>
            </div>
          </div>
        </div>

        {/* Download ads */}
        <div
          className={`w-full h-[360px] ${
            activeTab === tabEnum.Download_Ads ? "block" : "hidden"
          }`}
        >
          <p className="font-OpenSans text-[15px] font-medium pt-1">
            Ad Platform
          </p>
          <div className=" w-full h-[158px] pt-2 flex flex-col gap-2">
            <div className="w-full h-[40px] flex  gap-2 flex-row">
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaTiktok className="text-[24px] text-black" />
                <span className="text-[16px] font-semibold -mt-1">
                  TikTok Ad Library
                </span>
              </div>
              <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
                <FaTiktok className="text-[24px] text-black" />
                <span className="text-[16px] font-semibold -mt-1">
                  TikTok Creative Center
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] bg-lightBlue rounded flex items-center justify-center font-OpenSans gap-1">
            <FaCircleInfo className="text-[20px]" />
            <span className="text-[16px]">Please Select Ads to Download!</span>
          </div>
          <div className="w-full h-[110px] mt-2">
            <p className="font-OpenSans text-[15px] py-1">Download data</p>
            <div className="w-full h-auto flex flex-col gap-1">
              <button className="w-full h-[44px] bg-white border border-slate-200 rounded font-OpenSans text-[16px] font-semibold text-black cursor-pointer hover:scale-[.98] transition-all duration-200">
                Download Ad Data{" "}
              </button>
              <button className="w-full h-[44px] bg-mainBlue rounded font-OpenSans text-[16px] font-semibold text-white cursor-pointer hover:scale-[.98] transition-all duration-200">
                Download Video/Photo{" "}
              </button>
            </div>
          </div>
        </div>

        {/* Screenshot section  */}

        <div
          className={`w-full h-[360px] ${
            activeTab === tabEnum.Screenshot ? "block" : "hidden"
          }`}
        >
          <div className=" w-full h-[233px] pt-6 flex flex-col gap-2 font-OpenSans">
            <span className="font-semibold text-[16px]">
              Usage precautions：
            </span>
            <p className="text-[14px]">
              After clicking "Screenshot", please stay on the page and do not
              scroll to ensure that the screenshot is complete.
            </p>
          </div>
          <div className="w-full h-[110px] mt-2">
            <p className="font-OpenSans text-[15px] py-1">Select Group</p>
            <div className="w-full h-auto flex flex-col gap-1">
              <div className="w-full h-[44px] bg-white cursor-pointer rounded border px-2 py-2 flex items-center justify-between">
                <div className=" h-[32px] w-[68px] bg-lightBlue rounded border items-center flex  justify-center font-OpenSans text-[14px] ">
                  Library
                </div>
                <MdOutlineKeyboardArrowDown className="text-[24px]" />
              </div>
              <button className="w-full h-[44px] bg-mainBlue rounded font-OpenSans text-[16px] font-semibold text-white cursor-pointer hover:scale-[.98] transition-all duration-200">
                Save to AdsLibrary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const popupRootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(popupRootElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
// import React, { useEffect, useState } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { MdArrowOutward } from "react-icons/md";
// import { FaFacebook } from "react-icons/fa";
// import { FaCircleInfo } from "react-icons/fa6";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { FaTiktok } from "react-icons/fa";
// import { GrInstagram } from "react-icons/gr";
// import { BsFileText } from "react-icons/bs";
// import UserCard from "./UserCard";
// import { LuKeySquare } from "react-icons/lu";
// // import ActivationCodeComponent from "./ActivationCodeComponent";
// import { IoClose } from "react-icons/io5";
// enum tabEnum {
//   Save_ads = "Save_ads",
//   Download_Ads = "Download_Ads",
//   Screenshot = "Screenshot",
// }

// const Popup = () => {
//   const [activeTab, setActiveTab] = useState<tabEnum>(tabEnum.Save_ads);

//   const [activationCode, setActivationCode] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   // Handle submission logic here
//   //   console.log("Submitted code:", activationCode);
//   // };

//   //
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/v1/auth/verify-key",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ extension_key: activationCode }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       // Handle successful activation here
//       // For example, you might want to close the modal and update some state
//       setIsActive(false);
//     } catch (error) {
//       console.error("Error during activation:", error);
//       // Handle error here (e.g., show an error message to the user)
//     }
//   };

//   return (
//     <div className="w-[510px]  min-h-[474px] h-auto px-4 pb-4 -mt-2">
//       <div className="w-full h-auto flex items-center justify-between gap-4">
//         <img
//           src={
//             "https://adslibrary-alternative.vercel.app/_next/static/media/logoipsum-297.faefabb7.svg"
//           }
//           className="w-[164px] h-full"
//           alt="logo"
//         />
//         <div className="w-full flex-1 h-full flex items-center justify-end gap-3 flex-row">
//           {false ? (
//             <>
//               <div className="flex items-center justify-center gap-2">
//                 <button className="px-2 py-1 border-slate-300 font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border hover:border-mainBlue">
//                   <MdArrowOutward className="text-[18px]" />
//                   My Library
//                 </button>
//                 <button className="px-2 py-1 border-slate-300 font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border  hover:border-mainBlue">
//                   <BsFileText className="text-[18px]" />
//                   Tutorial{" "}
//                 </button>
//               </div>
//               <div className="h-full w-[60px] flex items-end justify-center ">
//                 {/* <div className="w-[40px] h-[40px] rounded-full "> */}
//                 <UserCard />
//                 {/* </div> */}
//               </div>
//             </>
//           ) : (
//             <div>
//               <button
//                 className="px-2 py-1 border-slate-300 bg-mainBlue font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border hover:border-mainBlue text-white"
//                 onClick={() => setIsActive(true)}
//               >
//                 <LuKeySquare className="text-[18px] pr-1" />
//                 Confirm Key Authenticity
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div
//         className={`w-full mx-auto flex h-full absolute bg-black bg-opacity-50 top-0 left-0 items-center justify-center z-20 ${
//           isActive ? "block" : "hidden"
//         }`}
//       >
//         <div className="h-auto w-[93.8%] bg-white border rounded-lg shadow-md p-4 text-black font-OpenSans">
//           <div className=" flex items-center justify-between bg-skdy-600 mb-2">
//             <div>
//               <h2 className="text-xl font-bold  bg-redd-500">
//                 Activate Your Extension
//               </h2>
//             </div>
//             <div
//               className="h-[26px] w-[26px] bg-lightBlue flex items-center justify-center border rounded cursor-pointer"
//               onClick={() => setIsActive(false)}
//             >
//               <IoClose className="text-black text-[18px]" />
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-2">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Enter your activation code"
//                 value={activationCode}
//                 onChange={(e) => setActivationCode(e.target.value)}
//                 className="w-full px-2 py-1.5 border focus:outline-mainBlue text-[16px] rounded bg-white text-black"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-2 py-1.5 bg-mainBlue font-OpenSans text-[16px] hover:scale-[.98] transition-all duration-150 rounded text-white font-semibold"
//             >
//               Submit
//             </button>
//           </form>
//           <div className="mt-2">
//             <button className="w-full px-2 py-1.5 bg-transparent border border-mainBlue font-OpenSans hover:bg-lightBlue hover:text-mainBlue text-[14px] hover:scale-[.98] transition-all duration-150 rounded text-black font-semibold">
//               Don't have a code? Get it here
//             </button>
//           </div>
//           <div className="mt-6 flex items-center text-sm">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//               />
//             </svg>
//             <p>
//               We care about your security. Your code is encrypted and secure.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-[404px] my-2 flex flex-col ">
//         <div className=" w-full h-[48px] border rounded p-2 flex items-center justify-between gap-2">
//           <div
//             className={`w-1/3 h-full rounded bg-lightBlue flex items-center justify-center font-OpenSans text-[16px] font-semibold cursor-pointer hover:bg-mainBlue border hover:text-white ${
//               activeTab === tabEnum.Save_ads
//                 ? "bg-mainBlue text-white"
//                 : "bg-lightBlue text-black"
//             }`}
//             onClick={() => setActiveTab(tabEnum.Save_ads)}
//           >
//             Save Ads
//           </div>
//           <div
//             className={`w-1/3 h-full rounded bg-lightBlue flex items-center justify-center font-OpenSans text-[16px] font-semibold cursor-pointer border hover:bg-mainBlue hover:text-white ${
//               activeTab === tabEnum.Download_Ads
//                 ? "bg-mainBlue text-white"
//                 : "bg-lightBlue text-black"
//             }`}
//             onClick={() => setActiveTab(tabEnum.Download_Ads)}
//           >
//             Download Ads
//           </div>
//           <div
//             className={`w-1/3 h-full rounded bg-lightBlue flex items-center justify-center font-OpenSans text-[16px] font-semibold cursor-pointer border hover:bg-mainBlue hover:text-white ${
//               activeTab === tabEnum.Screenshot
//                 ? "bg-mainBlue text-white"
//                 : "bg-lightBlue text-black"
//             }`}
//             onClick={() => setActiveTab(tabEnum.Screenshot)}
//           >
//             Screenshot{" "}
//           </div>
//         </div>

//         <div
//           className={`w-full h-[360px] ${
//             activeTab === tabEnum.Save_ads ? "block" : "hidden"
//           }`}
//         >
//           <p className="font-OpenSans text-[15px] font-medium pt-1">
//             Ad Platform
//           </p>
//           <div className=" w-full h-[158px] pt-2 flex flex-col gap-2">
//             <div className="w-full h-[40px] flex  gap-2 flex-row">
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaFacebook className="text-[24px] text-blue-700" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   Meta Ad Library
//                 </span>
//               </div>
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaFacebook className="text-[24px] text-blue-700" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   Facebook
//                 </span>
//               </div>
//             </div>
//             <div className="w-full h-[40px] flex  gap-2 flex-row">
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaTiktok className="text-[24px] text-black" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   TikTok Ad Library
//                 </span>
//               </div>
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaTiktok className="text-[24px] text-black" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   TikTok Creative Center
//                 </span>
//               </div>
//             </div>
//             <div className="w-full h-[40px] flex  gap-2 flex-row">
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaTiktok className="text-[24px] text-black" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   Tiktok Organic{" "}
//                 </span>
//               </div>
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded">
//                   <GrInstagram className="text-[24px] text-white  rounded-md scale-90 " />
//                 </div>
//                 <span className="text-[16px] font-semibold -mt-1">
//                   Instagram Organic
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="w-full h-[48px] bg-lightBlue rounded flex items-center justify-center font-OpenSans gap-1">
//             <FaCircleInfo className="text-[20px]" />
//             <span className="text-[16px]">Please Select Ads to Save!</span>
//           </div>
//           <div className="w-full h-[110px] mt-2">
//             <p className="font-OpenSans text-[15px] py-1">Select Group</p>
//             <div className="w-full h-auto flex flex-col gap-1">
//               <div className="w-full h-[44px] bg-white cursor-pointer rounded border px-2 py-2 flex items-center justify-between">
//                 <div className=" h-[32px] w-[68px] bg-lightBlue rounded border items-center flex  justify-center font-OpenSans text-[14px] ">
//                   Library
//                 </div>
//                 <MdOutlineKeyboardArrowDown className="text-[24px]" />
//               </div>
//               <button className="w-full h-[44px] bg-mainBlue rounded font-OpenSans text-[16px] font-semibold text-white cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 Save to AdsLibrary
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Download ads */}
//         <div
//           className={`w-full h-[360px] ${
//             activeTab === tabEnum.Download_Ads ? "block" : "hidden"
//           }`}
//         >
//           <p className="font-OpenSans text-[15px] font-medium pt-1">
//             Ad Platform
//           </p>
//           <div className=" w-full h-[158px] pt-2 flex flex-col gap-2">
//             <div className="w-full h-[40px] flex  gap-2 flex-row">
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaTiktok className="text-[24px] text-black" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   TikTok Ad Library
//                 </span>
//               </div>
//               <div className="w-1/2 h-full bg-white rounded border px-4 flex items-center justify-start gap-1 cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 <FaTiktok className="text-[24px] text-black" />
//                 <span className="text-[16px] font-semibold -mt-1">
//                   TikTok Creative Center
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="w-full h-[48px] bg-lightBlue rounded flex items-center justify-center font-OpenSans gap-1">
//             <FaCircleInfo className="text-[20px]" />
//             <span className="text-[16px]">Please Select Ads to Download!</span>
//           </div>
//           <div className="w-full h-[110px] mt-2">
//             <p className="font-OpenSans text-[15px] py-1">Download data</p>
//             <div className="w-full h-auto flex flex-col gap-1">
//               <button className="w-full h-[44px] bg-white border border-slate-200 rounded font-OpenSans text-[16px] font-semibold text-black cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 Download Ad Data{" "}
//               </button>
//               <button className="w-full h-[44px] bg-mainBlue rounded font-OpenSans text-[16px] font-semibold text-white cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 Download Video/Photo{" "}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Screenshot section  */}

//         <div
//           className={`w-full h-[360px] ${
//             activeTab === tabEnum.Screenshot ? "block" : "hidden"
//           }`}
//         >
//           <div className=" w-full h-[233px] pt-6 flex flex-col gap-2 font-OpenSans">
//             <span className="font-semibold text-[16px]">
//               Usage precautions：
//             </span>
//             <p className="text-[14px]">
//               After clicking "Screenshot", please stay on the page and do not
//               scroll to ensure that the screenshot is complete.
//             </p>
//           </div>
//           <div className="w-full h-[110px] mt-2">
//             <p className="font-OpenSans text-[15px] py-1">Select Group</p>
//             <div className="w-full h-auto flex flex-col gap-1">
//               <div className="w-full h-[44px] bg-white cursor-pointer rounded border px-2 py-2 flex items-center justify-between">
//                 <div className=" h-[32px] w-[68px] bg-lightBlue rounded border items-center flex  justify-center font-OpenSans text-[14px] ">
//                   Library
//                 </div>
//                 <MdOutlineKeyboardArrowDown className="text-[24px]" />
//               </div>
//               <button className="w-full h-[44px] bg-mainBlue rounded font-OpenSans text-[16px] font-semibold text-white cursor-pointer hover:scale-[.98] transition-all duration-200">
//                 Save to AdsLibrary
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const popupRootElement = document.getElementById("root") as HTMLElement;

// const root = createRoot(popupRootElement);
// root.render(
//   <React.StrictMode>
//     <Popup />
//   </React.StrictMode>
// );
