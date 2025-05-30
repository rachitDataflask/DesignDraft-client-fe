// import React, { useState, useRef } from "react";
// import { Stage, Layer, Rect } from "react-konva";
// import { v4 as uuidv4 } from "uuid";
// import CentralModal from "./CentralModal";

// const CANVAS_WIDTH = 1000;
// const CANVAS_HEIGHT = 600;

// const RoomDrawer = () => {
//   const [rooms, setRooms] = useState([]);
//   const [newRoom, setNewRoom] = useState(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   const draggingRoomId = useRef(null);
//   const initialRoomPosition = useRef(null);

//   const isInsideCanvas = (x, y) => {
//     return x >= 0 && x <= CANVAS_WIDTH && y >= 0 && y <= CANVAS_HEIGHT;
//   };

//   const isOverlapping = (a, b) => {
//     return (
//       a.x < b.x + b.width &&
//       a.x + a.width > b.x &&
//       a.y < b.y + b.height &&
//       a.y + a.height > b.y
//     );
//   };

//   const handleMouseDown = (e) => {
//     if (isDrawing) return;
//     const pos = e.target.getStage().getPointerPosition();
//     if (!isInsideCanvas(pos.x, pos.y)) return;
//     setNewRoom({ x: pos.x, y: pos.y, width: 0, height: 0 });
//     setIsDrawing(true);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || !newRoom) return;
//     const pos = e.target.getStage().getPointerPosition();
//     const x = Math.min(Math.max(pos.x, 0), CANVAS_WIDTH);
//     const y = Math.min(Math.max(pos.y, 0), CANVAS_HEIGHT);
//     const width = x - newRoom.x;
//     const height = y - newRoom.y;
//     setNewRoom({ ...newRoom, width, height });
//   };

//   const handleMouseUp = () => {
//     if (!newRoom) return;

//     const width = Math.abs(newRoom.width);
//     const height = Math.abs(newRoom.height);

//     if (width === 0 || height === 0) {
//       setNewRoom(null);
//       setIsDrawing(false);
//       return;
//     }

//     const finalRoom = {
//       id: uuidv4(),
//       x: newRoom.width < 0 ? newRoom.x + newRoom.width : newRoom.x,
//       y: newRoom.height < 0 ? newRoom.y + newRoom.height : newRoom.y,
//       width,
//       height,
//       area: width * height,
//     };

//     const overlaps = rooms.some((room) => isOverlapping(finalRoom, room));
//     if (overlaps) {
//       setNewRoom(null);
//       setIsDrawing(false);
//       return;
//     }

//     console.log(`Room ${finalRoom.id} Area: ${finalRoom.area}`);
//     setRooms([...rooms, finalRoom]);
//     setNewRoom(null);
//     setIsDrawing(false);

//     setSelectedRoom(finalRoom);
//     setIsModalOpen(true);
//   };

//   const handleDragStart = (id, e) => {
//     draggingRoomId.current = id;
//     initialRoomPosition.current = { x: e.target.x(), y: e.target.y() };
//   };

//   const handleDragEnd = (id, e) => {
//     const shape = e.target;
//     const newX = shape.x();
//     const newY = shape.y();

//     const draggedRoom = rooms.find((r) => r.id === id);
//     if (!draggedRoom) return;

//     const updatedRoom = {
//       ...draggedRoom,
//       x: newX,
//       y: newY,
//     };

//     const withinCanvas =
//       updatedRoom.x >= 0 &&
//       updatedRoom.y >= 0 &&
//       updatedRoom.x + updatedRoom.width <= CANVAS_WIDTH &&
//       updatedRoom.y + updatedRoom.height <= CANVAS_HEIGHT;

//     if (!withinCanvas) {
//       shape.position(initialRoomPosition.current);
//       return;
//     }

//     const overlapping = rooms.some(
//       (room) => room.id !== id && isOverlapping(updatedRoom, room)
//     );

//     if (overlapping) {
//       shape.position(initialRoomPosition.current);
//       return;
//     }

//     setRooms(
//       rooms.map((room) =>
//         room.id === id ? { ...room, x: newX, y: newY } : room
//       )
//     );
//   };

//   return (
//     <>
//       <Stage
//         width={CANVAS_WIDTH}
//         height={CANVAS_HEIGHT}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
//       >
//         <Layer>
//           {rooms.map((room) => (
//             <Rect
//               key={room.id}
//               {...room}
//               fill="rgba(100, 200, 100, 0.5)"
//               stroke="black"
//               draggable
//               onDragStart={(e) => handleDragStart(room.id, e)}
//               onDragEnd={(e) => handleDragEnd(room.id, e)}
//             />
//           ))}
//           {newRoom && (
//             <Rect
//               {...newRoom}
//               fill="rgba(100, 200, 100, 0.2)"
//               stroke="black"
//               dash={[4, 4]}
//             />
//           )}
//         </Layer>
//       </Stage>
//       {isModalOpen && (
//         <CentralModal
//           room={selectedRoom}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default RoomDrawer;

