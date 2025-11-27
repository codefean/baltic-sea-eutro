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
{String.raw`                   R1: Hypoxia Persistence (Reinforcing)
      ┌─────────────────────────────────────────────────────────────────────┐
      │                                                                     │
Nutrient Loading     (+)→      Primary Production     (+)→     Organic Matter Deposition 
      ↑(+)                                                                  │ 
      │                                                                     ↓(+)
Sediment Nutrient Release  ←(-) Hypoxia / Anoxia  ←(–) Bottom O₂  ←(-) Microbial Respiration
      │                                                                     │
      └─────────────────────────────────────────────────────────────────────┘
`}
</pre>

<h3>Causal Loop Connections</h3>
<ul>
  <li><strong>Nutrient Loading (+)→ Primary Production:</strong> Agricultural runoff, wastewater, and atmospheric deposition bring nitrogen and phosphorus. These nutrients stimulate phytoplankton growth, causing algal blooms.</li>
  <li><strong>Primary Production (+)→ Organic Matter Deposition:</strong> After blooms use up the available nutrients, the phytoplankton die and sink to the sea floor. High productivity means larger blooms and therefore more dead biomass settling to the sediments.</li>
  <li><strong>Organic Matter Deposition (+)→ Microbial Respiration:</strong> Microbes in the sediments break down the sinking organic material. The more organic matter there is, the more intense this decomposition becomes.</li>
  <li><strong>Microbial Respiration (–)→ Bottom Oxygen:</strong> Microbial breakdown of organic material consumes oxygen. As respiration intensifies, oxygen levels in deep layers fall, especially in areas with limited water exchange.</li>
  <li><strong>Bottom Oxygen (–)→ Hypoxia / Anoxia:</strong> As bottom oxygen declines, hypoxic or anoxic conditions expand, further impairing benthic ecosystems.</li>
  <li><strong>Hypoxia / Anoxia (–)→ Sediment Nutrient Release:</strong> Under low oxygen, phosphorus normally bound to iron minerals is released back into the water column. This internal loading sustains eutrophication even when external inputs decrease.</li>
  <li><strong>Sediment Nutrient Release (–)→ Nutrient Loading:</strong> The phosphorus released from sediments re-enters the water column, adding to nutrient availability. This sediment-derived source reinforces high primary productivity and closes the loop.</li>
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
              This strengthens stratification further, forming a classic positive feedback loop.
            </p>

<pre className="cld-ascii">
{String.raw`
             R2: Stratification & Oxygen Isolation (Reinforcing)
        ┌───────────────────────────────────────────────────────────┐
        │                                                           │                                                          
Stratification Strength  (–)→  Vertical Mixing / O₂ Supply  (+)→ Bottom O₂ 
        ↑(+)                                                        ↓(–)
Organic Matter / Density Gradients           ←(+)           Hypoxia / Anoxia
        │                                                           │
        └───────────────────────────────────────────────────────────┘
`}
</pre>

<h3>Causal Loop Connections</h3>
<ul>
  <li><strong>Stratification Strength (–)→ Vertical Mixing / O2 Supply:</strong> When density layering becomes stronger due to warming, freshwater inputs, or calm conditions, the water column becomes more resistant to turbulence. Strong stratification limits the ability of surface water to mix downward, reducing vertical exchange and the supply of oxygen to deeper layers.</li>
  <li><strong>Vertical Mixing / O2 Supply (+)→ Bottom O2:</strong> Vertical mixing replenishes oxygen in bottom waters by transporting oxygen rich surface water downward. When mixing is reduced, oxygen resupply slows, causing bottom waters to become increasingly isolated and oxygen poor.</li>
  <li><strong>Bottom O2 (–)→ Hypoxia / Anoxia:</strong> As bottom oxygen declines, low oxygen hypoxic or zero oxygen anoxic conditions expand. Reduced oxygen availability affects both microbial processes and benthic organisms, leading to chemical conditions that promote further deoxygenation.</li>
  <li><strong>Hypoxia / Anoxia (+)→ Organic Matter / Density Gradients:</strong> Intensifying hypoxia alters sediment water interface chemistry, leading to the accumulation of reduced compounds such as ammonium and hydrogen sulfide and organic matter in bottom waters. Loss of benthic fauna reduces bioturbation, allowing organic material to build up. These chemical and physical changes increase density contrasts between layers and strengthen bottom water density.</li>
  <li><strong>Organic Matter / Density Gradients (+)→ Stratification Strength:</strong> As density gradients sharpen, the pycnocline becomes more stable and harder to erode. The increased density contrast between surface and bottom layers reinforces stratification, further restricting mixing and completing the positive feedback loop.</li>
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
        ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 Hypoxia / Anoxia           (–) →            Benthic Fauna & Bioturbation        (–) →          Sediment Nutrient Release
        ↑(+)                                                                                               │
        │                                                                                                  ↓(+)
 Bottom O₂  ←(–) Microbial Respiration ← Primary Production  ←(+) Organic Matter Deposition ←(+) Microbial Pathway Dominance
        └──────────────────────────────────────────────────────────────────────────────────────────────────┘


