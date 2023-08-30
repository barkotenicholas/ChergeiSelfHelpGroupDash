import React, { createContext, useContext, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SideBarItem from "../SideBarData/SideBarItemsData";
import { FaHome , FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
export default function SideBar() {

  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between">
          <p className={` ${ expanded ? "mb-2 text-xl font-medium":"mb-1 text-sm font-normal"} `} > Chergei Billing </p>
          <button onClick={()=> setExpanded(current => !current)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100" >
            {expanded? <BiChevronRight/> : <BiChevronLeft/>}
          </button>
        </div>

        <ul className="flex-1 px-3">
          <Link to="/">
            <SideBarItem icon={<FaHome/>} text="Home" expanded={expanded}  />
          </Link>
          <Link to="/Users">
          <SideBarItem icon={<FaUsers/>} text="Users" expanded={expanded} />

          </Link>
        </ul>

        <div className="border-t flex p-3">
          <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />

            <div
              className={`flex justify-between items-center w-52 ml-3 overflow-hidden transition-all ${expanded ? "w-52 ml-3": "w-0"}`}
            >
              <div
                className="leading-4"
              >
                  <h4 className="font-semibold">
                    John Doe
                  </h4>
                  <span className="text-xs text-gray-600">
                    JohnDoe@gmail.com
                  </span>
                
              </div>
            </div>
        </div>
      </nav>
    </aside>
  );
};




