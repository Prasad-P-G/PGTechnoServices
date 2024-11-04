import React from "react";
import { NavLink } from "react-router-dom";

const ServiceGrid = ({ icon, text, label, heading }) => {
  return (
    <div className="flex w-full flex-col customShadow  border-2 items-center gap-2 bg-white rounded-lg m-2 p-2 lg:p-2">
      <img
        src={icon}
        alt="service image"
        className="bg-green-400 rounded-full w-full hover:bg-green-500 cursor-pointer"
      ></img>

      <h1 className="text-2xl lg:text-3xl text-center customShadow  text-green-600 font-semibold ">
        {heading}
      </h1>
      <h1 className=" text-[14px] lg:text-[18px] text-center text-slate-500">
        {text}
      </h1>
      {(label === "/ServicesMore" || label === "/MobileAppDevMore") && (
        <NavLink to={label}>
          <p className="bg-green-800 text-white px-3 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            View More
          </p>
        </NavLink>
      )}
    </div>
  );
};

export default ServiceGrid;