import React, { useState, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import CentralModal from "./CentralModal";
import { addRoom } from "../../redux/features/app/roomSlice"; // ✅ adjust path if needed

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

const RoomDrawer = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const dispatch = useDispatch();
  const reduxRooms = useSelector((state) => state.rooms); // ✅ Redux state

  const draggingRoomId = useRef(null);
  const initialRoomPosition = useRef(null);

  const isInsideCanvas = (x, y) => {
    return x >= 0 && x <= CANVAS_WIDTH && y >= 0 && y <= CANVAS_HEIGHT;
  };

  const isOverlapping = (a, b) => {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  };

  const handleMouseDown = (e) => {
    if (isDrawing) return;
    const pos = e.target.getStage().getPointerPosition();
    if (!isInsideCanvas(pos.x, pos.y)) return;
    setNewRoom({ x: pos.x, y: pos.y, width: 0, height: 0 });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !newRoom) return;
    const pos = e.target.getStage().getPointerPosition();
    const x = Math.min(Math.max(pos.x, 0), CANVAS_WIDTH);
    const y = Math.min(Math.max(pos.y, 0), CANVAS_HEIGHT);
    const width = x - newRoom.x;
    const height = y - newRoom.y;
    setNewRoom({ ...newRoom, width, height });
  };

  const handleMouseUp = () => {
    if (!newRoom) return;

    const width = Math.abs(newRoom.width);
    const height = Math.abs(newRoom.height);

    if (width === 0 || height === 0) {
      setNewRoom(null);
      setIsDrawing(false);
      return;
    }

    const finalRoom = {
      id: uuidv4(),
      x: newRoom.width < 0 ? newRoom.x + newRoom.width : newRoom.x,
      y: newRoom.height < 0 ? newRoom.y + newRoom.height : newRoom.y,
      width,
      height,
      area: width * height,
    };

    const overlaps = rooms.some((room) => isOverlapping(finalRoom, room));
    if (overlaps) {
      setNewRoom(null);
      setIsDrawing(false);
      return;
    }

    console.log(`Room ${finalRoom.id} Area: ${finalRoom.area}`);
    setRooms([...rooms, finalRoom]);

    // ✅ Dispatch to Redux
    dispatch(addRoom({ id: finalRoom.id, area: finalRoom.area }));

    setNewRoom(null);
    setIsDrawing(false);

    setSelectedRoom(finalRoom);
    setIsModalOpen(true);
  };

  const handleDragStart = (id, e) => {
    draggingRoomId.current = id;
    initialRoomPosition.current = { x: e.target.x(), y: e.target.y() };
  };

  const handleDragEnd = (id, e) => {
    const shape = e.target;
    const newX = shape.x();
    const newY = shape.y();

    const draggedRoom = rooms.find((r) => r.id === id);
    if (!draggedRoom) return;

    const updatedRoom = {
      ...draggedRoom,
      x: newX,
      y: newY,
    };

    const withinCanvas =
      updatedRoom.x >= 0 &&
      updatedRoom.y >= 0 &&
      updatedRoom.x + updatedRoom.width <= CANVAS_WIDTH &&
      updatedRoom.y + updatedRoom.height <= CANVAS_HEIGHT;

    if (!withinCanvas) {
      shape.position(initialRoomPosition.current);
      return;
    }

    const overlapping = rooms.some(
      (room) => room.id !== id && isOverlapping(updatedRoom, room)
    );

    if (overlapping) {
      shape.position(initialRoomPosition.current);
      return;
    }

    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, x: newX, y: newY } : room
      )
    );
  };

  return (
    <>
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
      >
        <Layer>
          {rooms.map((room) => (
            <Rect
              key={room.id}
              {...room}
              fill="rgba(100, 200, 100, 0.5)"
              stroke="black"
              draggable
              onDragStart={(e) => handleDragStart(room.id, e)}
              onDragEnd={(e) => handleDragEnd(room.id, e)}
            />
          ))}
          {newRoom && (
            <Rect
              {...newRoom}
              fill="rgba(100, 200, 100, 0.2)"
              stroke="black"
              dash={[4, 4]}
            />
          )}
        </Layer>
      </Stage>

      {isModalOpen && selectedRoom && reduxRooms.length > 0 && (
        <CentralModal
          room={reduxRooms.find((r) => r.id === selectedRoom.id)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default RoomDrawer;
