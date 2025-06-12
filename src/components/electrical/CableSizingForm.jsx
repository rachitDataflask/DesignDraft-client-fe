import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";
import FloorPreview from "../shared/FloorPreview";

// Reusable select component
const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-[95%] border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0 mb-3"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

// Reusable input + unit select component
const FormInputWithUnit = ({
  label,
  name,
  value,
  unitName,
  unitValue,
  onChange,
  unitOptions,
}) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="flex gap-2">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-[75%] rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
      />
      <select
        name={unitName}
        value={unitValue}
        onChange={onChange}
        className="w-14 h-8 flex items-center justify-center rounded-md border border-[#E4E4E7]  bg-gray-200 text-sm text-gray-600"
      >
        {unitOptions.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const CableSizingForm = () => {
  const [formData, setFormData] = useState({
    building: "Residential Tower",
    panel: "MDB",
    equipment: "ACDB",
    cableType: "XLPE",
    cableLength: "1499",
    cableLengthUnit: "m",
    numCore: "1833",
    numCoreUnit: "Core",
    cableSize: "2168",
    cableSizeUnit: "mm",
    connectedLoad: "1000",
    connectedLoadUnit: "KW",
    voltageDrop: "1000",
    voltageDropUnit: "V",
    breakerSize: "3171",
    powerFactor: "3506",
    diversityFactor: "3840",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-[340px] h-[92vh] bg-white border-r border-gray-300 rounded-md pt-0 p-2 font-sans text-[13px] text-[#4B5563] overflow-auto"
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-[14px] font-semibold text-black leading-none">
              Cable Sizing
            </h1>
            <p className="text-[11px] text-gray-400 mt-[2px]">No update yet</p>
          </div>
          <button className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition">
            <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
          </button>
        </div>
        <div className="border-b border-gray-200 mb-3"></div>

        {/* Dropdowns */}
        <FormSelect
          label="Select Building"
          name="building"
          value={formData.building}
          onChange={handleChange}
          options={["Residential Tower"]}
        />
        <FormSelect
          label="Select Panel"
          name="panel"
          value={formData.panel}
          onChange={handleChange}
          options={["MDB"]}
        />
        <FormSelect
          label="Select Connected Equipments"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          options={["ACDB"]}
        />
        <FormSelect
          label="Cable Type"
          name="cableType"
          value={formData.cableType}
          onChange={handleChange}
          options={["XLPE"]}
        />

        {/* Input + unit fields */}
        <FormInputWithUnit
          label="Cable Length"
          name="cableLength"
          value={formData.cableLength}
          unitName="cableLengthUnit"
          unitValue={formData.cableLengthUnit}
          onChange={handleChange}
          unitOptions={["m"]}
        />
        <FormInputWithUnit
          label="Number of Core"
          name="numCore"
          value={formData.numCore}
          unitName="numCoreUnit"
          unitValue={formData.numCoreUnit}
          onChange={handleChange}
          unitOptions={["Core"]}
        />
        <FormInputWithUnit
          label="Cable Size"
          name="cableSize"
          value={formData.cableSize}
          unitName="cableSizeUnit"
          unitValue={formData.cableSizeUnit}
          onChange={handleChange}
          unitOptions={["mm"]}
        />
        <FormInputWithUnit
          label="Connected Load"
          name="connectedLoad"
          value={formData.connectedLoad}
          unitName="connectedLoadUnit"
          unitValue={formData.connectedLoadUnit}
          onChange={handleChange}
          unitOptions={["KW"]}
        />
        <FormInputWithUnit
          label="Voltage Drop"
          name="voltageDrop"
          value={formData.voltageDrop}
          unitName="voltageDropUnit"
          unitValue={formData.voltageDropUnit}
          onChange={handleChange}
          unitOptions={["V"]}
        />

        {/* Final 3 selects */}
        <FormSelect
          label="Breaker Size"
          name="breakerSize"
          value={formData.breakerSize}
          onChange={handleChange}
          options={[formData.breakerSize]}
        />
        <FormSelect
          label="Power Factor"
          name="powerFactor"
          value={formData.powerFactor}
          onChange={handleChange}
          options={[formData.powerFactor]}
        />
        <FormSelect
          label="Diversity Factor"
          name="diversityFactor"
          value={formData.diversityFactor}
          onChange={handleChange}
          options={[formData.diversityFactor]}
        />

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full bg-sky-500 text-white font-medium py-2 rounded-md text-sm hover:bg-sky-600 transition"
        >
          Calculate
        </button>
      </form>
      {/* Right: Floor Preview */}
      <div className="flex-1 h-full">
        <FloorPreview />
      </div>
    </div>
  );
};

export default CableSizingForm;
