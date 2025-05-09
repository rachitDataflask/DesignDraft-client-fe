import React, { useState } from "react";
import DraftSideBar from "./DraftSideBar";
import AddProjectModal from "./AddProjectModal"; // Adjust path if needed

const DesignCalculation = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-[280px] border-r border-gray-200 bg-white">
        <DraftSideBar />
      </div>

      {/* Right Main Content */}
      <div className="flex-1 bg-[#f7f7f7] relative">
        {/* Add New Button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#007bff] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add New
          </button>
        </div>

        {/* Center Empty State Content */}
        <div className="flex items-center justify-center h-full px-4">
          <div className="text-center">
            <img
              src="/src/images/DC.svg"
              alt="No Project"
              className="w-[320px] object-contain mb-6 opacity-70 mx-auto"
            />
            <p className="text-sm text-gray-500">
              No project to show in Design Calculation
            </p>
          </div>
        </div>

        {/* Modal */}
        {showModal && <AddProjectModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default DesignCalculation;
