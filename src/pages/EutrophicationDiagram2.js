import React, { useState } from "react";
import "./eutroDiagram2.css";

export default function CausalLoopsPage() {
  const [activeTab, setActiveTab] = useState(null);

  const tabs = [
    { id: "R1", label: "R1: Hypoxia Persistence" },
    { id: "R2", label: "R2: Stratification Loop" },
    { id: "R3", label: "R3: Benthic Collapse" },
    { id: "B1", label: "B1: Storm Mixing" },
    { id: "CLD", label: "CLD: Full Diagram" },
  ];

  return (
    <div className="cld-container2">
      <section className="cld-content2">

        {activeTab === "R1" && (
          <div>
            <h2>R1 — Hypoxia Persistence Loop (Reinforcing)</h2>

            <p>
              In the Baltic Sea, nutrient enrichment is primarily driven by anthropogenic inputs from agriculture, municipal wastewater, and atmospheric deposition.
              These nutrients can fuel large phytoplankton blooms that further impair water quality. 
            </p>

            <p>
              When blooms decay, algal biomass sinks to the sea floor, where limited water exchange leads to intense microbial respiration and oxygen consumption.
              As benthic oxygen declines, phosphorus bound in sediments is released, in a process called "internal loading." This reinforces eutrophication by sustaining
              high productivity even when external nutrient inputs drop.
            </p>

            <pre className="cld-ascii2">
{String.raw`                   R1: Hypoxia Persistence (Reinforcing)
      ┌─────────────────────────────────────────────────────────────────────┐
      │                                                                     │
Nutrient Loading     (+)→      Primary Production     (+)→     Organic Matter Deposition 
      ↑(+)                                                                  │ 
      │                                                                     ↓(+)
Sediment Nutrient Release  ←(-) Hypoxia / Anoxia  ←(–) Bottom O₂  ←(-) Microbial Respiration
      │                                                                     │
      └─────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        )}

        {activeTab === "R2" && (
          <div>
            <h2>R2 — Stratification & Oxygen Isolation Loop (Reinforcing)</h2>

            <p>
              The Baltic Sea naturally exhibits strong halocline-driven stratification due to limited
              inflows of dense North Sea water and large freshwater inputs from rivers. This layering is
              especially pronounced in deep basins, where the halocline restricts vertical mixing.
            </p>

            <p>
              As hypoxia expands, accumulating organic matter and changes in salinity and temperature
              further sharpen density gradients. This strengthens the halocline and limits ventilation
              of deep waters even more. The result is a self-reinforcing cycle that helps maintain the
              Baltic's large, persistent dead zones.
            </p>

            <pre className="cld-ascii2">
{String.raw`     R2: Stratification & Oxygen Isolation (Reinforcing)
        ┌───────────────────────────────────────────────────────────┐
        │                                                           │                                                          
Stratification Strength  (–)→  Vertical Mixing / O₂ Supply  (+)→ Bottom O₂ 
        ↑(+)                                                        ↓(–)
Organic Matter / Density Gradients           ←(+)           Hypoxia / Anoxia
        │                                                           │
        └───────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        )}

        {activeTab === "R3" && (
          <div>
            <h2>R3 — Benthic Collapse & Microbial Dominance (Reinforcing)</h2>

            <p>
              In the Baltic’s deep basins, recurring hypoxia severely impacts benthic communities. Without stable oxygen, organisms such as amphipods, bivalves, and polychaetes can suffer. 
            </p>

            <p>
              Without these key organisms, sediment oxygenation declines and microbial processes dominate. Reduced sediments release ammonium and phosphate, and in extreme cases produce hydrogen sulfide, contributing to the "Black Sea-like" conditions periodically observed in the Baltic. This microbial shift increases oxygen demand and reinforces recurring hypoxia.
            </p>

            <pre className="cld-ascii2">
{String.raw`                 R3: Benthic Collapse & Microbial Dominance (Reinforcing)
    ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 Hypoxia / Anoxia    (–)→   Benthic Fauna & Bioturbation    (–)→   Sediment Nutrient Release    (+)→   Microbial Pathway Dominance
    ↑(–)                                                                                                           │
    │                                                                                                              ↓(+)
 Bottom O₂    ←(–)       Microbial Respiration       ←(+)        Organic Matter Deposition      ←(+)        Primary Production
    └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
`}
            </pre>
          </div>
        )}

        {activeTab === "B1" && (
          <div>
            <h2>B1 — Storm Mixing Balancing Loop</h2>

            <p>
              In the Baltic Sea, storm systems can trigger major inflow events from the North Sea. These "Major Baltic Inflows" (MBIs) push oxygen-rich saline water into the system, temporarily reducing hypoxia.
            </p>

            <p>
              However, MBIs have become less frequent in recent decades, and when they do occur, their mitigating effects are often short-lived. Thus, While intermittent mixing and inflow provide a balancing loop, they seldom fully counteract the strong reinforcing drivers of hypoxia.
            </p>

            <pre className="cld-ascii2">
{String.raw`                     B1: Storm Mixing Balancing Loop
 Storm Mixing / Inflows (+)→ Vertical Mixing (+)→ Bottom O₂ (-)→ Hypoxia / Anoxia`}
            </pre>
          </div>
        )}

                {/* ---------------- CLD ---------------- */}
{activeTab === "CLD" && (
  <div>
    <h2>Full Causal Loop Diagram</h2>

<img
  src={`${process.env.PUBLIC_URL}/CLD.png`}
  alt="Full Causal Loop Diagram"
/>
  </div>
)}

      </section>

      <nav className="cld-tabs2">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`cld-tab2 ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === t.id ? null : t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
