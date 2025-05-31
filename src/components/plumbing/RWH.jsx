// import React, { useState } from "react";
// import { ReloadIcon } from "../../icons/ReloadIcon";

// // Reusable InputRow without unit
// const InputRow = ({ label, unit, value, onChange }) => (
//   <div className="mb-[14px]">
//     <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
//     <div className="flex gap-[8px]">
//       <input
//         type="number"
//         value={value}
//         onChange={(e) => onChange(parseFloat(e.target.value))}
//         className={`${
//           unit ? "w-1/2" : "w-full"
//         } h-[36px] px-3 text-[13px] rounded-[6px] text-[#374151] border border-gray-200 focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400`}
//       />
//       {/*
//       {unit && (
//         <select className="w-1/2 h-[36px] text-[13px] px-2 rounded-[6px] text-[#374151] border border-gray-200 focus:outline-none focus:border-[#0083EE] bg-gray-200 focus:ring-0 hover:border-gray-400">
//           <option>{unit}</option>
//         </select>
//       )}
//       */}
//     </div>
//   </div>
// );
// const SelectRow = ({ label, value, onChange, options }) => (
//   <div className="mb-[14px]">
//     <label className="block text-[11px] text-[#6B7280] mb-[6px]">{label}</label>
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full h-[36px] text-[13px] px-3 rounded-[6px] border border-gray-200 bg-gray-200 text-[#374151] focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
//     >
//       {options.map((opt) => (
//         <option key={opt} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const RWH = ({ setData }) => {
//   // const [building, setBuilding] = useState("Metro Station");

//   const [area, setArea] = useState("3280");
//   const [intensity, setIntensity] = useState("109");
//   const [runOff, setRunOff] = useState("0.9");
//   const [qMeterPerSecond, setQMeterPerSecond] = useState("0.9");
//   const [qLpm, setQLpm] = useState("0.9");

//   const [storageTime, setStorageTime] = useState("5");
//   const [harvestPitDepthMeter, setHarvestPitDepthMeter] = useState("5");
//   const [harvestPitDiaMeter, setHarvestPitDiaMeter] = useState("5");
//   const [harvestPitLengthXWidth, setHarvestPitLengthXWidth] = useState("5");
//   const [pipeDiameter, setPipeDiameter] = useState("5");

//   const handleCalculate = async () => {
//     const res = await fetch("/api/rwh_sizing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         rwh: [
//           {
//             area_m2: 3280,
//             intensity_mmhr: 109,
//             runoff_coefficient: 0.9,
//             storage_time_min: 5,
//           },
//         ],
//       }),
//     });
//     const result = await res.json();
//     console.log(result.data[0].discharge_m3hr);
//     setData(result.data);
//   };

//   const handleReload = () => {
//     console.log("Reload clicked");
//   };

//   return (
//     <div className="w-[340px] h-full flex flex-col bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden relative">
//       {/* Header */}
//       <div className="flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
//         <div>
//           <h2 className="text-[14px] font-semibold text-[#111827] leading-none">
//             RWH
//           </h2>
//           <p className="text-[11px] text-[#9CA3AF] mt-[4px]">No update yet</p>
//         </div>
//         <button
//           className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition"
//           onClick={handleReload}
//         >
//           <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
//         </button>
//       </div>

//       {/* Body */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 pb-[80px] bg-white">
//         {/* <SelectRow
//           label="Select Building"
//           value={building}
//           onChange={setBuilding}
//           options={["Metro Station", "Mall", "Office"]}
//         /> */}
//         <InputRow label="Roof Area" value={area} onChange={setArea} />

//         <InputRow
//           label="Intensity of Rainfall"
//           value={intensity}
//           onChange={setIntensity}
//         />
//         <InputRow
//           label="Run OffCoefficient"
//           value={runOff}
//           onChange={setRunOff}
//         />
//         <InputRow
//           label="Q Meter Per Second"
//           value={qMeterPerSecond}
//           onChange={setQMeterPerSecond}
//         />
//         <InputRow label="Q LPM" value={qLpm} onChange={setQLpm} />

//         <InputRow
//           label="Storage Time Minutes"
//           value={storageTime}
//           onChange={setStorageTime}
//         />
//         <InputRow
//           label="Harvest Pit Depth Meter"
//           value={harvestPitDepthMeter}
//           onChange={setHarvestPitDepthMeter}
//         />
//         <InputRow
//           label="Harvest Pit Dia Meter"
//           value={harvestPitDiaMeter}
//           onChange={setHarvestPitDiaMeter}
//         />
//         <InputRow
//           label="Harvest Pit Length X Width"
//           value={harvestPitLengthXWidth}
//           onChange={setHarvestPitLengthXWidth}
//         />
//         <InputRow
//           label="Pipe Diameter"
//           value={pipeDiameter}
//           onChange={setPipeDiameter}
//         />
//       </div>

//       {/* Bottom Button */}
//       <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-4">
//         <button
//           className="w-full h-[40px] bg-[#2E90FA] hover:bg-[#1C78DC] text-white text-[14px] font-semibold rounded-md transition"
//           onClick={handleCalculate}
//         >
//           Calculate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RWH;

import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";
import { useAddRwhSizingMutation } from "../../redux/features/api/api"; // ✅ Adjust the path as per your project

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
    </div>
  </div>
);

