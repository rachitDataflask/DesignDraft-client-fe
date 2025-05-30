// import React, { useState, useEffect } from "react";

// const CentralModal = ({ room, onClose }) => {
//   const [roomName, setRoomName] = useState("");

//   // Optional: preload existing name if you're editing
//   useEffect(() => {
//     if (room?.name) {
//       setRoomName(room.name);
//     }
//   }, [room]);

//   const handleSubmit = () => {
//     // You can modify this to pass data back to RoomEditor if needed
//     console.log("Room name submitted:", roomName);
//     onClose(); // Close modal after submission
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-[650px] p-6 rounded-2xl shadow-lg">
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-xl font-medium text-gray-800">Room Details</h2>
//           <button onClick={onClose} className="text-gray-500 text-2xl">
//             &times;
//           </button>
//         </div>

//         <div className="text-gray-700 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Room Name</label>
//             <input
//               type="text"
//               value={roomName}
//               onChange={(e) => setRoomName(e.target.value)}
//               placeholder="Enter room name"
//               className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <p>
//             <strong>Area:</strong> {room?.area.toFixed(2)}
//           </p>
//           <p>
//             <strong>Width:</strong> {room?.width} <strong>Height:</strong>{" "}
//             {room?.height}
//           </p>

//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSubmit}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CentralModal;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRoomName } from "../../redux/features/app/roomSlice"; // adjust path as needed

const CentralModal = ({ room, onClose }) => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (room?.name) {
      setRoomName(room.name);
    }
  }, [room]);

  const handleSubmit = () => {
    dispatch(updateRoomName({ id: room.id, name: roomName }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] p-6 rounded-2xl shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">Room Details</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>

        <div className="text-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <p>
            <strong>Area:</strong> {room?.area.toFixed(2)}
          </p>
          <p>
            <strong>Width:</strong> {room?.width} <strong>Height:</strong>{" "}
            {room?.height}
          </p>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralModal;
