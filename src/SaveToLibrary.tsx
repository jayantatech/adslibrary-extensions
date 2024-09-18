// import React from "react";
// import "./index.css";
// import { MdKeyboardArrowDown } from "react-icons/md";
// const SaveToLibrary = () => {
//   return (
//     <div className="w-full h-[94px] px-4 my-2 rendered-by-script">
//       <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-1 p-1 border rounded">
//         <div className="w-full h-[46px] flex items-center justify-between gap-1">
//           <div className="w-[40px] h-[40px] rounded flex items-center justify-center bg-lightBlue cursor-pointer">
//             <img
//               src={"https://i.ibb.co/C8HNNRt/logoipsum-296.png"}
//               className="w-[35px] h-[35px]"
//             />
//           </div>
//           <div className="w-full h-[42px] flex-1  flex items-center justify-between relative">
//             <div className="w-full max-lgd:w-[72%] h-[40px] border bg-white p-3 hover:border-blue-500 transition-all duration-200 rounded-md flex items-center justify-between cursor-pointer">
//               <span className="text-[14px] font-Poppins">Select Groups</span>
//               <MdKeyboardArrowDown className="text-[18px] hover:text-blue-500" />
//             </div>
//           </div>{" "}
//         </div>
//         <div className="w-full h-1/2">
//           <button className="w-full h-[40px] border bg-blue-600 text-white flex items-center justify-center rounded-md font-OpenSans font-semibold text-[15px] cursor-pointer hover:scale-[.98] transition-all duration-150">
//             Save Ad
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaveToLibrary;

//full working code
// import React, { useState } from "react";
// import "./index.css";
// import { MdKeyboardArrowDown } from "react-icons/md";

// type SaveToLibraryProps = {
//   onSave: () => void; // Function to handle saving the ad
// };

// const SaveToLibrary: React.FC<SaveToLibraryProps> = ({ onSave }) => {
//   const [isActiveSelect, setIsActiveSelect] = useState<boolean>(false);
//   return (
//     <>
//       <div
//         className="w-full h-[94px] px-4 my-2 relative rendered-by-script"
//         onClick={() => setIsActiveSelect(!isActiveSelect)}
//       >
//         <div
//           className={`w-full h-[280px] bg-red-400 absolute top-0 left-0 rounded border ${
//             isActiveSelect ? "block" : "hidden"
//           }`}
//         ></div>
//         <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-1 p-1 border rounded">
//           <div className="w-full h-[46px] flex items-center justify-between gap-1">
//             <div className="w-[40px] h-[40px] rounded flex items-center justify-center bg-lightBlue cursor-pointer">
//               <img
//                 src={"https://i.ibb.co/C8HNNRt/logoipsum-296.png"}
//                 className="w-[35px] h-[35px]"
//                 alt="Logo"
//               />
//             </div>
//             <div className="w-full h-[42px] flex-1 flex items-center justify-between relative">
//               <div className="w-full max-lgd:w-[72%] h-[40px] border bg-white p-3 hover:border-blue-500 transition-all duration-200 rounded-md flex items-center justify-between cursor-pointer">
//                 <span className="text-[14px] font-Poppins">Select Groups</span>
//                 <MdKeyboardArrowDown className="text-[18px] hover:text-blue-500" />
//               </div>
//             </div>
//           </div>
//           <div className="w-full h-1/2">
//             <button
//               className="w-full h-[40px] border bg-blue-600 text-white flex items-center justify-center rounded-md font-OpenSans font-semibold text-[15px] cursor-pointer hover:scale-[.98] transition-all duration-150"
//               onClick={onSave}
//             >
//               Save Ad
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SaveToLibrary;

// working and popup is also working
// import React, { useState } from "react";
// import "./index.css";
// import { MdKeyboardArrowDown } from "react-icons/md";

// type SaveToLibraryProps = {
//   onSave: () => void; // Function to handle saving the ad
// };

// const SaveToLibrary: React.FC<SaveToLibraryProps> = ({ onSave }) => {
//   const [isActiveSelect, setIsActiveSelect] = useState<boolean>(false);

