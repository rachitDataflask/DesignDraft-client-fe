import jsPDF from "jspdf";

export default function FirePumpPageModal({ data }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFillColor(63, 81, 181);
    doc.rect(0, 10, 210, 20, "F");

    // Heading text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Fire Fight - Fire Pump Sizing Report", 10, 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("LPM:", 10, 40);

    doc.setFontSize(12);
    doc.text(`${data[0].flowrate_lpm}`, 10, 48);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("HP:", 10, 60);

    doc.setFontSize(12);
    doc.text(`${data[0].pump_capacity_hp}`, 10, 68);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("KW:", 10, 80);

    doc.setFontSize(12);
    doc.text(`${data[0].pump_capacity_kw}`, 10, 88);

    // Save the PDF
    doc.save("FireFight(FirePumpSizing).pdf");
  };
  return (
    <div className="px-6">
      <div className="py-4">
        <div className="text-lg font-bold border-b border-gray-300 p-6 text-gray-800">
          Pump Capacity
        </div>
        <div className="flex flex-col gap-4 py-8 px-4">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-600 text-sm">LPM</div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data[0].flowrate_lpm}
            </div>
          </div>
          <div className="flex-col gap">
            <div className="font-semibold text-gray-600 text-sm">HP</div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data[0].pump_capacity_hp}
            </div>
          </div>
          <div className="flex-col">
            <div className="font-semibold text-gray-600 text-sm">KW</div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data[0].pump_capacity_kw}
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
