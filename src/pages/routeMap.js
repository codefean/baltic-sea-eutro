import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Legend from "./Legend";
import Controls from "./Controls";
import { eutroLayers } from "./eutroStyles";
import Citation from "./citation";
import CausalLoops from "./Causal_loops";

// cd /Users/seanfagan/Desktop/baltic-sea-eutro

export const balticTileset = {
  url: "mapbox://mapfean.6f77xsmu",
  sourceLayer: "baltic_eut",
  sourceId: "baltic_eut",
};

export const basinTileset = {
  url: "mapbox://mapfean.7z87vos7",
  sourceLayer: "basin_area3",
  sourceId: "basin_area3",
};

export const riverTileset = {
  url: "mapbox://mapfean.49mqpxxm",
  sourceLayer: "basin_rivers",
  sourceId: "basin_rivers",
};

export const deepOxygenTileset = {
  url: "mapbox://mapfean.dwdrr06z",
  sourceLayer: "deep_o2",
  sourceId: "deep_o2",
};

export const shallowOxygenTileset = {
  url: "mapbox://mapfean.avdul0qc",
  sourceLayer: "shallow_o2_3",
  sourceId: "shallow_o2_3",
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwZmVhbiIsImEiOiJjbTNuOGVvN3cxMGxsMmpzNThzc2s3cTJzIn0.1uhX17BCYd65SeQsW1yibA";

const BalticEutroMap = () => {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const initialized = useRef(false);

  const [selectedLayer, setSelectedLayer] = useState("ER");
  const [statusFilters, setStatusFilters] = useState({
    Good: true,
    "Not Good": true,
    "Not assessed": true,
  });
  const [confFilters, setConfFilters] = useState({
    Low: true,
    Moderate: true,
    High: true,
  });

  // ------------------------------------------------------------
  // Build color expression (numeric vs categorical)
  // ------------------------------------------------------------
  const createColorExpression = (style) => {
    const isCategorical = typeof style.stops[0][0] === "string";

    if (isCategorical) {
      // categorical: ["match", ["get", field], value1, color1, value2, color2, ..., defaultColor]
      const matchList = [];
      style.stops.forEach(([value, color]) => matchList.push(value, color));

      return ["match", ["get", style.field], ...matchList, "#ccc"];
    }

    // numeric interpolate
    const stops = style.stops.reduce((acc, s) => [...acc, s[0], s[1]], []);
    return ["interpolate", ["linear"], ["get", style.field], ...stops];
  };

  // ------------------------------------------------------------
  // Apply filtering (ER layers only)
  // ------------------------------------------------------------
  const updateFilter = () => {
    if (!mapRef.current) return;

    // Do not apply ER filters when showing oxygen layer
    if (selectedLayer === "OXYGEN_DEBT") {
      return;
    }

    const activeStatus = Object.keys(statusFilters).filter((k) => statusFilters[k]);
    const activeConf = Object.keys(confFilters).filter((k) => confFilters[k]);

    const filter = ["all"];

    if (activeStatus.length > 0) {
      filter.push(["in", ["get", "STATUS"], ...activeStatus]);
    }

    if (activeConf.length > 0) {
      filter.push(["in", ["get", "CONFIDENCE"], ...activeConf]);
    }

    if (mapRef.current.getLayer("baltic-er-fill")) {
      mapRef.current.setFilter("baltic-er-fill", filter);
    }
  };

  useEffect(updateFilter, [statusFilters, confFilters, selectedLayer]);

  // ------------------------------------------------------------
  // Update visibility & colors when selectedLayer changes
  // ------------------------------------------------------------
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const map = mapRef.current;
    const style = eutroLayers[selectedLayer];

const layers = [
  "baltic-er-fill",
  "baltic-er-borders",
  "deep-o2-fill",
  "deep-o2-outline",
  "shallow-o2-fill",
  "shallow-o2-outline",
];


    // hide all
    layers.forEach((id) => {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, "visibility", "none");
      }
    });

    if (selectedLayer === "OXYGEN_DEBT") {
      // Show oxygen layer
      if (map.getLayer("deep-o2-fill")) {
        map.setLayoutProperty("deep-o2-fill", "visibility", "visible");
        map.setPaintProperty(
          "deep-o2-fill",
          "fill-color",
          createColorExpression(style)
        );
      }
      if (map.getLayer("deep-o2-outline")) {
        map.setLayoutProperty("deep-o2-outline", "visibility", "visible");
      }
      return;
    }

    if (selectedLayer === "SHALLOW_OXYGEN") {
  if (map.getLayer("shallow-o2-fill")) {
    map.setLayoutProperty("shallow-o2-fill", "visibility", "visible");
    map.setPaintProperty(
      "shallow-o2-fill",
      "fill-color",
      createColorExpression(style)
    );
  }
  if (map.getLayer("shallow-o2-outline")) {
    map.setLayoutProperty("shallow-o2-outline", "visibility", "visible");
  }
  return;
}


    // Show ER layers
    if (map.getLayer("baltic-er-fill")) {
      map.setLayoutProperty("baltic-er-fill", "visibility", "visible");
      map.setPaintProperty(
        "baltic-er-fill",
        "fill-color",
        createColorExpression(style)
      );
    }
    if (map.getLayer("baltic-er-borders")) {
      map.setLayoutProperty("baltic-er-borders", "visibility", "visible");
    }
  }, [selectedLayer]);

  // ------------------------------------------------------------
  // Initialize Map (Strict Mode Safe)
  // ------------------------------------------------------------
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [20, 59],
      zoom: 4.1,
    });

    mapRef.current = map;

    map.on("load", () => {
      const initialStyle = eutroLayers[selectedLayer];

      // -----------------------------
      // Baltic Sea polygon fill
      // -----------------------------
      map.addSource(balticTileset.sourceId, {
        type: "vector",
        url: balticTileset.url,
      });

      map.addLayer({
        id: "baltic-er-fill",
        type: "fill",
        source: balticTileset.sourceId,
        "source-layer": balticTileset.sourceLayer,
        paint: {
          "fill-opacity": 0.8,
          "fill-color": createColorExpression(initialStyle),
        },
      });

      // Borders
      map.addLayer({
        id: "baltic-er-borders",
        type: "line",
        source: balticTileset.sourceId,
        "source-layer": balticTileset.sourceLayer,
        paint: {
          "line-width": 1,
          "line-color": "#444",
        },
      });

      // -----------------------------
      // Basin Outline
      // -----------------------------
      map.addSource(basinTileset.sourceId, {
        type: "vector",
        url: basinTileset.url,
      });

      map.addLayer({
        id: "basin-area-outline",
        type: "line",
        source: basinTileset.sourceId,
        "source-layer": basinTileset.sourceLayer,
        paint: {
          "line-color": "#222",
          "line-width": 2.5,
          "line-opacity": 0.6,
        },
      });

      // -----------------------------
      // Rivers
      // -----------------------------
      map.addSource(riverTileset.sourceId, {
        type: "vector",
        url: riverTileset.url,
      });

      map.addLayer({
        id: "basin-rivers",
        type: "line",
        source: riverTileset.sourceId,
        "source-layer": riverTileset.sourceLayer,
        paint: {
          "line-color": "#1f78b4",
          "line-width": 1.4,
          "line-opacity": 0.3,
        },
      });

      // -----------------------------
      // Deep Oxygen Layer
      // -----------------------------
      map.addSource(deepOxygenTileset.sourceId, {
        type: "vector",
        url: deepOxygenTileset.url,
      });

      map.addLayer({
        id: "deep-o2-fill",
        type: "fill",
        source: deepOxygenTileset.sourceId,
        "source-layer": deepOxygenTileset.sourceLayer,
        paint: {
          "fill-opacity": 0.75,
          "fill-color": createColorExpression(eutroLayers.OXYGEN_DEBT),
        },
        layout: { visibility: "none" }, // start hidden
      });

      map.addLayer({
        id: "deep-o2-outline",
        type: "line",
        source: deepOxygenTileset.sourceId,
        "source-layer": deepOxygenTileset.sourceLayer,
        paint: {
          "line-color": "#333",
          "line-width": 1,
        },
        layout: { visibility: "none" },
      });

      // -----------------------------
// Shallow Oxygen Layer
// -----------------------------
map.addSource(shallowOxygenTileset.sourceId, {
  type: "vector",
  url: shallowOxygenTileset.url,
});

map.addLayer({
  id: "shallow-o2-fill",
  type: "fill",
  source: shallowOxygenTileset.sourceId,
  "source-layer": shallowOxygenTileset.sourceLayer,
  paint: {
    "fill-opacity": 0.75,
    "fill-color": createColorExpression(eutroLayers.SHALLOW_OXYGEN),
  },
  layout: { visibility: "none" },
});

map.addLayer({
  id: "shallow-o2-outline",
  type: "line",
  source: shallowOxygenTileset.sourceId,
  "source-layer": shallowOxygenTileset.sourceLayer,
  paint: {
    "line-color": "#333",
    "line-width": 1,
  },
  layout: { visibility: "none" },
});


      // -----------------------------
      // Popup
      // -----------------------------
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      // ER popup
      map.on("mousemove", "baltic-er-fill", (e) => {
        const f = e.features[0];

        map.getCanvas().style.cursor = "pointer";

        popup
          .setLngLat(e.lngLat)
          .setHTML(`
            <strong>${f.properties.Name}</strong><br/>
            ER: ${Number(f.properties.ER).toFixed(2)}<br/>
            Status: ${f.properties.STATUS}<br/>
            Confidence: ${f.properties.CONFIDENCE}
          `)
          .addTo(map);
      });

      map.on("mouseleave", "baltic-er-fill", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      // Deep oxygen popup
      map.on("mousemove", "deep-o2-fill", (e) => {
        const f = e.features[0];

        map.getCanvas().style.cursor = "pointer";

        popup
          .setLngLat(e.lngLat)
          .setHTML(`
            <strong>${f.properties.name || "Oxygen Debt"}</strong><br/>
            Name: ${f.properties.Name}
            Status: ${f.properties.Status}<br/>
            EQRS: ${Number(f.properties.EQRS).toFixed(2)}
          `)
          .addTo(map);
      });

      map.on("mouseleave", "deep-o2-fill", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      // Shallow oxygen popup
map.on("mousemove", "shallow-o2-fill", (e) => {
  const f = e.features[0];

  map.getCanvas().style.cursor = "pointer";

  popup
    .setLngLat(e.lngLat)
    .setHTML(`
      <strong>${f.properties.name || "Shallow Oxygen"}</strong><br/>
      Name: ${f.properties.Name}<br/>
      Status: ${f.properties.Status}<br/>
      EQRS: ${Number(f.properties.EQRS).toFixed(2)}
    `)
    .addTo(map);
});

map.on("mouseleave", "shallow-o2-fill", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});


      // initial filter for ER
      updateFilter();
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

      <Controls
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        statusFilters={statusFilters}
        setStatusFilters={setStatusFilters}
        confFilters={confFilters}
        setConfFilters={setConfFilters}
        layerStyle={eutroLayers[selectedLayer]}
      />

      <Citation />
      <Legend layerStyle={eutroLayers[selectedLayer]} />
      <CausalLoops />
    </div>
  );
};

export default BalticEutroMap;
