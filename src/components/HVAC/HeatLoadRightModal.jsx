import jsPDF from "jspdf";

export default function HeatLoadRightModal({ data }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFillColor(63, 81, 181);
    doc.rect(0, 10, 210, 20, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Room Heat Info Report", 10, 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Room Name: ${data.roomName || "Not specified"}`, 10, 40);

    const section = (label, monsoon, summer, y) => {
      doc.setFontSize(12);
      doc.text(`${label}`, 10, y);
      doc.text(`Monsoon: ${monsoon} Btu/hr`, 20, y + 8);
      doc.text(`Summer: ${summer} Btu/hr`, 100, y + 8);
    };

    section(
      "Room Sensible Heat",
      data.sensible.monsoon,
      data.sensible.summer,
      55
    );
    section("Room Latent Heat", data.latent.monsoon, data.latent.summer, 75);
    section("Room Total Heat", data.total.monsoon, data.total.summer, 95);
    section("Total Heat Gain", data.gain.monsoon, data.gain.summer, 115);

    doc.save("RoomHeatInfo.pdf");
  };

  return (
    <div className="px-6">
      <div className="py-4">
        <div className="text-lg font-bold border-b border-gray-300 text-gray-800">
          Room Heat Info
        </div>
        <div className="py-4 font-semibold text-gray-700">
          Room Name: {data.roomName || "Not specified"}
        </div>

        <div className="grid grid-cols-3 font-semibold bg-gray-100 border border-gray-300 rounded mb-2 text-center">
          <div className="py-2"> </div>
          <div className="py-2 border-l border-r border-gray-300">Monsoon</div>
          <div className="py-2">Summer</div>
        </div>

        {[
          { label: "Room Sensible Heat (Btu/hour)", key: "sensible" },
          { label: "Room Latent Heat (Btu/hour)", key: "latent" },
          { label: "Room Total Heat (Btu/hour)", key: "total" },
          { label: "Total Heat Gain (Btu/hour)", key: "gain" },
        ].map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center mb-2 text-sm"
          >
            <div className="text-gray-600">{item.label}</div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100 text-center">
              {data[item.key].monsoon}
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100 text-center">
              {data[item.key].summer}
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={handleDownload}
        className="flex justify-center items-center bg-blue-500 h-12 rounded-lg cursor-pointer hover:bg-blue-600 transition"
      >
        <div className="text-white font-semibold text-lg">Download Report</div>
      </div>
    </div>
  );
}
