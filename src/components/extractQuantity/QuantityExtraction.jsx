import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBarEQ from "./TopBarEQ";

import { useGetQEListByIdQuery } from "../../redux/features/api/api";
import SidebarEQ from "./SidebarEQ";

// Service → bases mapping
const serviceLayers = {
  HVAC: [
    "CEILING SUSPENDED UNIT",
    "SPLIT UNIT",
    "CASSETTE UNIT",
    "OUTDOOR",
  ],
  ELECTRICAL: [
    "DISTRIBUTION BOARDS",
    "LED BATTEN",
    "LED BULKHEAD",
  ],
  "FIRE FIGHTING": [
    "HYDRANT MAIN FIRE PUMP",
    "JOCKEY PUMP",
    "PORTABLE FIRE EXTINGUISHERS",
  ],
  PLUMBING: [
    "BUTTERFLY VALVE",
    "NON RETURN VALVE",
  ],
};
// Build list of options: “All” + each service
const serviceKeys = ["All", ...Object.keys(serviceLayers)];
// Flatten for “All”
const allBases = Array.from(
  new Set(Object.values(serviceLayers).flat())
);

// Color map for table headers
const colorMap = {
  "CEILING SUSPENDED UNIT": "bg-[#FCE7CE]",
  "SPLIT UNIT":            "bg-[#D9EDF8]",
  "CASSETTE UNIT":        "bg-[#D9EDF8]",
  "OUTDOOR":          "bg-[#F4DAEB]",
  "DISTRIBUTION BOARDS":   "bg-[#E5E7EB]",
  "LED BATTEN":            "bg-[#EDEDED]",
  "LED BULKHEAD":          "bg-[#EDEDED]",
  "HYDRANT MAIN FIRE PUMP":"bg-[#F4DAEB]",
  "JOCKEY PUMP":           "bg-[#F4DAEB]",
  "PORTABLE FIRE EXTINGUISHERS":"bg-[#F4DAEB]",
  "BUTTERFLY VALVE":       "bg-[#F4DAEB]",
  "NON RETURN VALVE":      "bg-[#F4DAEB]",
};
const extraColor = "bg-[#EDEDED]";

export default function QuantityExtraction() {
  const { projectId } = useParams();
  const { data: apiData, isLoading, error } = useGetQEListByIdQuery(projectId);
  const raw = apiData?.dxf_entities ?? [];

  // 1) undefined initially  
  // 2) when API returns, set to apiData.service (upper-cased) if valid  
  // 3) otherwise fallback to first real service key
  const [selectedService, setSelectedService] = useState();
  useEffect(() => {
    if (apiData?.service) {
      const svc = apiData.service.toUpperCase();
      if (serviceKeys.includes(svc)) setSelectedService(svc);
    }
  }, [apiData]);

  // never undefined in use:
  const serviceToUse = selectedService ?? serviceKeys[1];

  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState({});

  // rebuild table sections on raw or serviceToUse change
  useEffect(() => {
    if (!raw.length) return;

    const basesForService =
      serviceToUse === "All"
        ? allBases
        : serviceLayers[serviceToUse] || [];

    const secs = basesForService.flatMap(baseName => {
      const matches = raw
        .map(e => e.layer)
        .filter(name => name.toUpperCase().startsWith(baseName));
      if (!matches.length) return [];

      const counts = matches.reduce((acc, full) => {
        acc[full] = (acc[full] || 0) + 1;
        return acc;
      }, {});

      const items = Object.entries(counts).map(([fullName, qty]) => [
        fullName, qty, "nos", "", "", "", ""
      ]);

      return [{
        title: baseName,
        color: colorMap[baseName] || extraColor,
        items,
      }];
    });

    setSections(secs);
    const sel = {};
    secs.forEach(s => (sel[s.title] = true));
    setSelected(sel);
  }, [raw, serviceToUse]);

  const handleLayerSelect = (baseName, detailRows) => {
    setSelected(prev => {
      const on = prev[baseName];
      const nxt = { ...prev, [baseName]: !on };

      setSections(curr => {
        if (on) return curr.filter(s => s.title !== baseName);
        return [
          ...curr,
          {
            title: baseName,
            color: colorMap[baseName] || extraColor,
            items: detailRows.map(({ fullName, qty }) => [
              fullName, qty, "nos", "", "", "", ""
            ]),
          },
        ];
      });

      return nxt;
    });
  };

  const handleCellClick = (si, ii, ci) =>
    console.log(`Clicked section ${si}, item ${ii}, cell ${ci}`);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBarEQ />
      </div>

      <div className="flex flex-grow pt-[60px] overflow-hidden">
        {/* Sidebar */}
        <div className="w-[320px] h-full overflow-y-auto border-r bg-white">
          <SidebarEQ
            entities={raw}
            onLayerSelect={handleLayerSelect}
            selectedBase={Object.keys(selected).filter(k => selected[k])}
            selectedService={serviceToUse}
            onServiceChange={setSelectedService}
          />
        </div>

        {/* Table */}
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="flex-grow overflow-auto p-6">
            <div className="w-full bg-white shadow flex flex-col min-h-full pb-20">
              <div className="overflow-y-auto flex-grow">
                {isLoading ? (
                  <div className="p-4 text-gray-600">Loading...</div>
                ) : error ? (
                  <div className="p-4 text-red-600">Error loading data</div>
                ) : (
                  <table className="w-full text-left border-separate border-spacing-0 text-sm">
                    <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                      <tr>
                        <th className="p-3 border border-gray-300">Item</th>
                        <th className="p-3 border border-gray-300">Quantity</th>
                        <th className="p-3 border border-gray-300">Unit</th>
                        <th className="p-3 border border-gray-300">Description</th>
                        <th className="p-3 border border-gray-300">Brand</th>
                        <th className="p-3 border border-gray-300">Rates</th>
                        <th className="p-3 border border-gray-300">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections.map((sec, i) => (
                        <React.Fragment key={i}>
                          <tr>
                            <td
                              colSpan="7"
                              className={`px-3 py-2 font-semibold text-sm ${sec.color} text-gray-800`}
                            >
                              {sec.title}
                            </td>
                          </tr>
                          {sec.items.map((item, j) => (
                            <tr
                              key={j}
                              className="hover:bg-gray-50"
                              onClick={() => handleCellClick(i, j, null)}
                            >
                              {item.map((cell, k) => (
                                <td
                                  key={k}
                                  className="p-3 border border-gray-300 text-xs text-gray-800"
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleCellClick(i, j, k);
                                  }}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 right-0 left-[320px] bg-white border-t border-gray-300 text-base font-semibold text-black px-6 py-4 flex justify-end shadow z-50">
            Total Amount &nbsp;&nbsp;&nbsp; ₹0
          </div>
        </div>
      </div>
    </div>
  );
}
