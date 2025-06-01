import React, { useState } from "react";

// Content Components

import Dialux from "../components/electrical/DialuxForm";
import SidebarElectrical from "../components/electrical/SidebarElectrical";
import Layout from "../components/ProjectLayout";
import DbDetailForm from "../components/electrical/DbDetailForm";
import BreakerSizingForm from "../components/electrical/BreakerSizingForm";
import CableSizingForm from "../components/electrical/CableSizingForm";

export default function ElectricalPage() {
  const [activeSection, setActiveSection] = useState("dialux"); // Default

  const renderContent = () => {
    switch (activeSection) {
      case "dialux":
        return <Dialux />;
      case "db-details":
        return <DbDetailForm />;
      case "breaker-sizing":
        return <BreakerSizingForm />;
      case "cable-size":
        return <CableSizingForm />;

      default:
        return <Dialux />;
    }
  };

  return (
    <div className="bg-[#f8f9fb] ">
      <Layout />
      <div className="flex overflow-hidden">
        <SidebarElectrical
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex p-4 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
