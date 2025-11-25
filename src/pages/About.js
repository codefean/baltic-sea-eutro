import React, { useState } from "react";

const NODES = [
  {
    id: "humanNutrients",
    title: "Human nutrient sources",
    group: "Drivers",
    summary: "Fertilizers, sewage, and fossil-fuel nitrogen increase nutrient runoff to coasts.",
    details:
      "Industrial fertilizers, manure, sewage inputs, and atmospheric nitrogen from fossil-fuel burning strongly increase nitrogen and phosphorus loads to rivers and estuaries.",
  },
  {
    id: "physicalDrivers",
    title: "Physical & climatic drivers",
    group: "Drivers",
    summary: "Stratified, semi-enclosed basins limit oxygen resupply.",
    details:
      "Semi-enclosed coastal basins, fjords, and estuaries with strong water-column stratification restrict mixing and oxygen resupply to the bottom waters.",
  },
  {
    id: "nutrients",
    title: "Nutrient loading (N, P)",
    group: "Biogeochemistry",
    summary: "Nutrient enrichment fuels algal blooms.",
    details:
      "Excess nitrogen and phosphorus from land increase nutrient concentrations in coastal waters, setting the stage for eutrophication.",
  },
  {
    id: "primaryProduction",
    title: "↑ Primary production",
    group: "Biogeochemistry",
    summary: "Waters greening with phytoplankton.",
    details:
      "Algal and phytoplankton blooms develop in response to nutrient enrichment, a visible sign of eutrophication in many dead-zone systems.",
  },
  {
    id: "organicMatter",
    title: "↑ Organic matter to seabed",
    group: "Biogeochemistry",
    summary: "More detritus sinks to the seafloor.",
    details:
      "When blooms die, particulate organic matter sinks, accumulating at the sediment surface and providing fuel for microbial respiration.",
  },
  {
    id: "microbialRespiration",
    title: "↑ Microbial respiration",
    group: "Biogeochemistry",
    summary: "Microbes decompose organic matter and consume oxygen.",
    details:
      "Microbial communities decompose the accumulated organic material, consuming dissolved oxygen from the overlying bottom water.",
  },
  {
    id: "stratification",
    title: "Stratification & weak mixing",
    group: "Biogeochemistry",
    summary: "Reduces oxygen resupply from surface waters.",
    details:
      "Salinity, temperature, and freshwater inputs create a stratified water column that prevents oxygen-rich surface water from mixing down to depth.",
  },
  {
    id: "hypoxia",
    title: "Hypoxia / anoxia",
    group: "Regime shift",
    summary: "Bottom-water oxygen drops to stressful or lethal levels.",
    details:
      "When oxygen falls below about 2 ml O₂/L, benthic fauna show stress; below ~0.5 ml O₂/L, mass mortality and severe ecosystem change occur.",
  },
  {
    id: "benthicImpacts",
    title: "Benthic community impacts",
    group: "Impacts",
    summary: "Mass mortality and loss of bioturbators.",
    details:
      "Hypoxia causes mortality of benthic invertebrates, especially burrowing and sessile fauna. Bioturbation and bio-irrigation are reduced, simplifying community structure.",
  },
  {
    id: "fishImpacts",
    title: "Fish & invertebrate impacts",
    group: "Impacts",
    summary: "Habitat compression, mortality, and fishery risks.",
    details:
      "Demersal fishes and mobile invertebrates are forced into shallower, oxygenated layers; extreme events cause mass mortality and can disrupt fisheries.",
  },
  {
    id: "ecosystemFunction",
    title: "Ecosystem functioning",
    group: "Impacts",
    summary: "Shift toward microbial pathways, lower secondary production.",
    details:
      "Energy flow is diverted from benthic food webs toward microbial pathways, reducing trophic transfer to higher consumers and lowering ecosystem services.",
  },
  {
    id: "feedbackSediment",
    title: "Feedback: sediment nutrient release",
    group: "Feedbacks",
    summary: "Hypoxia → reducing sediments → more internal nutrients.",
    details:
      "Hypoxia and loss of bioturbation make sediments more reducing, enhancing the release of ammonium and phosphate back into the water column and fueling new blooms.",
  },
  {
    id: "feedbackFoodweb",
    title: "Feedback: food-web simplification",
    group: "Feedbacks",
    summary: "Loss of benthos → more organic matter for microbes.",
    details:
      "As benthic fauna decline, less organic matter is grazed or buried. More detritus is processed by microbes, increasing oxygen demand and reinforcing hypoxia.",
  },
  {
    id: "recovery",
    title: "Recovery & hysteresis",
    group: "Recovery",
    summary: "Nutrient reduction can reverse hypoxia, but slowly.",
    details:
      "Substantial reductions in nutrient inputs can allow oxygen recovery and recolonization, but the trajectory back differs from the decline and full return to the original state is not guaranteed.",
  },
];