`}
</pre>

<h3>Causal Loop Connections</h3>
<ul>
  <li><strong>Hypoxia / Anoxia (–)→ Benthic Fauna & Bioturbation:</strong> As dissolved oxygen declines, benthic invertebrates become stressed, abandon burrows, or die. Their loss eliminates sediment mixing, burrow ventilation, and nitrification–denitrification processes that normally keep sediments oxidized.</li>
  <li><strong>Benthic Fauna & Bioturbation (–)→ Sediment Nutrient Release:</strong> Without bioturbating animals to oxygenate surface sediments, the seafloor becomes chemically reduced. This promotes the release of ammonium, phosphate, and reduced compounds such as hydrogen sulfide into the overlying water.</li>
  <li><strong>Sediment Nutrient Release (+)→ Microbial Pathway Dominance:</strong> Increased nutrient and reduced compound flux from sediments stimulates microbial activity. With benthic fauna gone, microbes take over most organic matter processing, concentrating energy flow in microbial pathways.</li>
  <li><strong>Microbial Pathway Dominance (+)→ Organic Matter Deposition:</strong> As microbial communities dominate and benthic fauna no longer rework sediment, organic matter accumulates at the sediment surface. Reduced pellet production and sediment mixing allow more organic material to settle and remain available for microbial degradation.</li>
  <li><strong>Organic Matter Deposition (+)→ Primary Production:</strong> High organic matter deposition reflects high primary production in surface waters. Large phytoplankton blooms create substantial biomass that sinks to the seafloor, supplying fuel for microbial respiration.</li>
  <li><strong>Primary Production (+)→ Microbial Respiration:</strong> Greater primary production generates more organic material for microbial decomposition. As microbes process this biomass, oxygen consumption increases in bottom waters and sediments.</li>
  <li><strong>Microbial Respiration (– on Bottom O₂)→ Bottom O₂:</strong> Microbial oxidation of organic matter consumes oxygen. In stratified or poorly ventilated systems, this demand reduces bottom water oxygen concentrations.</li>
  <li><strong>Bottom O₂ (–)→ Hypoxia / Anoxia:</strong> As bottom oxygen continues to fall, low oxygen hypoxic or zero oxygen anoxic conditions intensify. This deepens oxygen depletion and reinforces the initial development of hypoxia, closing the loop.</li>
</ul>

          </div>
        )}

        {/* ---------------- B1 ---------------- */}
        {activeTab === "B1" && (
          <div>
            <h2>B1 — Storm Mixing Balancing Loop</h2>

            <p>
              Storm events can temporarily reverse hypoxia by breaking stratification and re-oxygenating
              bottom waters. The paper describes how hurricanes significantly reduced or eliminated
              hypoxia in the Gulf of Mexico by disrupting stratification (p. 4).
            </p>

            <p>
              Unlike the reinforcing loops, this is a **balancing feedback** that pushes the system toward
              normoxia, but only intermittently.
            </p>

<pre className="cld-ascii">
{String.raw`
                     B1: Storm Mixing Balancing Loop
 Storm Mixing / Winds (+) → Vertical Mixing (+) → Bottom O₂ (+) → Hypoxia / Anoxia (–)
`}
</pre>

<h3>Causal Loop Connections</h3>
<ul>
  <li><strong>Storm Mixing / Winds (+)→ Vertical Mixing:</strong> Strong winds and storms generate waves and turbulence that break down density layering in the water column. This added energy increases vertical mixing between surface and deeper waters.</li>
  <li><strong>Vertical Mixing (+)→ Bottom O₂:</strong> Enhanced vertical mixing transports oxygen rich surface water downward and brings oxygen poor bottom water upward. This exchange replenishes oxygen in deep layers and improves bottom water oxygen conditions.</li>
  <li><strong>Bottom O₂ (–)→ Hypoxia / Anoxia:</strong> As bottom oxygen concentrations rise, low oxygen hypoxic and zero oxygen anoxic zones shrink or disappear. Increased bottom oxygen therefore reduces the extent and severity of hypoxia and anoxia, acting as a balancing influence on the system.</li>
</ul>
          </div>
        )}

      </section>
    </div>
  );
}
