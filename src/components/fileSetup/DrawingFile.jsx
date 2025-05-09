import { useState } from "react";
import { ReloadIcon } from "../../icons/ReloadIcon";
import UploadIcon from "../../icons/UploadIcon";
import RotationIcon from "../../icons/RotationIcon";

const DrawingFile = () => {
  const [coordinateSystem, setCoordinateSystem] = useState("User defined");

  return (
    <div className="w-[340px] rounded-xl bg-white shadow-sm p-4 text-sm font-medium text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[14px] font-semibold text-gray-800">
            Drawing file
          </h2>
          <p className="text-[12px] text-gray-400 mt-[2px]">
            Updated: Just now
          </p>
        </div>
        <button className="w-[24px] h-[24px] bg-[#0083EE] text-white rounded-md flex items-center justify-center hover:bg-[#1C78DC] transition">
          <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
        </button>
      </div>

      {/* Divider */}
      <hr className="my-4 border-t border-gray-200" />

      {/* Uploaded File */}
      <div>
        <p className="mb-2 text-[13px]">Uploaded file</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 gap-2 w-full mr-2">
            <img src="src/assets/pdf.png" alt="pdf" className="w-5 h-5" />
            <span className="text-[13px] text-gray-700">Drawing file 1</span>
            <ReloadIcon className="w-4 h-4 stroke-gray-500 ml-auto" />
          </div>
          <button className="w-[36px] h-[36px] bg-gray-100 rounded-lg flex items-center justify-center">
            <UploadIcon className="w-4 h-4 stroke-gray-600" />
          </button>
        </div>
      </div>

      {/* Set Scale */}
      <div className="mt-6">
        <p className="mb-2 text-[13px]">Set Scale</p>
        <select className="w-full bg-gray-200 rounded-lg px-3 py-2 text-gray-700 text-[13px] outline-none">
          <option>Select</option>
        </select>
      </div>

      {/* Positioning Section */}
      <div className="mt-6">
        <p className="mb-2 text-[13px]">Positioning</p>
        <div className="border border-gray-200 rounded-lg p-3 space-y-3">
          {/* Coordinate system */}
          <div>
            <p className="mb-1 text-[13px]">Coordinate system</p>
            <select className="w-full bg-gray-200 rounded-md px-3 py-2 text-gray-700 text-[13px] outline-none">
              <option>{coordinateSystem}</option>
            </select>
          </div>

          {/* Position */}
          <div>
            <p className="mb-1 text-[13px]">Position</p>
            <div className="flex gap-2">
              {/* X */}
              <div className="relative w-1/3">
                <img
                  src="src/assets/X.svg"
                  alt="X"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
                />
                <input
                  type="text"
                  readOnly
                  value="25"
                  className="w-full bg-gray-200 rounded-md pl-7 pr-2 py-2 text-[13px] text-gray-500"
                />
              </div>
              {/* Y */}
              <div className="relative w-1/3">
                <img
                  src="src/assets/Y.svg"
                  alt="Y"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
                />
                <input
                  type="text"
                  readOnly
                  value="0"
                  className="w-full bg-gray-200 rounded-md pl-7 pr-2 py-2 text-[13px] text-gray-500"
                />
              </div>
              {/* Z */}
              <div className="relative w-1/3">
                <img
                  src="src/assets/Z.svg"
                  alt="Z"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
                />
                <input
                  type="text"
                  readOnly
                  value="0"
                  className="w-full bg-gray-200 rounded-md pl-7 pr-2 py-2 text-[13px] text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div>
            <p className="mb-1 text-[13px]">Rotation</p>
            <div className="flex items-center gap-2 bg-gray-200 rounded-md px-3 py-2 text-gray-500">
              <RotationIcon className="w-4 h-4" />
              <span className="text-[13px]">0°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Checkboxes */}
      <div className="mt-6 space-y-2 text-[13px]">
        <p className="mb-1">Layer</p>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked readOnly className="accent-blue-600" />
          <span>Window</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked readOnly className="accent-blue-600" />
          <span>Door</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked readOnly className="accent-blue-600" />
          <span>Wall</span>
        </label>
      </div>
    </div>
  );
};

export default DrawingFile;
