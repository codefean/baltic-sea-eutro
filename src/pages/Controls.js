import React from "react";
import "./controls.css";

const Controls = ({
  selectedLayer,
  setSelectedLayer,
  layerStyle
}) => {


  const isOxygenLayer = selectedLayer === "OXYGEN_DEBT";

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
          <option value="C3_ER_">C3 ER (Indirect Effects)</option>

          {/* NEW LAYER */}
          <option value="OXYGEN_DEBT">Deep Water Oxygen Status</option>
        </select>
      </div>

      {/* Description */}
      {layerStyle.description && (
        <div className="legend-description">
          {layerStyle.description}
        </div>
      )}

      {/* ER-only filters: hidden for oxygen layer */}
      {!isOxygenLayer && (
        <>


        </>
      )}

    </div>
  );
};

export default Controls;
