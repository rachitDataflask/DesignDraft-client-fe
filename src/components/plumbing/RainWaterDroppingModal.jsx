import jsPDF from "jspdf";

export default function WaterDemandModal({ data }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFillColor(63, 81, 181);
    doc.rect(0, 10, 210, 20, "F");

    // Heading text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Plumbing - Rainwater Dropping Report", 10, 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Area Per Pipe:", 10, 40);

    doc.setFontSize(12);
    doc.text(`${data.catchment_area_per_pipe_m2}`, 10, 48);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Flow:", 10, 60);

    doc.setFontSize(12);
    doc.text(`${data.discharge_flow_m3_hr}`, 10, 68);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Pipe Diameter:", 10, 80);

    doc.setFontSize(12);
    doc.text(`${data.pipe_diameter_mm}`, 10, 88);

    // Save the PDF
    doc.save("Plumbing(Water Supply Pipes).pdf");
  };
  return (
    <div className="px-6">
      <div className="py-4">
        <div className="text-lg font-bold border-b border-gray-300 p-6 text-gray-800">
          Rainwater Dropping
        </div>
        <div className="flex flex-col gap-4 py-8 px-4">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-600 text-sm">
              Area Per Pipe
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.catchment_area_per_pipe_m2}
            </div>
          </div>
          <div className="flex-col gap">
            <div className="font-semibold text-gray-600 text-sm">Flow</div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.discharge_flow_m3_hr}
            </div>
          </div>
          <div className="flex-col">
            <div className="font-semibold text-gray-600 text-sm">
              Pipe Diameter
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.pipe_diameter_mm}
            </div>
          </div>
        </div>
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