const GROUP_ORDER = [
  "Drivers",
  "Biogeochemistry",
  "Regime shift",
  "Impacts",
  "Feedbacks",
  "Recovery",
];

const GROUP_LABELS = {
  Drivers: "Drivers",
  Biogeochemistry: "Biogeochemical pathway",
  "Regime shift": "Regime shift state",
  Impacts: "Ecosystem & fisheries impacts",
  Feedbacks: "Reinforcing feedback loops",
  Recovery: "Recovery & hysteresis",
};

const EDGE_STEPS = [
  "humanNutrients",
  "nutrients",
  "primaryProduction",
  "organicMatter",
  "microbialRespiration",
  "hypoxia",
];

function ArrowLabel({ label }) {
  return (
    <div className="flex items-center text-xs text-slate-500 gap-1">
      <span className="h-px flex-1 bg-slate-300" />
      <span className="uppercase tracking-wide">{label}</span>
      <span className="h-px flex-1 bg-slate-300" />
    </div>
  );
}

function NodeCard({ node, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(node.id)}
      className={`relative w-full rounded-2xl border text-left p-3 md:p-4 transition-transform text-sm md:text-base shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
      ${
        isSelected
          ? "border-sky-500 bg-sky-50"
          : "border-slate-200 bg-white hover:border-sky-300"
      }
    `}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-semibold text-slate-800 text-sm md:text-base">
          {node.title}
        </h3>
        <span
          className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] md:text-[11px] font-medium ${
            node.group === "Drivers"
              ? "bg-emerald-50 text-emerald-700"
              : node.group === "Biogeochemistry"
              ? "bg-sky-50 text-sky-700"
              : node.group === "Regime shift"
              ? "bg-amber-50 text-amber-700"
              : node.group === "Impacts"
              ? "bg-rose-50 text-rose-700"
              : node.group === "Feedbacks"
              ? "bg-purple-50 text-purple-700"
              : "bg-slate-50 text-slate-700"
          }`}
        >
          {node.group}
        </span>
      </div>
      <p className="text-xs md:text-sm text-slate-600 leading-snug">
        {node.summary}
      </p>
      {isSelected && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-semibold text-white shadow-md">
          ●
        </span>
      )}
    </button>
  );
}

function DiagramSection({ group, nodes, selectedId, onSelect }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xs md:text-sm font-semibold tracking-wide text-slate-500 uppercase">
        {GROUP_LABELS[group]}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            isSelected={node.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState("hypoxia");

  const selectedNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  const handleStepThrough = () => {
    const idx = EDGE_STEPS.indexOf(selectedId);
    if (idx === -1 || idx === EDGE_STEPS.length - 1) {
      setSelectedId(EDGE_STEPS[0]);
    } else {
      setSelectedId(EDGE_STEPS[idx + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-slate-900">
              Coastal Dead Zones: Causal Diagram
            </h1>
            <p className="text-xs md:text-sm text-slate-600 max-w-2xl">
              Interactive representation of Diaz & Rosenberg (2008): how nutrient
              enrichment and physical drivers create hypoxic "dead zones" and
              their feedbacks.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleStepThrough}
              className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs md:text-sm font-medium bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Step through causal chain
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-4 md:py-6 grid gap-6 md:gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Left: diagram */}
        <div className="space-y-5 md:space-y-6">
          {GROUP_ORDER.map((group) => {
            const nodes = NODES.filter((n) => n.group === group);
            if (!nodes.length) return null;
            return (
              <DiagramSection
                key={group}
                group={group}
                nodes={nodes}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            );
          })}

          <div className="mt-2">
            <ArrowLabel label="Core causal chain" />
            <p className="mt-2 text-xs md:text-sm text-slate-600 leading-relaxed">
              Start with <strong>human nutrient sources</strong>, move through
              the <strong>biogeochemical pathway</strong> to
              <strong> hypoxia / anoxia</strong>, then explore
              <strong> ecosystem impacts</strong> and
              <strong> feedback loops</strong>. Use this as a visual aid to
              explain the regime shift during your interview.
            </p>
          </div>

          {/* ASCII styled causal diagram figure */}
          <div className="diagram-figure-container">
            <pre className="diagram-figure">
{`  Human Nutrients (Fertilizer, Sewage, Fossil Fuels)
                                │
                                ▼
                  ↑ Nutrient Loading (N, P)
                                │
                                ▼
                      ↑ Primary Production
                                │
                                ▼
                  ↑ Organic Matter Sedimentation
                                │
                                ▼
                     ↑ Microbial Respiration
                                │
               Stratification ──┘  (↓ mixing)
                                ▼
                  ↓ Dissolved Oxygen in Bottom Waters
                                ▼
                     HYPOXIA / ANOXIA (Regime Shift)
                                │
     ┌──────────────────────────┴───────────────────────────┐
     ▼                                                      ▼
