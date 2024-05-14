// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import {
  ArrowLeftCircleIcon,
  // @ts-ignore
  BeakerIcon,
  ArrowRightCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @ts-ignore
const SidebarContext = createContext();

// @ts-ignore
export default function Sidebar({ children }) {
  // @ts-ignore
  const userDetail = useSelector((state) => state.userSlice.user)
  console.log(userDetail, "user detail");
  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth >= 640);
    };

    // Initial check on mount
    handleResize();

    // Add event listener to window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center max-sm:hidden">
          <p
            className={`overflow-hidden transition-all text-[30px] whitespace-nowrap ${expanded ? "w-36" : "w-auto"
              }`}
          >
            Clean Bin
          </p>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <ArrowLeftCircleIcon className="h-8 w-8 text-blue-500" />
            ) : (
              <ArrowRightCircleIcon className="h-8 w-8 text-blue-500" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <p className="w-10 h-10 rounded-md">MA</p>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{userDetail?.data?.username}</h4>
              <span className="text-xs text-gray-600">{userDetail?.data?.email}</span>
            </div>
            <UserCircleIcon className="h-8 w-8 " />
          </div>
        </div>
      </nav>
    </aside>
  );
}

// @ts-ignore
export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the provided onClick function
    }
  };

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
      onClick={() => handleClick()}
    >
      {typeof icon === "string" ? (
        <img src={icon} alt="icon" className="h-9 w-10 bg-transparent" />
      ):icon }
      {/* {icon} */}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
