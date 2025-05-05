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
    doc.text("Plumbing - Head Loss Report", 10, 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Total Water Requirement(RAW):", 10, 40);

    doc.setFontSize(12);
    doc.text(`${data.raw_water_requirement.total_water_requirement}`, 10, 48);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Total Water Requirement(TREATED):", 10, 60);

    doc.setFontSize(12);
    doc.text(`${data.treated_water_requirement.total_water_requirement}`, 10, 68);



    // Save the PDF
    doc.save("Plumbing(HL).pdf");
  };
  return (
    <div className="px-6">
      <div className="py-4">
        <div className="text-lg font-bold border-b border-gray-300 text-gray-800">
          Water Required Info
        </div>
        <div className="flex flex-col gap-4 py-8">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-600 text-sm">
                Total Water Requirement(RAW)
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.raw_water_requirement.total_water_requirement}
            </div>
          </div>
          <div className="flex-col gap">
            <div className="font-semibold text-gray-600 text-sm">
            Total Water Requirement(TREATED)
            </div>
            <div className="border border-gray-300 p-2 rounded bg-gray-100">
              {data.treated_water_requirement.total_water_requirement}
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
