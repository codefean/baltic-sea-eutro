import React from "react";
import "./controls.css";

const Controls = ({
  selectedLayer,
  setSelectedLayer,
  statusFilters,
  setStatusFilters,
  confFilters,
  setConfFilters
}) => {

  const toggleStatus = (key) => {
    setStatusFilters({ ...statusFilters, [key]: !statusFilters[key] });
  };

  const toggleConf = (key) => {
    setConfFilters({ ...confFilters, [key]: !confFilters[key] });
  };

  return (
    <div className="controls-panel">
      <h3>Map Controls</h3>

      {/* LAYER SWITCHER */}
      <div className="control-block">
        <h4>Layer</h4>
        <select
          value={selectedLayer}
          onChange={(e) => setSelectedLayer(e.target.value)}
        >
          <option value="ER">Overall ER</option>
          <option value="C1_ER">C1 ER (Nutrients)</option>
          <option value="C2_ER">C2 ER (Water Clarity)</option>
          <option value="C3_ER_">C3 ER (Direct Effects)</option>
        </select>
      </div>

      {/* STATUS FILTER */}
      <div className="control-block">
        <h4>Status</h4>
        {Object.keys(statusFilters).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={statusFilters[key]}
              onChange={() => toggleStatus(key)}
            />
            {key}
          </label>
        ))}
      </div>

      {/* CONFIDENCE FILTER */}
      <div className="control-block">
        <h4>Confidence</h4>
        {Object.keys(confFilters).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={confFilters[key]}
              onChange={() => toggleConf(key)}
            />
            {key}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Controls;
