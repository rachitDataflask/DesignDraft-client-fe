import { useParams } from "react-router-dom";
import AreaMarkupSidebar from "./AreaMarkupSideBar";
import EntityRenderer from "../../drawing/EntityRender";
import RoomDrawer from "./RoomDrawer";
import RoomEditor from "./RoomEditor";
import { useGetProjectListByIdQuery } from "../../redux/features/api/api";

const AreaMarkup = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError } = useGetProjectListByIdQuery(projectId);

  const entities = data?.dxf_entities || [];
  const blocks = data?.dxf_blocks || {};
  const layers = data?.dxf_layers || {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading project.</div>;

  const hasEntities = entities.length > 0;

  return (
    <div className="flex">
      <div>
        <AreaMarkupSidebar />
      </div>

      <div style={{ position: "relative", width: 1300, height: 700 }}>
        {hasEntities ? (
          <>
            <EntityRenderer
              entities={entities}
              blocks={blocks}
              layers={layers}
            />
            <RoomDrawer />
          </>
        ) : (
          <RoomEditor />
        )}
      </div>
    </div>
  );
};

export default AreaMarkup;
