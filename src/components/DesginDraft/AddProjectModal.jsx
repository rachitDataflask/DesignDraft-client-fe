// src/components/AddProjectModal.jsx
import React from "react";

const AddProjectModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] p-6 rounded-2xl shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">
            Working on a new project?
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Project Name"
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none bg-gray-200"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Location</label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200">
              <option>Select</option>
              <option>Delhi</option>
              <option>Noida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Building Type
            </label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200">
              <option>Select</option>
              <option>X</option>
              <option>Y</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Sub building type
            </label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200">
              <option>Select</option>
              <option>A</option>
              <option>B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Level/Floor Count
            </label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200">
              <option>Select</option>
              <option>M</option>
              <option>N</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
