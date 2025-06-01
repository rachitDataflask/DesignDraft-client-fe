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
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 h-[36px] px-3 text-[13px] rounded-[6px] text-[#374151] border border-gray-200 focus:outline-none focus:border-[#0083EE] bg-gray-200 hover:border-gray-400"
      />
      {unit && (
        <select
          value={unit}
          onChange={(e) => onChange(e.target.value, true)}
          className="w-1/2 h-[36px] text-[13px] px-2 rounded-[6px] border border-gray-200 focus:outline-none focus:border-[#0083EE] bg-gray-200 text-[#374151] hover:border-gray-400"
        >
          <option value={unit}>{unit}</option>
        </select>
      )}
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

const WaterDemandForm = ({ setData }) => {
  // const [building, setBuilding] = useState("Metro Station");

  const [staff, setStaff] = useState();
  // const [staffUnit, setStaffUnit] = useState("Nos");

  const [passenger, setPassenger] = useState();
  // const [passengerUnit, setPassengerUnit] = useState("Nos");
  const [pdArea, setPdArea] = useState();
  // const [pdAreaUnit, setPdAreaUnit] = useState("Sq.m");
  const [pdOccupancy, setPdOccupancy] = useState();
  // const [pdOccupancyUnit, setPdOccupancyUnit] = useState("Sq.m");

  const [stationCleaningArea, setStationCleaningArea] = useState();
  // const [stationCleaningUnit, setStationCleaningUnit] = useState("Sq. m");

  const [gardeningArea, setGardeningArea] = useState();
  // const [gardeningUnit, setGardeningUnit] = useState("Sq.m");

  const [totalWaterRequirement, setTotalWaterRequirement] = useState();
  // const [totalWaterRequirementUnit, setTotalWaterRequirementUnit] =
  //   useState("Litre/hour");

  const [ugWaterTankRequirementFullDay, setUgWaterTankRequirementFullDay] =
    useState();
  // const [ugWaterTankRequirementFullDayUnit, setUgWaterTankRequirementFullDayUnit] =
  //   useState("Litre/hour");
  const [ugWaterTankRequirementHalfDay, setUgWaterTankRequirementHalfDay] =
    useState();
  // const [ugWaterTankRequirementHalfDayUnit, setUgWaterTankRequirementHalfDayUnit] =
  //   useState("Litre/hour");

  // const [operationalHour, setOperationalHour] = useState("18");
  // const [operationalHourUnit, setOperationalHourUnit] = useState("Hour");

  // const [diversity, setDiversity] = useState("70%");

  const handleCalculate = async () => {
    const res = await fetch("/api/water_demand_elevated", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        water_demand: [
          {
            num_staff: 50,
            num_passenger: 500,
            pd_area: 3000,
            station_area_cleaning: 3000,
            gardening_area: 500,
          },
        ],
      }),
    });
    const result = await res.json();
    console.log(result.data[0].total_raw_water);
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
            Water Demand
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
        <InputRow
          label="Number of Staff"
          // unit={staffUnit}
          value={staff}
          onChange={setStaff}
          // onChange={(val, isUnit) =>
          //   isUnit ? setStaffUnit(val) : setStaff(val)
          // }
        />
        <InputRow
          label="Number of Passengers"
          // unit={passengerUnit}
          value={passenger}
          onChange={setPassenger}
          // onChange={(val, isUnit) =>
          //   isUnit ? setPassengerUnit(val) : setPassenger(val)
          // }
        />
        <InputRow
          label="PD Area"
          // unit={pdAreaUnit}
          value={pdArea}
          // onChange={(val, isUnit) =>
          //   isUnit ? setPdAreaUnit(val) : setPdArea(val)
          // }
          onChange={setPdArea}
        />
        <InputRow
          label="PD Occupancy"
          // unit={pdAreaUnit}
          value={pdOccupancy}
          // onChange={(val, isUnit) =>
          //   isUnit ? setPdAreaUnit(val) : setPdArea(val)
          // }
          onChange={setPdOccupancy}
        />
        <InputRow
          label="Staion Area for Cleaning"
          // unit={stationCleaningUnit}
          value={stationCleaningArea}
          // onChange={(val, isUnit) =>
          //   isUnit ? setStationCleaningUnit(val) : setStationCleaningArea(val)
          // }
          onChange={setStationCleaningArea}
        />
        <InputRow
          label="Area for Gardening"
          // unit={gardeningUnit}
          value={gardeningArea}
          // onChange={(val, isUnit) =>
          //   isUnit ? setGardeningUnit(val) : setGardeningArea(val)
          // }
          onChange={setGardeningArea}
        />

        <InputRow
          label="Total Water Requirement"
          // unit={totalWaterRequirementUnit}
          value={totalWaterRequirement}
          // onChange={(val, isUnit) =>
          //   isUnit
          //     ? setTotalWaterRequirementUnit(val)
          //     : setTotalWaterRequirement(val)
          // }
          onChange={setTotalWaterRequirement}
        />
        <InputRow
          label="UG Water Tank Requirement For Full Day"
          // unit={ugWaterTankRequirementUnit}
          value={ugWaterTankRequirementFullDay}
          // onChange={(val, isUnit) =>
          //   isUnit
          //     ? setUgWaterTankRequirementUnit(val)
          //     : setUgWaterTankRequirement(val)
          // }
          onChange={setUgWaterTankRequirementFullDay}
        />
        <InputRow
          label="UG Water Tank Requirement For Half Day"
          // unit={ugWaterTankRequirementUnit}
          value={ugWaterTankRequirementHalfDay}
          // onChange={(val, isUnit) =>
          //   isUnit
          //     ? setUgWaterTankRequirementUnit(val)
          //     : setUgWaterTankRequirement(val)
          // }
          onChange={setUgWaterTankRequirementHalfDay}
        />
        {/* <InputRow
          label="Operational Hours"
          unit={operationalHourUnit}
          value={operationalHour}
          onChange={(val, isUnit) =>
            isUnit ? setOperationalHourUnit(val) : setOperationalHour(val)
          }
        /> */}
        {/* <InputRow1
          label="Diversity Factor"
          value={diversity}
          onChange={setDiversity}
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

export default WaterDemandForm;
