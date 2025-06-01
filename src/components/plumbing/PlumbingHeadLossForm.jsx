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
  // const [building, setBuilding] = useState("Metro Station");
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [pipeMaterial, setPipeMaterial] = useState("");

  const [lengthHorizontal, setLengthHorizontal] = useState("Nos");
  const [lengthVertical, setLengthVertical] = useState("Nos");
  const [se90, setSe90] = useState(0);
  const [se45, setSe45] = useState(0);
  const [we90, setWe90] = useState(0);
  const [gv, setGv] = useState(0);
  const [nrv, setNrv] = useState(0);
  const [bfv, setBfv] = useState(0);
  const [glv, setGlv] = useState(0);
  const [other, setOther] = useState(0);
  const [equivalentLength, setEquivalentLength] = useState(0);
  const [frictionCoeff, setFrictionCoeff] = useState(0);
  const [flowRate, setFlowRate] = useState(0);
  // const [pressureLossPerMeter, setPressureLossPerMeter] = useState(0);
  // const [pressureLossTotalLength, setPressureLossTotalLength] = useState(0);
  // const [pressureLossTotalLengthPerMeter, setPressureLossTotalLengthPerMeter] =
  //   useState(0);
  const [staticLoss, setStaticLoss] = useState(0);
  const [staticGain, setStaticGain] = useState(0);
  // const [totalPressureLoss, setTotalPressureLoss] = useState(0);

  const handleCalculate = async () => {
    const res = await fetch("/api/calculate_water_requirement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number_of_staff: 60,
        number_of_passenger: 500,
        pd_occupancy: 300,
        station_area_for_cleaning: 3000,
        gardening_area: 500,
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
        {/* <SelectRow
          label="Select Building"
          onChange={setBuilding}
          options={["Metro Station", "Mall", "Office"]}
        />
        {console.log(building)} */}
        <SelectRow
          label="Select Pipe Diameter"
          value={pipeDiameter}
          onChange={setPipeDiameter}
          options={["100mm", "150mm", "200mm"]}
        />
        <SelectRow
          label="Select Pipe Material"
          value={pipeMaterial}
          onChange={setPipeMaterial}
          options={["GI", "CI", "PVC"]}
        />

        <InputRow
          label="Pipe Horizontal Length"
          // unit="m"
          value={lengthHorizontal}
          onChange={setLengthHorizontal}
        />
        <InputRow
          label="Pipe Vertical Length"
          // unit="m"
          value={lengthVertical}
          onChange={setLengthVertical}
        />
        <InputRow
          label="SE 90°"
          //  unit="Nos"
          value={se90}
          onChange={setSe90}
        />
        <InputRow
          label="SE 45°"
          // unit="Nos"
          value={se45}
          onChange={setSe45}
        />
        <InputRow
          label="WE 90°"
          // unit="Nos"
          value={we90}
          onChange={setWe90}
        />
        <InputRow
          label="GV"
          // unit="Nos"
          value={gv}
          onChange={setGv}
        />
        <InputRow
          label="NRV"
          // unit="Nos"
          value={nrv}
          onChange={setNrv}
        />
        <InputRow
          label="BFV"
          //  unit="Nos"
          value={bfv}
          onChange={setBfv}
        />
        <InputRow
          label="GLV"
          // unit="Nos"
          value={glv}
          onChange={setGlv}
        />
        <InputRow
          label="OTHER"
          // unit="Nos"
          value={other}
          onChange={setOther}
        />
        <InputRow
          label="Equivalent Length of Pipes & Fittings"
          // unit="m"
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
          // unit="m³/s"
          value={flowRate}
          onChange={setFlowRate}
        />
        {/* <InputRow
          label="Pressure Loss Per Meter Length of Pipe"
          unit="Bar"
          value={pressureLossPerMeter}
          onChange={setPressureLossPerMeter}
        /> */}
        {/* <InputRow
          label="Pressure loss of total length of pipe"
          unit="Bar"
          value={pressureLossTotalLength}
          onChange={setPressureLossTotalLength}
        /> */}
        {/* <InputRow
          label="Pressure loss of total length of pipe Per Meter"
          unit="m"
          value={pressureLossTotalLengthPerMeter}
          onChange={setPressureLossTotalLengthPerMeter}
        /> */}
        <InputRow
          label="Static Loss"
          // unit="m"
          value={staticLoss}
          onChange={setStaticLoss}
        />
        <InputRow
          label="Static Gain"
          // unit="m"
          value={staticGain}
          onChange={setStaticGain}
        />
        {/* <InputRow
          label="Total Pressure Loss"
          unit="Bar"
          value={totalPressureLoss}
          onChange={setTotalPressureLoss}
        /> */}
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
