import React from "react";
import { useParams } from "react-router-dom";
import { Stage, Layer, Rect } from "react-konva";
import { useSelector } from "react-redux";
import { useGetProjectListByIdQuery } from "../../redux/features/api/api";
import EntityRender from "../../drawing/EntityRenderer";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

const FloorPreview = () => {
  const rooms = useSelector((state) => state.rooms);
  const floor = useSelector((state) => state.floorPlan.rect);
  const { projectId } = useParams();
  const { data, isLoading, isError } = useGetProjectListByIdQuery(projectId);

  const entities = data?.dxf_entities || [];
  const blocks = data?.dxf_blocks || {};
  const layers = data?.dxf_layers || {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading project.</div>;

  return (
    <div className="w-full h-full bg-white">
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          {entities.length > 0 ? (
            <EntityRender entities={entities} blocks={blocks} layers={layers} />
          ) : (
            floor && (
              <Rect
                x={floor.x}
                y={floor.y}
                width={floor.width}
                height={floor.height}
                fill="rgba(200, 200, 200, 0.5)"
                stroke="black"
                strokeWidth={2}
              />
            )
          )}

          {/* Rooms */}
          {rooms.map((room) => (
            <Rect
              key={room.id}
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              fill="rgba(100, 200, 100, 0.5)"
              stroke="black"
              strokeWidth={1}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default FloorPreview;