const RWH = ({ setData }) => {
  const [addRwhSizing, { isLoading }] = useAddRwhSizingMutation();

  const [area, setArea] = useState("3280");
  const [intensity, setIntensity] = useState("109");
  const [runOff, setRunOff] = useState("0.9");
  const [qMeterPerSecond, setQMeterPerSecond] = useState("0.9");
  const [qLpm, setQLpm] = useState("0.9");
  const [storageTime, setStorageTime] = useState("5");
  const [harvestPitDepthMeter, setHarvestPitDepthMeter] = useState("5");
  const [harvestPitDiaMeter, setHarvestPitDiaMeter] = useState("5");
  const [harvestPitLengthXWidth, setHarvestPitLengthXWidth] = useState("5");
  const [pipeDiameter, setPipeDiameter] = useState("5");

  const handleCalculate = async () => {
    try {
      const response = await addRwhSizing({
        rwh: [
          {
            area_m2: parseFloat(area),
            intensity_mmhr: parseFloat(intensity),
            runoff_coefficient: parseFloat(runOff),
            storage_time_min: parseFloat(storageTime),
          },
        ],
      }).unwrap();

      console.log(response.data[0].discharge_m3hr);
      setData(response.data);
    } catch (error) {
      console.error("Failed to calculate RWH sizing:", error);
    }
  };

  return (
    <div className="w-[340px] h-full flex flex-col bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-[14px] font-semibold text-[#111827] leading-none">
            RWH
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
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-[80px] bg-white">
        <InputRow label="Roof Area" value={area} onChange={setArea} />
        <InputRow
          label="Intensity of Rainfall"
          value={intensity}
          onChange={setIntensity}
        />
        <InputRow
          label="Run Off Coefficient"
          value={runOff}
          onChange={setRunOff}
        />
        <InputRow
          label="Q Meter Per Second"
          value={qMeterPerSecond}
          onChange={setQMeterPerSecond}
        />
        <InputRow label="Q LPM" value={qLpm} onChange={setQLpm} />
        <InputRow
          label="Storage Time Minutes"
          value={storageTime}
          onChange={setStorageTime}
        />
        <InputRow
          label="Harvest Pit Depth Meter"
          value={harvestPitDepthMeter}
          onChange={setHarvestPitDepthMeter}
        />
        <InputRow
          label="Harvest Pit Dia Meter"
          value={harvestPitDiaMeter}
          onChange={setHarvestPitDiaMeter}
        />
        <InputRow
          label="Harvest Pit Length X Width"
          value={harvestPitLengthXWidth}
          onChange={setHarvestPitLengthXWidth}
        />
        <InputRow
          label="Pipe Diameter"
          value={pipeDiameter}
          onChange={setPipeDiameter}
        />
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-4">
        <button
          className="w-full h-[40px] bg-[#2E90FA] hover:bg-[#1C78DC] text-white text-[14px] font-semibold rounded-md transition"
          onClick={handleCalculate}
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Calculate"}
        </button>
      </div>
    </div>
  );
};

export default RWH;
