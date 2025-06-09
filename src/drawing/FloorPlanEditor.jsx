// // FloorPlanEditor.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Stage, Layer, Rect, Transformer } from "react-konva";
// import { useDispatch } from "react-redux";
// import { setX, setY } from "../redux/features/app/projectSlice";

// const FloorPlanEditor = () => {
//   const [rect, setRect] = useState(null);
//   const [newRect, setNewRect] = useState(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const rectRef = useRef();
//   const transformerRef = useRef();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (rectRef.current && transformerRef.current) {
//       transformerRef.current.nodes([rectRef.current]);
//       transformerRef.current.getLayer().batchDraw();
//     }
//   }, [rect]);

//   const handleMouseDown = (e) => {
//     if (rect) return;

//     const pos = e.target.getStage().getPointerPosition();
//     setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
//     setIsDrawing(true);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || !newRect) return;
//     const pos = e.target.getStage().getPointerPosition();
//     const width = pos.x - newRect.x;
//     const height = pos.y - newRect.y;
//     setNewRect({ ...newRect, width, height });
//   };

//   const handleMouseUp = () => {
//     if (!newRect) return;

//     const width = Math.abs(newRect.width);
//     const height = Math.abs(newRect.height);

//     if (width === 0 || height === 0) {
//       setNewRect(null);
//       setIsDrawing(false);
//       return;
//     }

//     const finalRect = {
//       x: newRect.width < 0 ? newRect.x + newRect.width : newRect.x,
//       y: newRect.height < 0 ? newRect.y + newRect.height : newRect.y,
//       width,
//       height,
//       draggable: true,
//     };

//     setRect(finalRect);
//     setNewRect(null);
//     setIsDrawing(false);
//     dispatch(setX(finalRect.x));
//     dispatch(setY(finalRect.y));
//   };

//   const handleTransform = () => {
//     const node = rectRef.current;
//     const scaleX = node.scaleX();
//     const scaleY = node.scaleY();

//     const updated = {
//       x: node.x(),
//       y: node.y(),
//       width: Math.max(5, node.width() * scaleX),
//       height: Math.max(5, node.height() * scaleY),
//       draggable: true,
//     };

//     node.scaleX(1);
//     node.scaleY(1);

//     console.log(`Updated area: ${updated.width * updated.height}px²`);
//     setRect(updated);
//     dispatch(setX(updated.x));
//     dispatch(setY(updated.y));
//   };

//   return (
//     <>
//       <Stage
//         width={window.innerWidth - 450}
//         height={window.innerHeight - 80}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <Layer>
//           {rect && (
//             <>
//               <Rect
//                 ref={rectRef}
//                 {...rect}
//                 fill="rgba(0, 150, 255, 0.2)"
//                 stroke="black"
//                 strokeWidth={1}
//                 onTransformEnd={handleTransform}
//                 onDragEnd={(e) =>
//                   setRect({ ...rect, x: e.target.x(), y: e.target.y() })
//                 }
//                 dragBoundFunc={(pos) => {
//                   const stageWidth = window.innerWidth - 450;
//                   const stageHeight = window.innerHeight - 80;

//                   const clampedX = Math.max(
//                     0,
//                     Math.min(pos.x, stageWidth - rect.width)
//                   );
//                   const clampedY = Math.max(
//                     0,
//                     Math.min(pos.y, stageHeight - rect.height)
//                   );

//                   return { x: clampedX, y: clampedY };
//                 }}
//               />
//               <Transformer ref={transformerRef} rotateEnabled={false} />
//             </>
//           )}

//           {newRect && (
//             <Rect
//               {...newRect}
//               fill="rgba(0, 150, 255, 0.1)"
//               stroke="black"
//               dash={[5, 5]}
//             />
//           )}
//         </Layer>
//       </Stage>
//     </>
//   );
// };

// export default FloorPlanEditor;

// FloorPlanEditor.jsx

import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { setFloor } from "../redux/features/app/areaMarkupSlice";
import { useNavigate } from "react-router-dom";
import {
  setRect,
  updateRectPosition,
  updateRectTransform,
  resetFloorPlan,
} from "../redux/features/app/FloorPlanSlice";

const FloorPlanEditor = () => {
  const rect = useSelector((state) => state.floorPlan.rect); // Redux state
  const dispatch = useDispatch();

  const [newRect, setNewRect] = useState(null); // Local only
  const [isDrawing, setIsDrawing] = useState(false); // Local only
  const rectRef = useRef();
  const transformerRef = useRef();
  const navigate = useNavigate();

  // Reset floor plan on component mount
  // useEffect(() => {
  //   dispatch(resetFloorPlan());
  // }, []);

  useEffect(() => {
    if (rectRef.current && transformerRef.current) {
      transformerRef.current.nodes([rectRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [rect]);

  const handleMouseDown = (e) => {
    if (rect) return; // Prevent drawing multiple
    const pos = e.target.getStage().getPointerPosition();
    setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !newRect) return;
    const pos = e.target.getStage().getPointerPosition();
    setNewRect({
      ...newRect,
      width: pos.x - newRect.x,
      height: pos.y - newRect.y,
    });
  };

  const handleMouseUp = () => {
    if (!newRect) return;

    const width = Math.abs(newRect.width);
    const height = Math.abs(newRect.height);

    if (width === 0 || height === 0) {
      setNewRect(null);
      setIsDrawing(false);
      return;
    }

    const finalRect = {
      x: newRect.width < 0 ? newRect.x + newRect.width : newRect.x,
      y: newRect.height < 0 ? newRect.y + newRect.height : newRect.y,
      width,
      height,
      draggable: true,
    };

    dispatch(setRect(finalRect)); // Redux
    dispatch(setFloor(finalRect));
    localStorage.setItem("floorPlan", JSON.stringify(finalRect));

    setNewRect(null);
    setIsDrawing(false);
  };

  const handleTransform = () => {
    const node = rectRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const updated = {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      draggable: true,
    };

    node.scaleX(1);
    node.scaleY(1);

    dispatch(updateRectTransform(updated)); // Redux
    console.log(`Updated area: ${updated.width * updated.height}px²`);
  };

  const handleNext = () => {
    localStorage.setItem("floorPlan", JSON.stringify(rect));
    navigate(`/file-setup/${project._id}`);
  };

  return (
    <>
      {/* <div>
        <button onClick={handleNext} disabled={!rect}>
          Next
        </button>
      </div> */}
      <Stage
        width={window.innerWidth - 450}
        height={window.innerHeight - 100}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {rect && (
            <>
              <Rect
                ref={rectRef}
                {...rect}
                fill="rgba(0, 150, 255, 0.2)"
                stroke="black"
                strokeWidth={1}
                onTransformEnd={handleTransform}
                onDragEnd={(e) => {
                  dispatch(
                    updateRectPosition({
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                  );
                }}
                dragBoundFunc={(pos) => {
                  const stageWidth = window.innerWidth - 450;
                  const stageHeight = window.innerHeight - 80;
                  const clampedX = Math.max(
                    0,
                    Math.min(pos.x, stageWidth - rect.width)
                  );
                  const clampedY = Math.max(
                    0,
                    Math.min(pos.y, stageHeight - rect.height)
                  );
                  return { x: clampedX, y: clampedY };
                }}
              />
              <Transformer ref={transformerRef} rotateEnabled={false} />
            </>
          )}

          {newRect && (
            <Rect
              {...newRect}
              fill="rgba(0, 150, 255, 0.1)"
              stroke="black"
              dash={[5, 5]}
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default FloorPlanEditor;
