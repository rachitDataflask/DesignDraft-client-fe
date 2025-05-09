import React, { useState } from "react";

// Content Components

import Layout from "../components/ProjectLayout";

import HeatLoad from "../components/HVAC/HeatLoad";
import Ventilation from "../components/HVAC/Ventilation";
import DuctSizing from "../components/HVAC/DuctSizing";
import SidebarHVAC from "../components/HVAC/SidebarHVAC";

export default function HVACPage() {
  const [activeSection, setActiveSection] = useState("heat-load"); // Default

  const renderContent = () => {
    switch (activeSection) {
      case "heat-load":
        return <HeatLoad />;
      case "ventilation":
        return <Ventilation />;
      case "duct-sizing":
        return <DuctSizing />;

      default:
        return <HeatLoad />;
    }
  };

  return (
    <div className="bg-[#f8f9fb] h-screen flex flex-col">
      <Layout />
      <div className="flex flex-1 overflow-hidden">
        <SidebarHVAC
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 p-4 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
