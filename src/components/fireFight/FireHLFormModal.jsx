import jsPDF from "jspdf";

export default function FireHLFormModal({ data }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFillColor(63, 81, 181);
    doc.rect(0, 10, 210, 20, "F");

    // Heading text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Fire Fight - Head Loss Report", 10, 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Pressure Loss Per Meter Length of Pipe:", 10, 40);

    doc.setFontSize(12);
    doc.text(`${data.pressureLossPerMeterBar}`, 10, 48);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Pressure Loss of Total Length of Pipe:", 10, 60);

    doc.setFontSize(12);
    doc.text(`${data.pressureLossTotalMeter}`, 10, 68);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Total Pressure loss:", 10, 80);

    doc.setFontSize(12);
    doc.text(`${data.pressureLossTotalBar}`, 10, 88);

    // Save the PDF
    doc.save("FireFight(HL).pdf");
  };
  return (
    <div className="px-6">
      <div className="py-4">
        <div className="text-lg font-bold border-b border-gray-300 text-gray-800">
          Pressure Loss Info
        </div>
        <div className="flex flex-col gap-4 py-8">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-600 text-sm">
              Pressure Loss Per Meter Length of Pipe
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.pressureLossPerMeterBar}
            </div>
          </div>
          <div className="flex-col gap">
            <div className="font-semibold text-gray-600 text-sm">
              Pressure Loss of Total Length of Pipe
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.pressureLossTotalMeter}
            </div>
          </div>
          <div className="flex-col">
            <div className="font-semibold text-gray-600 text-sm">
              Total Pressure loss
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.pressureLossTotalBar}
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
