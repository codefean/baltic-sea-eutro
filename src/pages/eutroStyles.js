export const eutroLayers = {
  ER: {
    field: "ER",
    label: "Overall ER",
    description:
      "Overall Eutrophication Ratio. Combines C1 (nutrients), C2 (direct effects), and C3 (indirect effects) into a single status metric. ER ≤ 1.0 = Good, ER > 1.0 = Not Good.",
    stops: [
      [0.0, "#1a9850"],
      [0.5, "#66bd63"],
      [1.0, "#ffffbf"],
      [1.5, "#fdae61"],
      [2.0, "#f46d43"],
      [3.0, "#d73027"],
      [6.0, "#a50026"]
    ]
  },

  C1_ER: {
    field: "C1_ER",
    label: "Criteria 1 ER (Nutrients)",
    description:
      "Nutrient levels (DIN, DIP, TN, TP). Measures nutrient enrichment that drives eutrophication. Higher values indicate higher pressure.",
    stops: [
      [0.0, "#2c7bb6"],
      [1.0, "#abd9e9"],
      [2.0, "#ffffbf"],
      [3.0, "#fdae61"],
      [4.0, "#d7191c"],
      [6.0, "#7f0000"]
    ]
  },

  C2_ER: {
    field: "C2_ER",
    label: "Criteria 2 ER (Water clarity)",
    description:
      "Direct biological effects linked to eutrophication, such as increased chlorophyll-a and reduced water clarity.",
    stops: [
      [0.0, "#1a9641"],
      [1.0, "#a6d96a"],
      [2.0, "#ffffbf"],
      [4.0, "#fdae61"],
      [10.0, "#d7191c"],
      [20.0, "#7f0000"]
    ]
  },

  C3_ER_: {
    field: "C3_ER_",
    label: "Criteria 3 ER (Indirect Effects)",
    description:
      "Long-term ecological impacts, such as bottom oxygen depletion and degradation of benthic communities.",
    stops: [
      [0.0, "#4575b4"],
      [1.0, "#91bfdb"],
      [2.0, "#e0f3f8"],
      [3.0, "#fee090"],
      [4.0, "#fc8d59"],
      [6.0, "#d73027"]
    ]
  },

    OXYGEN_DEBT: {
    field: "Status", 
    label: "Oxygen Debt (Deep Water)",
    description:
      "Status of deep water oxygen conditions. Fail = oxygen debt is present; Achieve = criteria met",
    stops: [
      ["Fail", "#d7191c"],
      ["Achieve", "#1a9641"],
      ["Not Assessed", "#aaaaaa"]
    ]
  },
    SHALLOW_OXYGEN: {
    field: "Status", 
    label: "Oxygen Debt (Shallow Water)",
    description:
      "Status of shallow water oxygen conditions. Fail = oxygen debt is present; Achieve = criteria met",
    stops: [
      ["Fail", "#d7191c"],
      ["Achieve", "#1a9641"],
      ["Not Assessed", "#aaaaaa"]
    ]
  },
};