//   return (
//     <div className="w-full h-[94px] px-4 my-2 relative rendered-by-script">
//       <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-1 p-1 border rounded relative">
//         <div className="w-full h-[46px] flex items-center justify-between gap-1">
//           <div className="w-[40px] h-[40px] rounded flex items-center justify-center bg-lightBlue cursor-pointer">
//             <img
//               src={"https://i.ibb.co/C8HNNRt/logoipsum-296.png"}
//               className="w-[35px] h-[35px]"
//               alt="Logo"
//             />
//           </div>
//           <div className="w-full h-[42px] flex-1 flex items-center justify-between relative">
//             <div
//               className="w-full max-lgd:w-[72%] h-[40px] border bg-white p-3 hover:border-blue-500 transition-all duration-200 rounded-md flex items-center justify-between cursor-pointer"
//               onClick={() => setIsActiveSelect(!isActiveSelect)}
//             >
//               <span className="text-[14px] font-Poppins">Select Groups</span>
//               <MdKeyboardArrowDown className="text-[18px] hover:text-blue-500" />
//             </div>
//           </div>
//         </div>
//         <div className="w-full h-1/2">
//           <button
//             className="w-full h-[40px] border bg-blue-600 text-white flex items-center justify-center rounded-md font-OpenSans font-semibold text-[15px] cursor-pointer hover:scale-[.98] transition-all duration-150"
//             onClick={onSave}
//           >
//             Save Ad
//           </button>
//         </div>

//         {isActiveSelect && (
//           <div className="absolute bottom-full left-0 w-full bg-white border rounded shadow-lg mb-2 z-10">
//             <div className="p-4 max-h-[200px] overflow-y-auto">
//               {/* Add your popup content here */}
//               <p>Popup content goes here</p>
//               <p>You can add more elements as needed</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SaveToLibrary;

import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import {
  MdKeyboardArrowDown,
  MdFolder,
  MdInsertDriveFile,
} from "react-icons/md";

type Folder = {
  name: string;
  files: string[];
};

type SaveToLibraryProps = {
  onSave: (selectedFiles: string[]) => void;
};

const folders: Folder[] = [
  { name: "Folder 1", files: ["File 1.1", "File 1.2", "File 1.3"] },
  { name: "Folder 2", files: ["File 2.1", "File 2.2"] },
  { name: "Folder 3", files: ["File 3.1", "File 3.2", "File 3.3", "File 3.4"] },
];

const SaveToLibrary = ({ onSave }: SaveToLibraryProps) => {
  const [isActiveSelect, setIsActiveSelect] = useState<boolean>(false);
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsActiveSelect(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileName)
        ? prev.filter((f) => f !== fileName)
        : [...prev, fileName]
    );
  };

  const handleSave = () => {
    onSave(selectedFiles);
    setIsActiveSelect(false);
  };

  return (
    <div className="w-full h-[94px] px-4 my-2 relative rendered-by-script">
      <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-1 p-1 border rounded relative">
        <div className="w-full h-[46px] flex items-center justify-between gap-1">
          <div className="w-[40px] h-[40px] rounded flex items-center justify-center bg-lightBlue cursor-pointer">
            <img
              src={"https://i.ibb.co/C8HNNRt/logoipsum-296.png"}
              className="w-[35px] h-[35px]"
              alt="Logo"
            />
          </div>
          <div className="w-full h-[42px] flex-1 flex items-center justify-between relative">
            <div
              className="w-full max-lgd:w-[72%] h-[40px] border bg-white p-3 hover:border-blue-500 transition-all duration-200 rounded-md flex items-center justify-between cursor-pointer"
              onClick={() => setIsActiveSelect((prev) => !prev)}
            >
              <span className="text-[14px] font-Poppins">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : "Select Files"}
              </span>
              <MdKeyboardArrowDown className="text-[18px] hover:text-blue-500" />
            </div>
          </div>
        </div>
        <div className="w-full h-1/2">
          <button
            className="w-full h-[40px] border bg-blue-600 text-white flex items-center justify-center rounded-md font-OpenSans font-semibold text-[15px] cursor-pointer hover:scale-[.98] transition-all duration-150"
            onClick={handleSave}
          >
            Save Ad
          </button>
        </div>

        {isActiveSelect && (
          <div
            ref={popupRef}
            className="absolute bottom-full left-0 w-full bg-white border rounded shadow-lg mb-2 z-10"
          >
            <div className="p-2 max-h-[200px] overflow-y-auto">
              {folders.map((folder) => (
                <div key={folder.name} className="mb-2">
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                    onClick={() => toggleFolder(folder.name)}
                  >
                    <MdFolder className="mr-2 text-[18px] text-yellow-500" />
                    <span className="font-OpenSans text-[14px]">
                      {folder.name}
                    </span>
                  </div>
                  {openFolders.includes(folder.name) && (
                    <div className="ml-4 mt-1">
                      {folder.files.map((file) => (
                        <div
                          key={file}
                          className={`flex items-center cursor-pointer hover:bg-gray-100 p-[3px] my-[2px] rounded ${
                            selectedFiles.includes(file) ? "bg-blue-100" : ""
                          }`}
                          onClick={() => toggleFileSelection(file)}
                        >
                          <MdInsertDriveFile className="mr-2 text-[18px] text-gray-500" />
                          <span className="font-OpenSans text-[14px]">
                            {file}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveToLibrary;
