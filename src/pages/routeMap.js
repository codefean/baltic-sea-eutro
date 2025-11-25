import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Legend from "./Legend";
import Controls from "./Controls";
import { eutroLayers } from "./eutroStyles";
import Citation from "./citation";


// --------------------------------------------------
// 1. Define the tileset exactly like your glacier example
// --------------------------------------------------
export const balticTileset = {
  url: "mapbox://mapfean.6f77xsmu",
  sourceLayer: "baltic_eut",
  sourceId: "baltic_eut",             
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwZmVhbiIsImEiOiJjbTNuOGVvN3cxMGxsMmpzNThzc2s3cTJzIn0.1uhX17BCYd65SeQsW1yibA";

const BalticEutroMap = () => {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);

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

  // --------------------------------------------------
  // 2. Apply filters with correct Mapbox syntax
  // --------------------------------------------------
  const updateFilter = () => {
    if (!mapRef.current) return;

    const activeStatus = Object.keys(statusFilters).filter((k) => statusFilters[k]);
    const activeConf = Object.keys(confFilters).filter((k) => confFilters[k]);

    mapRef.current.setFilter("baltic-er-fill", [
      "all",
      ["in", ["get", "STATUS"], ...activeStatus],
      ["in", ["get", "CONFIDENCE"], ...activeConf],
    ]);
  };

  useEffect(updateFilter, [statusFilters, confFilters]);

  // --------------------------------------------------
  // 3. Update color ramp when switching layers
  // --------------------------------------------------
  useEffect(() => {
    if (!mapRef.current) return;

    const style = eutroLayers[selectedLayer];

    if (mapRef.current.getLayer("baltic-er-fill")) {
      mapRef.current.setPaintProperty(
        "baltic-er-fill",
        "fill-color",
        ["interpolate", ["linear"], ["get", style.field], ...style.stops.flat()]
      );
    }
  }, [selectedLayer]);

  // --------------------------------------------------
  // 4. Initialize the map + add source/layers
  // --------------------------------------------------
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [20, 59],
      zoom: 4.3,
    });

    mapRef.current.on("load", () => {
      // --- Add source (following your glacierTileset pattern) ---
      if (!mapRef.current.getSource(balticTileset.sourceId)) {
        mapRef.current.addSource(balticTileset.sourceId, {
          type: "vector",
          url: balticTileset.url,
        });
      }

      const style = eutroLayers[selectedLayer];

      // --- Add Fill Layer ---
      if (!mapRef.current.getLayer("baltic-er-fill")) {
        mapRef.current.addLayer({
          id: "baltic-er-fill",
          type: "fill",
          source: balticTileset.sourceId,
          "source-layer": balticTileset.sourceLayer,
          paint: {
            "fill-opacity": 0.85,
            "fill-color": [
              "interpolate",
              ["linear"],
              ["get", style.field],
              ...style.stops.flat(),
            ],
          },
        });
      }

      // --- Add Borders ---
      if (!mapRef.current.getLayer("baltic-er-borders")) {
        mapRef.current.addLayer({
          id: "baltic-er-borders",
          type: "line",
          source: balticTileset.sourceId,
          "source-layer": balticTileset.sourceLayer,
          paint: {
            "line-width": 0.3,
            "line-color": "#444",
          },
        });
      }

      // --- Popup ---
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      mapRef.current.on("mousemove", "baltic-er-fill", (e) => {
        const f = e.features[0];
        mapRef.current.getCanvas().style.cursor = "pointer";

        popup
          .setLngLat(e.lngLat)
          .setHTML(`
            <strong>${f.properties.Name}</strong><br/>
            ER: ${Number(f.properties.ER).toFixed(2)}<br/>
            Status: ${f.properties.STATUS}<br/>
            Confidence: ${f.properties.CONFIDENCE}
          `)
          .addTo(mapRef.current);
      });

      mapRef.current.on("mouseleave", "baltic-er-fill", () => {
        mapRef.current.getCanvas().style.cursor = "";
        popup.remove();
      });

      updateFilter();
    });
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
      />
<Citation />
      <Legend layerStyle={eutroLayers[selectedLayer]} />
    </div>
  );
};

export default BalticEutroMap;
