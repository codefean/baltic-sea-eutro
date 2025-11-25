import React from "react";
import "./controls.css";

const Controls = ({
  selectedLayer,
  setSelectedLayer,
  statusFilters,
  setStatusFilters,
  confFilters,
  setConfFilters,
  layerStyle
}) => {

  const toggleStatus = (key) => {
    setStatusFilters({ ...statusFilters, [key]: !statusFilters[key] });
  };

  const toggleConf = (key) => {
    setConfFilters({ ...confFilters, [key]: !confFilters[key] });
  };

  return (
    <div className="controls-panel">
      <h3>Map Layers</h3>

      <div className="control-block">
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
            {layerStyle.description && (
        <div className="legend-description">
          {layerStyle.description}
        </div>
      )}
    </div>
  );
};

export default Controls;
