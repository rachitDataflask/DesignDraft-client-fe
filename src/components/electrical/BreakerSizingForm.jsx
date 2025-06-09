import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";
import FloorPreview from "../shared/FloorPreview";

const BreakerSizingForm = () => {
  const [formData, setFormData] = useState({
    building: "",
    panel: "",
    equipment: "",
    connectedLoad: "",
    systemVoltage: "",
    powerFactor: "",
    loadFactor: "",
    demandFactor: "",
    mdLoad: "",
    kvar: "",
    fullLoadCurrent: "",
    spareDesign: "",
    switchGearCurrent: "",
    breakerSelection: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderInput = (label, field, unit = null) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-[#5B5B5B] mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-[75%] rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
          placeholder="Enter value"
        />
        {unit && (
          <div className="w-14 h-8 flex items-center justify-center rounded-md border border-[#E4E4E7]  bg-gray-200 text-sm text-gray-600">
            {unit}
          </div>
        )}
      </div>
    </div>
  );

  const renderDropdown = (label, field, options = ["1"]) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-[#5B5B5B] mb-1">
        {label}
      </label>
      <select
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-[95%] border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0 mb-3"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex h-screen">
      <div className="w-[340px] h-[85vh] bg-white border border-gray-300 rounded-md pt-0 p-2 font-sans text-[13px] text-[#4B5563] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-[14px] font-semibold text-black leading-none">
              Breaker Sizing
            </h1>
            <p className="text-[11px] text-gray-400 mt-[2px]">No update yet</p>
          </div>
          <button className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition">
            <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
          </button>
        </div>
        <div className="border-b border-gray-200 mb-3"></div>

        {/* Scrollable content */}
        <div className="overflow-y-auto pr-1 h-[calc(100%-70px)]">
          {renderDropdown("Select Building", "building", ["Metro Station"])}
          {renderDropdown("Select Panel", "panel", ["MDB"])}
          {renderDropdown("Select Connected Equipments", "equipment", ["ACDB"])}
          {renderInput("Connected Load", "connectedLoad", "KW")}
          {renderInput("System Voltage", "systemVoltage", "V")}
          {renderDropdown("Power Factor", "powerFactor", ["1"])}
          {renderDropdown("Load Factor", "loadFactor", ["1"])}
          {renderDropdown("Demand Factor", "demandFactor", ["1"])}
          {renderInput("MD Load", "mdLoad", "KW")}
          {renderInput("KVAR", "kvar")}
          {renderInput("Full Load Current", "fullLoadCurrent", "KW")}
          {renderInput("Spare Design", "spareDesign", "KW")}
          {renderInput("Switch Gear Current", "switchGearCurrent", "KW")}
          {renderInput("Breaker Selection", "breakerSelection", "KW")}
        </div>
      </div>
      {/* Right: Floor Preview */}
      <div className="flex-1 h-full">
        <FloorPreview />
      </div>
    </div>
  );
};

export default BreakerSizingForm;
