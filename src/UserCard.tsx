// import React, { useEffect, useState } from "react";
// import { MdKeyboardArrowDown, MdOutlineArrowForwardIos } from "react-icons/md";

// const UserCard = () => {
//   const [isUserMenuActive, setIsUserMenuActive] = useState<boolean>(false);
//   const [isUserMenuCloseTriggered, setIsUserMenuCloseTriggered] =
//     useState<boolean>(false);

//   useEffect(() => {
//     if (isUserMenuCloseTriggered) {
//       const timer = setTimeout(() => {
//         setIsUserMenuActive(false);
//         setIsUserMenuCloseTriggered(false);
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [isUserMenuCloseTriggered]);

//   return (
//     <>
//       <div
//         className="w-full h-full flex items-end justify-center cursor-pointer"
//         onMouseEnter={() => (
//           setIsUserMenuActive(true), setIsUserMenuCloseTriggered(false)
//         )}
//       >
//         <div className="bg-gray-500 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer">
//           <span className="text-[26px] font-bold">V</span>
//         </div>
//         <MdKeyboardArrowDown className="text-[20px] -ml-3 cursor-pointer rounded-full bg-mainBlue text-white" />
//       </div>

//       <div
//         className={`w-full h-full absolute top-0 left-0 bg-transparent z-10 ${
//           isUserMenuActive ? "block" : " hidden"
//         }`}
//         onClick={() => (
//           setIsUserMenuActive(false), setIsUserMenuCloseTriggered(false)
//         )}
//       ></div>

//       <div
//         className={`w-[168px] h-[244px] rounded bg-white border absolute top-14 right-3 p-2 font-OpenSans z-20 shadow-md transition-all duration-200 ${
//           isUserMenuActive ? "block" : "hidden"
//         }`}
//         onMouseLeave={() => setIsUserMenuCloseTriggered(true)}
//       >
//         <div className="w-full h-[50px] bg-fuchdsia-200 pl-1 border-b pb-2 border-slate-200 ">
//           <span className="text-[15px] font-semibold">Jayanta</span> <br />
//           <p className="text-[15px] -mt-1">jay@email.com</p>
//         </div>
//         <div className="w-full h-[54px] bg-fuchdsia-200 pl-1 border-b border-slate-200 pb-2">
//           <span className="text-[15px]">Current Workspace</span> <br />
//           <p className="text-[15px] font-semibold -mt-1">Jayanta</p>
//         </div>
//         <div className="w-full h-[38px] bg-fuchdsia-200 pl-1 border-b border-slate-200 py-2 flex items-center justify-between">
//           <span className="font-OpenSans text-[15px]">Switch Workspace</span>
//           <MdOutlineArrowForwardIos className="text-[16px]" />
//         </div>
//         <div className="w-full h-[38px] bg-fuchsdia-200 pl-1 border-b border-slate-200 py-2 flex items-center justify-between">
//           <span className="font-OpenSans text-[15px]">English</span>
//           <MdOutlineArrowForwardIos className="text-[16px]" />
//         </div>
//         <div className="w-full h-[36px] border hover:bg-mainBlue hover:text-white text-[15px] font-OpenSans font-semibold flex items-center justify-center rounded-md cursor-pointer mt-2">
//           Logout
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserCard;

// import React, { useEffect, useState } from "react";
// import { MdKeyboardArrowDown, MdOutlineArrowForwardIos } from "react-icons/md";

// interface UserData {
//   name: string;
//   email: string;
//   workspace: string;
// }

// const UserCard: React.FC = () => {
//   const [isUserMenuActive, setIsUserMenuActive] = useState(false);
//   const [isUserMenuCloseTriggered, setIsUserMenuCloseTriggered] =
//     useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const accessToken = localStorage.getItem("accessToken");
//       if (accessToken) {
//         try {
//           const response = await fetch(
//             "http://localhost:4000/api/v1/auth/user-data",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ access_token: accessToken }),
//             }
//           );

//           const data = await response.json();

//           if (response.ok && data.success) {
//             setUserData(data.data);
//           } else {
//             console.error("Failed to fetch user data");
//             localStorage.removeItem("accessToken");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//           localStorage.removeItem("accessToken");
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (isUserMenuCloseTriggered) {
//       const timer = setTimeout(() => {
//         setIsUserMenuActive(false);
//         setIsUserMenuCloseTriggered(false);
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [isUserMenuCloseTriggered]);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     setUserData(null);
//     setIsUserMenuActive(false);
//   };

//   if (!userData) {
//     return null; // Or a login button/component
//   }

//   return (
//     <>
//       <div
//         className="flex items-center gap-2 cursor-pointer"
//         onClick={() => {
//           setIsUserMenuActive(true);
//           setIsUserMenuCloseTriggered(false);
//         }}
//       >
//         <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
//           {userData.name.charAt(0)}
//         </div>
//         <MdKeyboardArrowDown />
//       </div>

