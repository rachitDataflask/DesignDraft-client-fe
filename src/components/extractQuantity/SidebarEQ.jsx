import React, { useState, useEffect } from 'react';

import { ReloadIcon } from '../../icons/ReloadIcon';
import EyeIcon from '../../icons/EyeIcon';
import EyeCloseIcon from '../../icons/EyeCloseIcon';
import SearchIcon from '../../icons/SearchIcon';

// Service → bases mapping
const serviceLayers = {
  HVAC: [
    'CEILING SUSPENDED UNIT',
    'SPLIT UNIT',
    'CASSETTE UNIT',
    'OUTDOOR',
  ],
  ELECTRICAL: [
    'DISTRIBUTION BOARDS',
    'LED BATTEN',
    'LED BULKHEAD',
  ],
  'FIRE FIGHTING': [
    'HYDRANT MAIN FIRE PUMP',
    'JOCKEY PUMP',
    'PORTABLE FIRE EXTINGUISHERS',
  ],
  PLUMBING: [
    'BUTTERFLY VALVE',
    'NON RETURN VALVE',
  ],
};

// “All” flattens every base once
const allBases = Array.from(
  new Set(Object.values(serviceLayers).flat())
);

export default function SidebarEQ({
  entities = [],            // [{ layer: string, … }]
  onLayerSelect,
  selectedBase = [],        // e.g. ['CEILING SUSPENDED UNIT']
  selectedService,          // e.g. "All" or "ELECTRICAL"
  onServiceChange,          // setter from parent
}) {
  const [activeTab, setActiveTab] = useState('property');
  const [search, setSearch] = useState('');
  const [remark, setRemark] = useState('');
  const [description, setDescription] = useState(
    'The base slab is designed with a thickness of 30 inches, reinforced using #5 rebar at 10-inch spacing...'
  );
  const [rawLayers, setRawLayers] = useState([]);
  const [layers, setLayers] = useState([]);
  const [visibility, setVisibility] = useState({});

  // Build layer list based on selectedService
  useEffect(() => {
    const allNames = entities.map(e => e.layer);
    setRawLayers(allNames);

    const found = new Set();
    const basesForService =
      selectedService === 'All'
        ? allBases
        : serviceLayers[selectedService] || [];

    allNames.forEach(full => {
      const up = full.toUpperCase();
      basesForService.forEach(base => {
        if (up.startsWith(base)) found.add(base);
      });
    });

    const list = Array.from(found);
    setLayers(list.map(name => ({ name, color: '#FFA500' })));

    // reset visibility
    const vis = {};
    list.forEach(n => (vis[n] = true));
    setVisibility(vis);
  }, [entities, selectedService]);

  const toggleVisibility = name =>
    setVisibility(v => ({ ...v, [name]: !v[name] }));

  const handleClickLayer = baseName => {
    if (!onLayerSelect) return;
    const counts = rawLayers.reduce((acc, full) => {
      if (full.toUpperCase().startsWith(baseName)) {
        acc[full] = (acc[full] || 0) + 1;
      }
      return acc;
    }, {});
    const detailRows = Object.entries(counts).map(([fullName, qty]) => ({
      fullName,
      qty,
    }));
    onLayerSelect(baseName, detailRows);
  };

  const filtered = layers.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[320px] h-screen fixed left-0 bg-white shadow-md border border-[#E5E7EB] flex flex-col rounded-[12px]">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[16px] font-semibold">Extract Quantities</p>
            <p className="text-[12px] text-[#6B7280]">Updated: Just now</p>
          </div>
          <button
            className="w-[24px] h-[24px] bg-[#0083EE] text-white hover:bg-sky-600 rounded-md flex items-center justify-center transition"
            onClick={() => console.log('Reload clicked')}
          >
            <ReloadIcon className="w-[16px] h-[16px] stroke-white" />
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 space-y-4 pb-4 bg-white">
          {/* Service Type Dropdown */}
          <div>
            <p className="text-[12px] font-medium text-[#6B7280] mb-1">
              Service Type:
            </p>
            <select
              className="text-[14px] px-3 py-2 border border-[#D1D5DB] rounded-[8px] w-full"
              value={selectedService}
              onChange={e => onServiceChange(e.target.value)}
            >
              <option value="All">All</option>
              {Object.keys(serviceLayers).map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Layers List */}
          <div>
            <p className="text-[14px] font-medium mb-2">Layers</p>
            <div className="flex items-center px-3 py-1.5 mb-2 border border-[#D1D5DB] rounded-[6px] bg-white">
              <SearchIcon className="w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 ml-2 text-[13px] placeholder-[#6B7280] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              {filtered.map(layer => (
                <div
                  key={layer.name}
                  className={`flex items-center justify-between px-2 py-2 rounded-[6px] cursor-pointer ${
                    selectedBase.includes(layer.name)
                      ? 'bg-[#E8EDF9]'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleClickLayer(layer.name)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBase.includes(layer.name)}
                      readOnly
                      className="accent-[#007AFF]"
                    />
                    <span className="text-[13px]">{layer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {visibility[layer.name] ? (
                      <EyeIcon
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => toggleVisibility(layer.name)}
                      />
                    ) : (
                      <EyeCloseIcon
                        className="w-4 h-4 text-gray-400 cursor-pointer"
                        onClick={() => toggleVisibility(layer.name)}
                      />
                    )}
                    <div
                      className="w-[10px] h-[10px] rounded-sm"
                      style={{ backgroundColor: layer.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="shrink-0 border-t border-[#E5E7EB] bg-white flex flex-col h-[360px]">
        <div className="flex h-[40px]">
          <button
            className={`flex-1 text-[14px] font-medium ${
              activeTab === 'property'
                ? 'bg-[#007AFF] text-white'
                : 'bg-white text-[#6B7280]'
            }`}
            onClick={() => setActiveTab('property')}
          >
            Property Details
          </button>
          <button
            className={`flex-1 text-[14px] font-medium ${
              activeTab === 'other'
                ? 'bg-[#007AFF] text-white'
                : 'bg-white text-[#6B7280]'
            }`}
            onClick={() => setActiveTab('other')}
          >
            Other Details
          </button>
        </div>

        <div className="px-4 pt-4 pb-3 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'property' ? (
            <>
              {/* Editable Description */}
              <div className="border border-[#D1D5DB] rounded-[8px] flex flex-col h-[120px] overflow-hidden">
                <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] text-[13px] font-medium">
                  Description
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="px-3 py-2 text-[13px] text-[#374151] placeholder-[#6B7280] focus:outline-none resize-none flex-1"
                />
              </div>
            </>
          ) : (
            <div className="border border-[#D1D5DB] rounded-[8px] flex flex-col h-full overflow-hidden">
              <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] text-[13px] font-medium">
                Add Remark
              </div>
              <textarea
                rows={4}
                placeholder="Enter remark here..."
                value={remark}
                onChange={e => setRemark(e.target.value)}
                className="m-3 text-[13px] text-[#374151] placeholder-[#6B7280] focus:outline-none resize-none flex-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
