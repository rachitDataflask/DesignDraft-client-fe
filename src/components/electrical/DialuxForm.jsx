import React, { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";
import ReactangleIcon from "../../icons/ReactangleIcon";
import FloorPreview from "../shared/FloorPreview";
import { useSelector } from "react-redux";

const DialuxForm = () => {
  const [roomType, setRoomType] = useState("");
  const [roomArea, setRoomArea] = useState(538);
  const [roomHeight, setRoomHeight] = useState(4);
  const [model, setModel] = useState("");
  const [illumination, setIllumination] = useState(4);
  const [power, setPower] = useState(646);
  const [length, setLength] = useState(1000);

  const rooms = useSelector((state) => state.rooms);

  const handleReload = () => {
    console.log("Reload clicked");
  };

  return (
    <div className="flex h-screen">
      {/* Left: Dialux Form */}
      <div className="w-[340px] h-full bg-white border-r border-gray-300 p-2 font-sans text-[13px] text-[#4B5563] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white flex justify-between items-start px-4 pt-3 pb-2 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-[14px] font-semibold text-black leading-none">
              Dialux
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

        {/* Room Details */}
        <p className="text-[11px] text-black mb-1">Room Details</p>
        <div className="border border-gray-300 rounded-md p-3 space-y-3 mb-4">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 bg-gray-200 focus:outline-none focus:border-[#0083EE] focus:ring-0"
          >
            <option value="">Select Room</option>
            <option value="Office">Office</option>
            <option value="Hall">Hall</option>
            <option value="Lobby">Lobby</option>
          </select>

          <p className="text-[11px] text-black mb-1">Area</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={roomArea}
              onChange={(e) => setRoomArea(parseFloat(e.target.value))}
              className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
            />
            <select className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400">
              <option>m.sq.</option>
            </select>
          </div>

          <p className="text-[11px] text-black mb-1">Height</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={roomHeight}
              onChange={(e) => setRoomHeight(parseFloat(e.target.value))}
              className="w-1/2 rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
            />
            <select className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400">
              <option>m</option>
            </select>
          </div>
        </div>

        {/* Select Model */}
        <p className="text-[11px] text-black mb-1">Select Model</p>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-md px-3 py-2 text-[13px] mb-4 bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
        >
          <option value="">Select</option>
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
          <option value="Model C">Model C</option>
        </select>

        {/* Light Details */}
        <p className="text-[11px] text-black mb-1">Light Details</p>
        <div className="border border-gray-300 rounded-md p-3 space-y-3 mb-4">
          <p className="text-[11px] text-black mb-1">Luminous Flex</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={illumination}
              onChange={(e) => setIllumination(parseFloat(e.target.value))}
              className="w-1/2 rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
            />
            <select className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400">
              <option>Lux</option>
            </select>
          </div>

          <p className="text-[11px] text-black mb-1">Connected Load</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(parseFloat(e.target.value))}
              className="w-1/2 rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
            />
            <select className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400">
              <option>KW</option>
            </select>
          </div>

          <p className="text-[11px] text-black mb-1">Mounting Height</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-1/2 rounded-md px-3 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400"
            />
            <select className="w-1/2 rounded-md px-2 py-2 text-[13px] bg-gray-200 border border-gray-200 focus:outline-none focus:border-[#0083EE] hover:border-gray-400">
              <option>m</option>
            </select>
          </div>
        </div>

        {/* Distribution Pattern Buttons */}
        <p className="text-[11px] text-black mb-2">Distribution Pattern</p>
        <div className="space-y-2 text-[13px]">
          <button className="w-full text-left px-3 py-2 border border-none text-black rounded-md font-medium flex items-center gap-2">
            <div className="w-[24px] h-[24px] bg-[#0083EE] rounded-md flex items-center justify-center">
              <ReactangleIcon className="w-[14px] h-[14px]" />
            </div>
            Draw rectangular arrangement
          </button>

          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ⬡ Draw polygonal arrangement
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ◯ Draw circular arrangement
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ── Draw line arrangement
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ⊞ Place individual luminaire
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ↔ Auto arrangement for space
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ↻ Replace selected luminaires
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            ⟳ Replace all similar luminaires
          </button>
        </div>
      </div>

      {/* Right: Floor Preview */}
      <div className="flex-1 h-full">
        <FloorPreview />
      </div>
    </div>
  );
};

export default DialuxForm;
