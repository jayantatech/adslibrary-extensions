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

enum tabEnum {
  Save_ads = "Save_ads",
  Download_Ads = "Download_Ads",
  Screenshot = "Screenshot",
}

const Popup = () => {
  const [activeTab, setActiveTab] = useState<tabEnum>(tabEnum.Save_ads);

  return (
    <div className="w-[510px]  min-h-[474px] h-auto px-4 pb-4 -mt-2">
      <div className="w-full h-auto flex items-center justify-between gap-4">
        <img
          src={
            "https://adslibrary-alternative.vercel.app/_next/static/media/logoipsum-297.faefabb7.svg"
          }
          className="w-[164px] h-full"
          alt="logo"
        />
        <div className="w-full flex-1 h-full flex items-center justify-end gap-3 flex-row">
          <div className="flex items-center justify-center gap-2">
            <button className="px-2 py-1 border-slate-300 font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border hover:border-mainBlue">
              <MdArrowOutward className="text-[18px]" />
              My Library
            </button>
            <button className="px-2 py-1 border-slate-300 font-OpenSans text-[15px] flex items-center justify-center gap-[2px] rounded  transition-all duration-150 border  hover:border-mainBlue">
              <BsFileText className="text-[18px]" />
              Tutorial{" "}
            </button>
          </div>
          <div className="h-full w-[60px] flex items-end justify-center ">
            {/* <div className="w-[40px] h-[40px] rounded-full "> */}
            <UserCard />
            {/* </div> */}
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
                  <GrInstagram className="text-[24px] text-white  rounded-md scale-90" />
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

// ReactDOM.render(
//   <React.StrictMode>
//     <Popup />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const popupRootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(popupRootElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
