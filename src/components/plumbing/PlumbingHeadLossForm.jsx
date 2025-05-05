import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";

// Reusable InputRow
const InputRow = ({ label, unit, value, onChange }) => (
  <div className="mb-[14px]">
    <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
    <div className="flex gap-[8px]">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-1/2 h-[36px] px-3 text-[13px] rounded-[6px] text-[#374151] border border-gray-200  focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400"
      />
      {unit && (
        <select className="w-1/2 h-[36px] text-[13px] px-2 rounded-[6px] text-[#374151] border border-gray-200  focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400">
          <option>{unit}</option>
        </select>
      )}
    </div>
  </div>
);

const InputRow1 = ({ label, unit, value, onChange }) => (
  <div className="mb-[14px]">
    <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
    <div className="flex gap-[8px]">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-[36px] px-3 text-[13px] rounded-[6px] text-[#374151] border border-gray-200  focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400"
      />
      {unit && (
        <select className="w-1/2 h-[36px] text-[13px] px-2 rounded-[6px] text-[#374151] border border-gray-200  focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400">
          <option>{unit}</option>
        </select>
      )}
    </div>
  </div>
);

// Reusable SelectRow
const SelectRow = ({ label, value, onChange, options }) => (
  <div className="mb-[14px]">
    <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[36px] text-[13px] px-3 rounded-[6px]  text-[#374151] border border-gray-200 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0 hover:border-gray-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const PlumbingHeadLossForm = ({ setData }) => {
  const [building, setBuilding] = useState("Metro Station");
  const [diameter, setDiameter] = useState("");
  const [material, setMaterial] = useState("");

  const [horizontal, setHorizontal] = useState(1000);
  const [vertical, setVertical] = useState(1000);
  const [elbow45, setElbow45] = useState(0);
  const [elbow90, setElbow90] = useState(0);
  const [tee90, setTee90] = useState(0);
  const [gateValve, setGateValve] = useState(0);
  const [globeValve, setGlobeValve] = useState(0);
  const [angleValve, setAngleValve] = useState(0);
  const [butterflyValve, setButterflyValve] = useState(0);
  const [nonReturnValve, setNonReturnValve] = useState(0);
  const [equivalentLength, setEquivalentLength] = useState(0);
  const [frictionCoeff, setFrictionCoeff] = useState(0);
  const [flowRate, setFlowRate] = useState(0);

  const handleCalculate = async () => {
    const res = await fetch("/api/calculate_water_requirement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "number_of_staff": 60,
        "number_of_passenger": 500,
        "pd_occupancy": 300,
        "station_area_for_cleaning": 3000,
        "gardening_area": 500
      }),
    });
    const result = await res.json();
    console.log(result.data.raw_water_requirement.total_water_requirement);
    setData(result.data);
  };

  return (
    <div className="w-[340px] flex flex-col bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-[14px] font-semibold text-[#111827] leading-none">
            Head Loss Calculation
          </h2>
          <p className="text-[11px] text-[#9CA3AF] mt-[4px]">No update yet</p>
        </div>
        <button
          className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition"
          onClick={() => console.log("Reload clicked")}
        >
          <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-[80px] bg-white ">
        <SelectRow
          label="Select Building"
          onChange={setBuilding}
          options={["Metro Station", "Mall", "Office"]}
        />
        {console.log(building)}
        <SelectRow
          label="Select Pipe Diameter"
          value={diameter}
          onChange={setDiameter}
          options={["100mm", "150mm", "200mm"]}
        />
        <SelectRow
          label="Select Pipe Material"
          value={material}
          onChange={setMaterial}
          options={["GI", "CI", "PVC"]}
        />

        <InputRow
          label="Horizontal Length"
          unit="m"
          value={horizontal}
          onChange={setHorizontal}
        />
        <InputRow
          label="Vertical Length"
          unit="m"
          value={vertical}
          onChange={setVertical}
        />
        <InputRow
          label="Screwed Elbow 45°"
          unit="Nos"
          value={elbow45}
          onChange={setElbow45}
        />
        <InputRow
          label="Screwed Elbow 90°"
          unit="Nos"
          value={elbow90}
          onChange={setElbow90}
        />
        <InputRow
          label="Screwed Tee 90°"
          unit="Nos"
          value={tee90}
          onChange={setTee90}
        />
        <InputRow
          label="Gate Valve"
          unit="Nos"
          value={gateValve}
          onChange={setGateValve}
        />
        <InputRow
          label="Globe Valve"
          unit="Nos"
          value={globeValve}
          onChange={setGlobeValve}
        />
        <InputRow
          label="Angle Valve"
          unit="Nos"
          value={angleValve}
          onChange={setAngleValve}
        />
        <InputRow
          label="Butterfly Valve"
          unit="Nos"
          value={butterflyValve}
          onChange={setButterflyValve}
        />
        <InputRow
          label="Non Return Valve"
          unit="Nos"
          value={nonReturnValve}
          onChange={setNonReturnValve}
        />
        <InputRow
          label="Equivalent Length of Pipes & Fittings"
          unit="m"
          value={equivalentLength}
          onChange={setEquivalentLength}
        />
        <InputRow1
          label="Frictional Loss Coefficient C"
          value={frictionCoeff}
          onChange={setFrictionCoeff}
        />
        <InputRow
          label="Flow rate Q"
          unit="m³/s"
          value={flowRate}
          onChange={setFlowRate}
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

export default PlumbingHeadLossForm;
