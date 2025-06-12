import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";
import FloorPreview from "../shared/FloorPreview";

const DbDetailForm = () => {
  const [formData, setFormData] = useState({
    building: "",
    level: "",
    area: "",
    wattage: "",
    wattageUnit: "Watts",
    connectedLoad: "",
    loadUnit: "KW",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReload = () => {
    console.log("Reload clicked");
  };

  return (
    <div className="flex h-screen">
      <div className="w-[340px] h-[92vh] bg-white border-r border-gray-300  pt-0 p-2 font-sans text-[13px] text-[#4B5563] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-[14px] font-semibold text-black leading-none">
              DB Detail
            </h1>
            <p className="text-[11px] text-gray-400 mt-[2px]">No update yet</p>
          </div>
          <button
            className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition"
            onClick={handleReload}
          >
            <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
          </button>
        </div>

        {/* Building Info */}
        <p className="text-[11px] text-black mb-1 mt-3">Select Building</p>
        <select
          name="building"
          value={formData.building}
          onChange={handleChange}
          className="w-[95%] border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0 mb-3"
        >
          <option value="">Select</option>
          <option value="Metro Station">Metro Station</option>
        </select>

        <p className="text-[11px] text-black mb-1">Select Level</p>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-[95%] border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0 mb-3"
        >
          <option value="">Select</option>
          <option value="Ground Level">Ground Level</option>
        </select>

        <p className="text-[11px] text-black mb-1">Select Area</p>
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-[95%] border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0 mb-4"
        >
          <option value="">Select</option>
          <option value="BOH">BOH</option>
        </select>

        {/* Electrical Details */}
        <p className="text-[11px] text-black mb-1">Wattage</p>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            name="wattage"
            value={formData.wattage}
            onChange={handleChange}
            className="w-1/2 rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
          />
          <select
            name="wattageUnit"
            value={formData.wattageUnit}
            onChange={handleChange}
            className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
          >
            <option>Watts</option>
            <option>kW</option>
          </select>
        </div>

        <p className="text-[11px] text-black mb-1">Connected Load</p>
        <div className="flex gap-2">
          <input
            type="number"
            name="connectedLoad"
            value={formData.connectedLoad}
            onChange={handleChange}
            className="w-1/2 rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
          />
          <select
            name="loadUnit"
            value={formData.loadUnit}
            onChange={handleChange}
            className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
          >
            <option>KW</option>
            <option>MW</option>
          </select>
        </div>
      </div>
      {/* Right: Floor Preview */}
      <div className="flex-1 h-full">
        <FloorPreview />
      </div>
    </div>
  );
};

export default DbDetailForm;
