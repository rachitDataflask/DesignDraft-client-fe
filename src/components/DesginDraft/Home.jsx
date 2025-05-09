import DraftSideBar from "./DraftSideBar";

function Home() {
  return (
    <div style={{ display: "flex" }}>
      <DraftSideBar />
      <div style={{ padding: "100px", marginLeft: "250px", flex: 1 }}>
        <h2>Home Page</h2>
      </div>
    </div>
  );
}

export default Home;