//       {isUserMenuActive && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50"
//           onClick={() => {
//             setIsUserMenuActive(false);
//             setIsUserMenuCloseTriggered(false);
//           }}
//         >
//           <div
//             className="absolute right-0 top-0 w-80 h-full bg-white p-6"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold">Profile</h2>
//               <button
//                 className="text-2xl"
//                 onClick={() => setIsUserMenuCloseTriggered(true)}
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-bold">{userData.name}</h3>
//               <p>{userData.email}</p>
//             </div>

//             <div className="mb-6">
//               <h4 className="font-bold">Current Workspace</h4>
//               <p>{userData.workspace}</p>
//             </div>

//             <div className="mb-6">
//               <button className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded">
//                 <span>Switch Workspace</span>
//                 <MdOutlineArrowForwardIos />
//               </button>
//             </div>

//             <div className="mb-6">
//               <button className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded">
//                 <span>English</span>
//                 <MdOutlineArrowForwardIos />
//               </button>
//             </div>

//             <button
//               className="w-full py-2 px-4 bg-red-500 text-white rounded"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserCard;

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineArrowForwardIos } from "react-icons/md";

interface UserData {
  name: string;
  email: string;
  workspace: string;
}

const UserCard: React.FC = () => {
  const [isUserMenuActive, setIsUserMenuActive] = useState<boolean>(false);
  const [isUserMenuCloseTriggered, setIsUserMenuCloseTriggered] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await fetch(
            "http://localhost:4000/api/v1/auth/user-data",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ access_token: accessToken }),
            }
          );

          const data = await response.json();

          if (response.ok && data.success) {
            setUserData(data.data);
          } else {
            console.error("Failed to fetch user data");
            localStorage.removeItem("accessToken");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("accessToken");
        }
      }
    };

    fetchUserData();
  }, []);

  // Close the menu after a timeout when triggered
  useEffect(() => {
    if (isUserMenuCloseTriggered) {
      const timer = setTimeout(() => {
        setIsUserMenuActive(false);
        setIsUserMenuCloseTriggered(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isUserMenuCloseTriggered]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserData(null);
    setIsUserMenuActive(false);
  };

  if (!userData) {
    return null; // or return a login button or placeholder content
  }

  return (
    <>
      <div
        className="w-full h-full flex items-end justify-center cursor-pointer"
        onMouseEnter={() => (
          setIsUserMenuActive(true), setIsUserMenuCloseTriggered(false)
        )}
      >
        <div className="bg-gray-500 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer">
          <span className="text-[26px] font-bold">
            {userData.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <MdKeyboardArrowDown className="text-[20px] -ml-3 cursor-pointer rounded-full bg-mainBlue text-white" />
      </div>

      {/* Transparent overlay to close the menu when clicked outside */}
      <div
        className={`w-full h-full absolute top-0 left-0 bg-transparent z-10 ${
          isUserMenuActive ? "block" : " hidden"
        }`}
        onClick={() => (
          setIsUserMenuActive(false), setIsUserMenuCloseTriggered(false)
        )}
      ></div>

      {/* Dropdown menu */}
      <div
        className={`w-[168px] h-[244px] rounded bg-white border absolute top-14 right-3 p-2 font-OpenSans z-20 shadow-md transition-all duration-200 ${
          isUserMenuActive ? "block" : "hidden"
        }`}
        onMouseLeave={() => setIsUserMenuCloseTriggered(true)}
      >
        <div className="w-full h-[50px] pl-1 border-b pb-2 border-slate-200">
          <span className="text-[15px] font-semibold">{userData.name}</span>{" "}
          <br />
          <p className="text-[15px] -mt-1">{userData.email}</p>
        </div>
        <div className="w-full h-[54px] pl-1 border-b border-slate-200 pb-2">
          <span className="text-[15px]">Current Workspace</span> <br />
          <p className="text-[15px] font-semibold -mt-1">{userData.name}</p>
        </div>
        <div className="w-full h-[38px] pl-1 border-b border-slate-200 py-2 flex items-center justify-between">
          <span className="font-OpenSans text-[15px]">Switch Workspace</span>
          <MdOutlineArrowForwardIos className="text-[16px]" />
        </div>
        <div className="w-full h-[38px] pl-1 border-b border-slate-200 py-2 flex items-center justify-between">
          <span className="font-OpenSans text-[15px]">English</span>
          <MdOutlineArrowForwardIos className="text-[16px]" />
        </div>
        <div
          className="w-full h-[36px] border hover:bg-mainBlue hover:text-white text-[15px] font-OpenSans font-semibold flex items-center justify-center rounded-md cursor-pointer mt-2"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </>
  );
};

export default UserCard;