Mass mortality of benthos                          Fish habitat compression
Loss of bioturbation                                Trophic transfer decrease
Nutrient release from sediments ↑                  Fisheries impacts
Microbial loop dominance ↑
     ▲                                                      │
     └─────────────── Reinforcing Feedbacks ───────────────┘`}
            </pre>
          </div>

        </div>
        {/* Right: detail panel */}
        <aside className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col gap-3 md:gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] md:text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Selected element
              </p>
              <h2 className="text-base md:text-lg font-semibold text-slate-900">
                {selectedNode.title}
              </h2>
            </div>
            <span
              className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] md:text-[11px] font-medium ${
                selectedNode.group === "Drivers"
                  ? "bg-emerald-50 text-emerald-700"
                  : selectedNode.group === "Biogeochemistry"
                  ? "bg-sky-50 text-sky-700"
                  : selectedNode.group === "Regime shift"
                  ? "bg-amber-50 text-amber-700"
                  : selectedNode.group === "Impacts"
                  ? "bg-rose-50 text-rose-700"
                  : selectedNode.group === "Feedbacks"
                  ? "bg-purple-50 text-purple-700"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              {GROUP_LABELS[selectedNode.group] || selectedNode.group}
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            {selectedNode.details}
          </p>

          {selectedNode.id === "hypoxia" && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 px-3 py-2.5 text-[11px] md:text-xs text-amber-900">
              <p className="font-semibold mb-1">Thresholds mentioned in the paper</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>
                  Hypoxia begins at about <strong>≤ 2 ml O₂/L</strong> when
                  benthic fauna show stress behaviors.
                </li>
                <li>
                  Severe hypoxia / near-anoxia at <strong>≤ 0.5 ml O₂/L</strong>
                  leads to mass mortality and major shifts in community
                  structure.
                </li>
              </ul>
            </div>
          )}

          {selectedNode.group === "Feedbacks" && (
            <div className="rounded-2xl bg-purple-50 border border-purple-200 px-3 py-2.5 text-[11px] md:text-xs text-purple-900">
              <p className="font-semibold mb-1">Why this is a regime shift</p>
              <p>
                Once hypoxia is established, internal nutrient recycling and
                food-web simplification create reinforcing loops. These loops
                keep the system in a low-oxygen, microbially dominated state
                even if external nutrient inputs are reduced.
              </p>
            </div>
          )}

          {selectedNode.id === "recovery" && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-[11px] md:text-xs text-emerald-900">
              <p className="font-semibold mb-1">Interview prompt idea</p>
              <p>
                You can end your 5-minute summary by highlighting how
                reductions in nutrient inputs are an investment in preventing a
                costly regime shift and restoring ecosystem services like
                fisheries.
              </p>
            </div>
          )}

          <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] md:text-xs text-slate-500 leading-relaxed">
            <p>
              Built from Diaz & Rosenberg (2008), <em>Spreading Dead Zones and
              Consequences for Marine Ecosystems</em>. Use this layout to guide
              a concise explanation of causes, mechanisms, feedbacks, and
              impacts of coastal hypoxia.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;