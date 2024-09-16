import React from "react";
import "./index.css";
import { MdKeyboardArrowDown } from "react-icons/md";
const SaveToLibrary: React.FC = () => {
  return (
    <div className="w-full h-[94px] px-4 my-2 rendered-by-script">
      <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-1 p-1 border rounded">
        <div className="w-full h-[46px] flex items-center justify-between gap-1">
          <div className="w-[40px] h-[40px] rounded flex items-center justify-center bg-lightBlue cursor-pointer">
            <img
              src={"https://i.ibb.co/C8HNNRt/logoipsum-296.png"}
              className="w-[35px] h-[35px]"
            />
          </div>
          <div className="w-full h-[42px] flex-1  flex items-center justify-between relative">
            <div className="w-full max-lgd:w-[72%] h-[40px] border bg-white p-3 hover:border-blue-500 transition-all duration-200 rounded-md flex items-center justify-between cursor-pointer">
              <span className="text-[14px] font-Poppins">Select Groups</span>
              <MdKeyboardArrowDown className="text-[18px] hover:text-blue-500" />
            </div>
          </div>{" "}
        </div>
        <div className="w-full h-1/2">
          <button className="w-full h-[40px] border bg-blue-600 text-white flex items-center justify-center rounded-md font-OpenSans font-semibold text-[15px] cursor-pointer hover:scale-[.98] transition-all duration-150">
            Save Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveToLibrary;
