import React from "react";
import "./legend.css";

const Legend = ({ layerStyle }) => {
  return (
    <div className="legend-container">
      <h4>{layerStyle.label}</h4>

      <div className="legend-scale">
        <ul className="legend-labels">
          {layerStyle.stops.map(([value, color], i) => (
            <li key={i}>
              <span style={{ background: color }}></span>
              {value}+
            </li>
          ))}
        </ul>
      </div>

      {layerStyle.description && (
        <div className="legend-description">
          {layerStyle.description}
        </div>
      )}
    </div>
  );
};

export default Legend;
