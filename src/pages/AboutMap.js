import React, { useState } from "react";
import "./AboutMap.css";

const NODES = [
  {
    id: "humanNutrients",
    title: "Human nutrient sources",
    summary: "Fertilizers, sewage, fossil-fuel N → nutrient runoff.",
    details:
      "Industrial fertilizers, manure, sewage inputs, and atmospheric N deposition increase nitrogen and phosphorus inputs to coasts.",
  },
  {
    id: "nutrients",
    title: "↑ Nutrient loading",
    summary: "More N & P delivered to coasts",
    details:
      "Nutrient enrichment accelerates eutrophication and fuels phytoplankton blooms.",
  },
  {
    id: "primaryProduction",
    title: "↑ Primary production",
    summary: "Phytoplankton blooms (“greening”)",
    details:
      "Large algal blooms form in response to nutrient enrichment.",
  },
  {
    id: "organicMatter",
    title: "↑ Organic matter deposition",
    summary: "Dead algae sink to seabed",
    details:
      "Sinking particulate organic matter accumulates and fuels microbial respiration.",
  },
  {
    id: "microbialRespiration",
    title: "↑ Microbial respiration",
    summary: "Microbes consume oxygen",
    details:
      "Decomposition of organic matter consumes dissolved oxygen from bottom water.",
  },
  {
    id: "hypoxia",
    title: "Hypoxia / anoxia",
    summary: "Low-O₂ stress or mortality",
    details:
      "Hypoxia (<2 ml O₂/L) stresses benthos; severe hypoxia (<0.5 ml O₂/L) causes mass mortality.",
  },
];

const AboutMap = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState("hypoxia");

  const selectedNode = NODES.find((n) => n.id === selected);

  return (
    <div
      className={`flood-records-container ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed icon */}
      {!isHovered ? (
        <span className="tooltip-icon">?</span>
      ) : (
        <div className="tooltip-content">
          <h2 className="tooltip-title">Causal Loop Diagram</h2>

          {/* Node list */}
          <div className="cdl-node-list">
            {NODES.map((node) => (
              <button
                key={node.id}
                className={`cdl-node-btn ${
                  selected === node.id ? "active" : ""
                }`}
                onClick={() => setSelected(node.id)}
              >
                <strong>{node.title}</strong>
                <div className="cdl-node-summary">{node.summary}</div>
              </button>
            ))}
          </div>

          {/* Details panel */}
          <div className="cdl-details-panel">
            <h3>{selectedNode.title}</h3>
            <p>{selectedNode.details}</p>

            {selectedNode.id === "hypoxia" && (
              <div className="cdl-threshold-box">
                <strong>Important thresholds:</strong>
                <ul>
                  <li>Hypoxia begins at ≤ 2 ml O₂/L</li>
                  <li>Severe hypoxia at ≤ 0.5 ml O₂/L → mass mortality</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMap;


