// RightModal.jsx
import React from "react";

const RightModal = ({ isOpen, onClose, room }) => {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed top-20 right-4 h-[600px] w-[300px] bg-white shadow-sm border-l border-gray-300 z-50 p-6 rounded-[12px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Room Info</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
      <div className="text-sm text-gray-700">
        <p>
          <span className="font-medium">Name:</span>{" "}
          {room.name || "Unnamed Room"}
        </p>
        <p>
          <span className="font-medium">Area:</span> {room.area}
        </p>
      </div>
    </div>
  );
};

export default RightModal;
