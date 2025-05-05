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
    doc.text("Plumbing - Drainage Pipes Report", 10, 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Diameter:", 10, 40);

    doc.setFontSize(12);
    doc.text(`${data[0].total_fixture_unit_soil}`, 10, 48);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Specification:", 10, 60);

    doc.setFontSize(12);
    doc.text(`${data[0].total_fixture_unit_waste}`, 10, 68);

    // Save the PDF
    doc.save("Plumbing(Drainage Pipes).pdf");
  };
  return (
    <div className="px-6">
      <div className="py-4">
        <div className="text-lg font-bold border-b border-gray-300 p-6 text-gray-800">
          Drainage Pipe Size
        </div>
        <div className="flex flex-col gap-4 py-8 px-4">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-600 text-sm">Diameter</div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data[0].total_fixture_unit_soil}
            </div>
          </div>
          <div className="flex-col gap">
            <div className="font-semibold text-gray-600 text-sm">
              Specification
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data[0].total_fixture_unit_waste}
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
