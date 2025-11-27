import React, { useState } from "react";
import "./eutroDiagram.css";

export default function CausalLoopsPage() {
  const [activeTab, setActiveTab] = useState("R1");

  const tabs = [
    { id: "R1", label: "R1: Hypoxia Persistence" },
    { id: "R2", label: "R2: Stratification Loop" },
    { id: "R3", label: "R3: Benthic Collapse" },
    { id: "B1", label: "B1: Storm Mixing" },
  ];

  return (
    <div className="cld-container">
      <header className="cld-header">
        <h1>Spreading Dead Zones | Causal Loop Diagrams</h1>
        <p className="cld-subtitle">
          Based on: Diaz & Rosenberg (2008), <em>Science</em>, “Spreading Dead Zones and Consequences for Marine Ecosystems.”
        </p>
      </header>

      {/* Top Tab Buttons */}
      <nav className="cld-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`cld-tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="cld-content">

        {/* ---------------- R1 ---------------- */}
        {activeTab === "R1" && (
          <div>
            <h2>R1 — Hypoxia Persistence Loop (Reinforcing)</h2>

            <p>
              This loop captures the central eutrophication mechanism described by Diaz & Rosenberg.
              The paper explains that nutrient enrichment from agriculture, sewage, and fossil fuel
              combustion increases coastal primary production (p. 1). When this algal biomass dies,
              it sinks to the seabed and fuels microbial respiration, consuming dissolved oxygen (p. 1–2).
            </p>

            <p>
              As bottom oxygen declines below ~2 ml O₂/L, benthic fauna become stressed or die,
              and sediments shift to reducing conditions that release ammonium and phosphorus back into the water column
              (p. 2). This internal nutrient loading further increases primary production, reinforcing the loop.
            </p>

<pre className="cld-ascii">
{String.raw`
                     R1: Hypoxia Persistence (Reinforcing)
        ┌───────────────────────────────────────────────────────────┐
        │                                                           │
 Nutrient Loading (+) → Primary Production (+) → Organic Matter Deposition (+)
        ↓                                                           ↑
 Sediment Nutrient Release (+) ← Hypoxia / Anoxia (–) ← Bottom O₂ (–) ← Microbial Respiration (+)
        └───────────────────────────────────────────────────────────┘
`}
</pre>

            <h3>Key Evidence From the Paper</h3>
            <ul>
              <li>Dead zones have increased exponentially since the 1960s and now occur in more than 400 coastal systems (p. 1).</li>
              <li>Enhanced primary production increases organic matter flux to sediments, fueling microbial O₂ demand (p. 1–2).</li>
              <li>Hypoxic sediments shift from denitrification to ammonium release, intensifying eutrophication (p. 2).</li>
            </ul>
          </div>
        )}

        {/* ---------------- R2 ---------------- */}
        {activeTab === "R2" && (
          <div>
            <h2>R2 — Stratification & Oxygen Isolation Loop (Reinforcing)</h2>

            <p>
              Many dead zones occur in semi-enclosed or stratified waters where density layering restricts water exchange (p. 1).
              Warming, freshwater inputs, and calm weather strengthen stratification, reducing vertical mixing.
            </p>

            <p>
              With less mixing, oxygen-poor bottom waters cannot be replenished. As hypoxia intensifies,
              density gradients sharpen due to accumulating organic matter and altered salinity profiles (p. 2).
              This strengthens stratification further, forming a classic reinforcing loop.
            </p>

<pre className="cld-ascii">
{String.raw`
                     R2: Stratification & Oxygen Isolation (Reinforcing)
        ┌───────────────────────────────────────────────────────────┐
        ↓                                                           ↑
 Stratification Strength (–) → Vertical Mixing / O₂ Supply (+) → Bottom O₂ (–)
        ↑                                                           ↓
 Organic Matter / Density Gradients (+) ← Hypoxia / Anoxia (+)
        └───────────────────────────────────────────────────────────┘
`}
</pre>

            <h3>Key Evidence From the Paper</h3>
            <ul>
              <li>Hypoxia is strongly linked to stratification that restricts water exchange (p. 1).</li>
              <li>Persistent stratification explains long-lived dead zones like the Baltic Sea (p. 2).</li>
              <li>Climate change is predicted to increase stratification and expand oxygen-depleted zones (p. 4).</li>
            </ul>
          </div>
        )}

        {/* ---------------- R3 ---------------- */}
        {activeTab === "R3" && (
          <div>
            <h2>R3 — Benthic Collapse & Microbial Dominance (Reinforcing)</h2>

            <p>
              When hypoxia develops, benthic organisms abandon burrows, become stressed, and die at
              DO concentrations below ~0.5 ml O₂/L (p. 1).
              This eliminates bioturbation and nitrification–denitrification processes.
            </p>

            <p>
              Without benthic fauna maintaining sediment oxygenation, sediments become reduced,
              producing H₂S and releasing NH₄⁺ and PO₄³⁻ (p. 2).
              Energy flow shifts dramatically toward microbial pathways, as shown in Fig. 2 (p. 3).
            </p>

<pre className="cld-ascii">
{String.raw`
                     R3: Benthic Collapse & Microbial Dominance (Reinforcing)
        ┌────────────────────────────────────────────────────────────────────────┐
        ↓                                                                        ↑
 Hypoxia / Anoxia (–) → Benthic Fauna & Bioturbation (–) → Sediment Nutrient Release (+)
        ↓                                                                        ↑
 Microbial Pathway Dominance (+) ← Organic Matter Deposition (+) ← Primary Production (+)
        ↓                                                                        ↑
 Microbial Respiration (– on Bottom O₂) → Bottom O₂ (–) → Hypoxia / Anoxia (+)
        └────────────────────────────────────────────────────────────────────────┘
`}
</pre>

            <h3>Key Evidence From the Paper</h3>
            <ul>
              <li>Benthic fauna suffer mass mortality under severe hypoxia (p. 1–2).</li>
              <li>Sediment fluxes switch from N removal to NH₄⁺ and PO₄³⁻ release (p. 2).</li>
              <li>Energy flow transitions from benthos → microbes during hypoxia (Fig. 2, p. 3).</li>
              <li>Persistent hypoxia eliminates macrobenthos and causes massive biomass losses (p. 3).</li>
            </ul>
          </div>
        )}

        {/* ---------------- B1 ---------------- */}
        {activeTab === "B1" && (
          <div>
            <h2>B1 — Storm Mixing Balancing Loop</h2>

            <p>
              Storm events can temporarily reverse hypoxia by breaking stratification and reoxygenating
              bottom waters. The paper describes how hurricanes significantly reduced or eliminated
              hypoxia in the Gulf of Mexico by disrupting stratification (p. 4).
            </p>

            <p>
              Unlike the reinforcing loops, this is a **balancing feedback** that pushes the system toward
              normoxia — but only intermittently.
            </p>

<pre className="cld-ascii">
{String.raw`
                     B1: Storm Mixing Balancing Loop
 Storm Mixing / Winds (+) → Vertical Mixing (+) → Bottom O₂ (+) → Hypoxia / Anoxia (–)
`}
</pre>

            <h3>Key Evidence From the Paper</h3>
            <ul>
              <li>Storms disrupt stratification and shrink dead zones (p. 4).</li>
              <li>In 2005, four hurricanes temporarily eliminated hypoxia in the Gulf of Mexico (p. 4).</li>
              <li>Increased storminess under climate change could reduce hypoxia risk (p. 4).</li>
            </ul>
          </div>
        )}

      </section>
    </div>
  );
}
