export const eutroLayers = {
  ER: {
    field: "ER",
    label: "Overall ER",
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
    label: "Criteria 2 ER (Water clarity / Chl-a)",
    stops: [
      [0.0, "#1a9641"],
      [1.0, "#a6d96a"],
      [2.0, "#ffffbf"],
      [4.0, "#fdae61"],
      [10.0, "#d7191c"],
      [20.0, "#7f0000"]
    ]
  },
  C3_ER: {
    field: "C3_ER",
    label: "Criteria 3 ER (Direct Effects)",
    stops: [
      [0.0, "#4575b4"],
      [1.0, "#91bfdb"],
      [2.0, "#e0f3f8"],
      [3.0, "#fee090"],
      [4.0, "#fc8d59"],
      [6.0, "#d73027"]
    ]
  }
};
