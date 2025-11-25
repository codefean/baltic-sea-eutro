import React from "react";
import "./eutroDiagram.css";

const StageBox = ({ title, subtitle, emphasis }) => (
  <div className={`cdl-box ${emphasis ? "cdl-box--emphasis" : ""}`}>
    <div className="cdl-box-title">{title}</div>
    {subtitle && <div className="cdl-box-subtitle">{subtitle}</div>}
  </div>
);

const EutrophicationDiagram = () => {
  return (
    <div className="cdl-container">
      {/* Main vertical chain */}
      <div className="cdl-main-column">
        <StageBox
          title="Human Nutrients"
          subtitle="Fertilizer · Sewage · Fossil Fuels"
        />
        <div className="cdl-arrow">▼</div>

        <StageBox
          title="↑ Nutrient Loading (N, P)"
        />
        <div className="cdl-arrow">▼</div>

        <StageBox
          title="↑ Primary Production"
        />
        <div className="cdl-arrow">▼</div>

        <StageBox
          title="↑ Organic Matter Sedimentation"
        />
        <div className="cdl-arrow">▼</div>

        <StageBox
          title="↑ Microbial Respiration"
        />

        {/* Stratification side input */}
        <div className="cdl-stratification-row">
          <div className="cdl-stratification-box">
            Stratification
            <div className="cdl-stratification-sub">
              ↓ vertical mixing
            </div>
          </div>
          <div className="cdl-stratification-arrow">───▶</div>
        </div>

        <div className="cdl-arrow">▼</div>

        <StageBox
          title="↓ Dissolved Oxygen in Bottom Waters"
        />
        <div className="cdl-arrow">▼</div>

        <StageBox
          title="HYPOXIA / ANOXIA"
          subtitle="Regime shift"
          emphasis
        />
      </div>

      {/* Impacts row */}
      <div className="cdl-impacts-section">
        <div className="cdl-impact-column">
          <div className="cdl-impact-title">Benthic & Sediment Impacts</div>
          <ul>
            <li>Mass mortality of benthos</li>
            <li>Loss of bioturbation</li>
            <li>↑ Nutrient release from sediments</li>
            <li>↑ Microbial loop dominance</li>
          </ul>
        </div>

        <div className="cdl-impact-column">
          <div className="cdl-impact-title">Pelagic & Fish Impacts</div>
          <ul>
            <li>Fish habitat compression</li>
            <li>↓ Trophic transfer efficiency</li>
            <li>Fisheries impacts</li>
          </ul>
        </div>
      </div>

      {/* Feedback bar */}
      <div className="cdl-feedback-row">
        <div className="cdl-feedback-label">
          Reinforcing feedbacks
        </div>
        <div className="cdl-feedback-arrow">
          ◀─────────────────────────────────────────────
        </div>
        <div className="cdl-feedback-note">
          Enhances nutrient recycling & hypoxia persistence
        </div>
      </div>
    </div>
  );
};

export default EutrophicationDiagram;
