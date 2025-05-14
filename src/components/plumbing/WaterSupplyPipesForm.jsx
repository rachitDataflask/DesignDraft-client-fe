import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";

// Reusable Components
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
      className="w-full h-[36px] text-[13px] px-3 rounded-[6px] text-[#374151] border border-gray-200 bg-gray-200 focus:outline-none focus:border-[#0083EE]"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const WaterSupplyPipesForm = ({ setData }) => {
  // const [room, setRoom] = useState("Select");
  const [wb, setWb] = useState(0);
  const [healthFaucet, setHealthFaucet] = useState(0);
  const [bibTaps, setBibTaps] = useState(0);
  const [serviceSink, setServiceSink] = useState(0);
  const [kitchenSink, setKitchenSink] = useState(0);
  const [waterFountain, setWaterFountain] = useState(0);

  const [wc, setWc] = useState(0);

  const [urinal, setUrinal] = useState(0);
  const [fixtureUnit, setFixtureUnit] = useState(0);
  const [flowrateLpm, setFlowRateLpm] = useState(0);
  const [flowrateMeter, setFlowRateMeter] = useState(0);

  // const [shower, setShower] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [requiredPipeSize, setRequiredPipeSize] = useState(0);
  const [providedPipeSize, setProvidedPipeSize] = useState(0);

  const handleCalculate = async () => {
    const res = await fetch("/api/water_supply_ps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        water_supply: [
          {
            num_wb: 5,
            num_health_faucet: 5,
            num_bib_tap: 10,
            num_service_sink: 2,
            num_kitchen_sink: 62,
            num_water_fountain: 1,
            num_wc: 5,
            num_urinal: 6,
            velocity_domestic: 1.2,
            velocity_flushing: 1.2,
          },
        ],
      }),
    });
    const result = await res.json();
    console.log(result.data[0].total_fixture_unit_flushing);
    setData(result.data);
  };

  return (
    <div className="w-[340px] h-full flex flex-col bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-[14px] font-semibold text-[#111827] leading-none">
            Water Supply Pipes
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
        {/* <SelectRow
          label="Select Room"
          value={room}
          onChange={setRoom}
          options={["Select", "Bathroom", "Kitchen", "Toilet"]}
        /> */}
        <InputRow
          label="Number of WB"
          //  unit="Nos"
          value={wb}
          onChange={setWb}
        />
        <InputRow
          label="Number of Health Faucet"
          //  unit="Nos"
          value={healthFaucet}
          onChange={setHealthFaucet}
        />
        <InputRow
          label="Number of Bib Taps"
          //  unit="Nos"
          value={bibTaps}
          onChange={setBibTaps}
        />
        <InputRow
          label="Number of Service Sink"
          //  unit="Nos"
          value={serviceSink}
          onChange={setServiceSink}
        />
        <InputRow
          label="Number of Kitchen Sink"
          //  unit="Nos"
          value={kitchenSink}
          onChange={setKitchenSink}
        />
        <InputRow
          label="Number of Water Fountain"
          //  unit="Nos"
          value={waterFountain}
          onChange={setWaterFountain}
        />

        <InputRow
          label="Number of WC"
          //  unit="Nos"
          value={wc}
          onChange={setWc}
        />
        <InputRow
          label="Number of Urinal"
          // unit="Nos"
          value={urinal}
          onChange={setUrinal}
        />
        {/* <InputRow
          label="Number of Shower"
          unit="Nos"
          value={shower}
          onChange={setShower}
        /> */}

        <InputRow
          label="Total Fixture Unit"
          // unit="FU"
          value={fixtureUnit}
          onChange={setFixtureUnit}
        />
        <InputRow
          label="Flow in LPM per Table 3 of NBC"
          // unit="m³/s"
          value={flowrateLpm}
          onChange={setFlowRateLpm}
        />
        <InputRow
          label="Flow in m3/s"
          // unit="m³/s"
          value={flowrateMeter}
          onChange={setFlowRateMeter}
        />
        <InputRow
          label="Velocity"
          // unit="m/s"
          value={velocity}
          onChange={setVelocity}
        />
        <InputRow
          label="Required Pipe Size"
          //  unit="m/s"
          value={requiredPipeSize}
          onChange={setRequiredPipeSize}
        />
        <InputRow
          label="Pipe size Provided in mm"
          //  unit="m/s"
          value={providedPipeSize}
          onChange={setProvidedPipeSize}
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

export default WaterSupplyPipesForm;
