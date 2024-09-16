import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineArrowForwardIos } from "react-icons/md";

const UserCard = () => {
  const [isUserMenuActive, setIsUserMenuActive] = useState<boolean>(false);
  const [isUserMenuCloseTriggered, setIsUserMenuCloseTriggered] =
    useState<boolean>(false);

  useEffect(() => {
    if (isUserMenuCloseTriggered) {
      const timer = setTimeout(() => {
        setIsUserMenuActive(false);
        setIsUserMenuCloseTriggered(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isUserMenuCloseTriggered]);

  return (
    <>
      <div
        className="w-full h-full flex items-end justify-center cursor-pointer"
        onMouseEnter={() => (
          setIsUserMenuActive(true), setIsUserMenuCloseTriggered(false)
        )}
      >
        <div className="bg-gray-500 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer">
          <span className="text-[26px] font-bold">V</span>
        </div>
        <MdKeyboardArrowDown className="text-[20px] -ml-3 cursor-pointer rounded-full bg-mainBlue text-white" />
      </div>

      <div
        className={`w-full h-full absolute top-0 left-0 bg-transparent z-10 ${
          isUserMenuActive ? "block" : " hidden"
        }`}
        onClick={() => (
          setIsUserMenuActive(false), setIsUserMenuCloseTriggered(false)
        )}
      ></div>

      <div
        className={`w-[168px] h-[244px] rounded bg-white border absolute top-14 right-3 p-2 font-OpenSans z-20 shadow-md transition-all duration-200 ${
          isUserMenuActive ? "block" : "hidden"
        }`}
        onMouseLeave={() => setIsUserMenuCloseTriggered(true)}
      >
        <div className="w-full h-[50px] bg-fuchdsia-200 pl-1 border-b pb-2 border-slate-200 ">
          <span className="text-[15px] font-semibold">Jayanta</span> <br />
          <p className="text-[15px] -mt-1">jay@email.com</p>
        </div>
        <div className="w-full h-[54px] bg-fuchdsia-200 pl-1 border-b border-slate-200 pb-2">
          <span className="text-[15px]">Current Workspace</span> <br />
          <p className="text-[15px] font-semibold -mt-1">Jayanta</p>
        </div>
        <div className="w-full h-[38px] bg-fuchdsia-200 pl-1 border-b border-slate-200 py-2 flex items-center justify-between">
          <span className="font-OpenSans text-[15px]">Switch Workspace</span>
          <MdOutlineArrowForwardIos className="text-[16px]" />
        </div>
        <div className="w-full h-[38px] bg-fuchsdia-200 pl-1 border-b border-slate-200 py-2 flex items-center justify-between">
          <span className="font-OpenSans text-[15px]">English</span>
          <MdOutlineArrowForwardIos className="text-[16px]" />
        </div>
        <div className="w-full h-[36px] border hover:bg-mainBlue hover:text-white text-[15px] font-OpenSans font-semibold flex items-center justify-center rounded-md cursor-pointer mt-2">
          Logout
        </div>
      </div>
    </>
  );
};

export default UserCard;
