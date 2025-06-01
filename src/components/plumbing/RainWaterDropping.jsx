import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";

// Reusable InputRow without unit
const InputRow = ({ label, unit, value, onChange }) => (
  <div className="mb-[14px]">
    <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
    <div className="flex gap-[8px]">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`${
          unit ? "w-1/2" : "w-full"
        } h-[36px] px-3 text-[13px] rounded-[6px] text-[#374151] border border-gray-200 focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400`}
      />
      {/* 
      {unit && (
        <select className="w-1/2 h-[36px] text-[13px] px-2 rounded-[6px] text-[#374151] border border-gray-200 focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400">
          <option>{unit}</option>
        </select>
      )} 
      */}
    </div>
  </div>
);

const SelectRow = ({ label, value, onChange, options }) => (
  <div className="mb-[14px]">
    <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[36px] text-[13px] px-3 rounded-[6px] border border-gray-200 bg-gray-200 text-[#374151] focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const RainWaterDropping = ({ setData }) => {
  // const [building, setBuilding] = useState("Metro Station");

  const [area, setArea] = useState("250");
  const [pipes, setPipes] = useState("2");
  const [intensity, setIntensity] = useState("109");
  const [discharge, setDischarge] = useState("0.9");
  const [pipeDiameterMM, setPipeDiameterMM] = useState("5");

  const handleCalculate = async () => {
    const res = await fetch("/api/rainwater_dropping_sizing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roof_area_m2: 250,
        num_pipes: 2,
        intensity_rainfall_mm_h: 109,
        coefficient_discharge_c: 0.9,
      }),
    });
    const result = await res.json();
    console.log(result.data.catchment_area_per_pipe_m2);
    setData(result.data);
  };

  const handleReload = () => {
    console.log("Reload clicked");
  };

  return (
    <div className="w-[340px] h-full flex flex-col bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-[14px] font-semibold text-[#111827] leading-none">
            Rainwater Dropping
          </h2>
          <p className="text-[11px] text-[#9CA3AF] mt-[4px]">No update yet</p>
        </div>
        <button
          className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition"
          onClick={handleReload}
        >
          <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-[80px] bg-white">
        {/* <SelectRow
          label="Select Building"
          value={building}
          onChange={setBuilding}
          options={["Metro Station", "Mall", "Office"]}
        /> */}
        <InputRow label="Roof Area" value={area} onChange={setArea} />
        <InputRow
          label="Number of Pipes Provided"
          value={pipes}
          onChange={setPipes}
        />
        <InputRow
          label="Intensity of Rainfall"
          value={intensity}
          onChange={setIntensity}
        />
        <InputRow
          label="Coefficient of Discharge"
          value={discharge}
          onChange={setDischarge}
        />
        <InputRow
          label="Pipe Diameter in MM"
          value={pipeDiameterMM}
          onChange={setPipeDiameterMM}
        />
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-4">
        <button
          className="w-full h-[40px] bg-[#2E90FA] hover:bg-[#1C78DC] text-white text-[14px] font-semibold rounded-md transition"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default RainWaterDropping;
