import React, { useEffect, useState } from "react";
import { Search } from "../icons/Search";
import { Settings } from "../icons/Settings";
import { Icons3 } from "../icons/Icons3";
import { Icons4 } from "../icons/Icons4";
import { Property1Hisotry } from "../icons/Property1Hisotry";
import { Property1Plus1 } from "../icons/Property1Plus1";
import { Property1Template } from "../icons/Property1Template";

const Sidebar = ({ activeButton, setActiveButton }) => {
  const buttonConfig = {
    search: {
      icon: Search,
      label: "Search",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    create: {
      icon: Property1Plus1,
      label: "Create",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    history: {
      icon: Property1Hisotry,
      label: "History",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    templates: {
      icon: Property1Template,
      label: "Templates",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    upload: {
      icon: Icons3,
      label: "Upload",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    connections: {
      icon: Icons4,
      label: "Connections",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    settings: {
      icon: Settings,
      label: "Settings",
      activeColor: "#01a7b8",
      activeIconColor: "#FFFFFF",
      inactiveIconColor: "#444444",
    },
    // ... rest of buttonConfig
  };

  const renderButton = (key) => {
    const config = buttonConfig[key];
    const isActive = activeButton === key;
    const Icon = config.icon;

    return (
      <div className="flex flex-col w-[69px] items-center gap-1.5 relative flex-[0_0_auto]">
        <button
          onClick={() => {
            setActiveButton(key);
            window.localStorage.setItem("appState", key);
            console.log("key", key);
          }}
          className={`flex h-[36.03px] items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full 
            rounded-[8.65px] transition-all duration-200 hover:scale-105 active:scale-95
            ${isActive ? "bg-[#01a7b8]" : "bg-[#f8f6f3] hover:bg-[#f0ede8]"}`}
          style={{ backgroundColor: isActive ? config.activeColor : undefined }}
        >
          <Icon
            className="!relative !w-5 !h-5 !mt-[-1.99px] !mb-[-1.99px] transition-colors duration-200"
            color={isActive ? config.activeIconColor : config.inactiveIconColor}
          />
        </button>
        <div
          className={`relative self-stretch h-3 leading-[11.5px] whitespace-nowrap 
          [font-family:'IBM_Plex_Sans',Helvetica] font-medium text-xs text-center tracking-[0]
          transition-colors duration-200
          ${isActive ? "text-[#01a7b8]" : "text-[#444444]"}`}
          style={{ color: isActive ? config.activeColor : undefined }}
        >
          {config.label}
        </div>
      </div>
    );
  };

  return (
    <div className="inline-flex flex-col h-full items-start justify-center gap-2.5 px-3 py-6 fixed top-0 left-0 bg-white border-r border-[#e6e6ea] z-10">
      <div className="inline-flex flex-col items-center gap-6 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold">Cordial</span>
            <div className="w-2 h-2 rounded-full bg-[#00BEC0]" />
          </div>
          {renderButton("search")}
          {renderButton("create")}
          {renderButton("history")}
          {renderButton("templates")}
          {renderButton("upload")}
          {renderButton("connections")}
          {renderButton("settings")}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
