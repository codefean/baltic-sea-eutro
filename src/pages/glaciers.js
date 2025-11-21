import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./glaciers.css";

export const glacierTileset = {
  url: "mapbox://mapfean.6tq07yii",
  sourceLayer: "NAG_NA",
  sourceId: "NAG_NA",
};

export const glacierTileset2 = {
  url: "mapbox://mapfean.akvo3zma",
  sourceLayer: "mapstogpx20251105_20-abjb2d",
  sourceId: "mapstogpx20251105_20-abjb2d",
};

// polygon glaciers
export const FILL_LAYER_ID_1 = "glacier-fill-scandi";

// GPX route stored as vector tiles
export const LINE_LAYER_ID_2 = "research-route-line";

// highlight layers
const HIGHLIGHT_LAYER_ID = "glacier-hover-highlight-scandi";
const HIGHLIGHT_LAYER_ID_2 = "research-route-hover";

const getGlacierLabel = (props = {}) => {
  if (props?.glac_name) return props.glac_name.trim();
  if (props?.GLAC_NAME) return props.GLAC_NAME.trim();
  return "Ukjent";
};

export function useGlacierLayer({ mapRef }) {
  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    const addGlacierPolygons = () => {
      if (!map.getSource(glacierTileset.sourceId)) {
        map.addSource(glacierTileset.sourceId, {
          type: "vector",
          url: glacierTileset.url,
        });
      }

      if (!map.getLayer(FILL_LAYER_ID_1)) {
        map.addLayer({
          id: FILL_LAYER_ID_1,
          type: "fill",
          source: glacierTileset.sourceId,
          "source-layer": glacierTileset.sourceLayer,
          paint: {
            "fill-color": "#2ba0ff",
            "fill-opacity": 0.8,
            "fill-outline-color": "#2ba0ff",
          },
        });
      }
    };

    const addRouteLineTileset = () => {
      if (!map.getSource(glacierTileset2.sourceId)) {
        map.addSource(glacierTileset2.sourceId, {
          type: "vector",
          url: glacierTileset2.url,
        });
      }

      if (!map.getLayer(LINE_LAYER_ID_2)) {
        map.addLayer({
          id: LINE_LAYER_ID_2,
          type: "line",
          source: glacierTileset2.sourceId,
          "source-layer": glacierTileset2.sourceLayer,

          layout: {
            "line-join": "round",
            "line-cap": "round",
          },

          paint: {
            "line-color": "#ff6600",
            "line-width": 3.5,
            "line-opacity": 1.0,
          },
        });
      }
    };

    const addHighlightLayers = () => {
      // glacier polygon highlight
      if (!map.getLayer(HIGHLIGHT_LAYER_ID)) {
        map.addLayer({
          id: HIGHLIGHT_LAYER_ID,
          type: "fill",
          source: glacierTileset.sourceId,
          "source-layer": glacierTileset.sourceLayer,
          paint: {
            "fill-color": "#004d80",
            "fill-opacity": 0.7,
          },
          filter: ["==", "glims_id", ""],
        });
      }

      // route line highlight
      if (!map.getLayer(HIGHLIGHT_LAYER_ID_2)) {
        map.addLayer({
          id: HIGHLIGHT_LAYER_ID_2,
          type: "line",
          source: glacierTileset2.sourceId,
          "source-layer": glacierTileset2.sourceLayer,

          paint: {
            "line-color": "#004d80",
            "line-width": 6,
            "line-opacity": 0.9,
          },

          // NOTE: update this if your tileset route property differs
          filter: ["==", "id", ""],
        });
      }
    };

    const onLoad = () => {
      addGlacierPolygons();
      addRouteLineTileset();
      addHighlightLayers();

      map.setLayoutProperty(FILL_LAYER_ID_1, "visibility", "visible");
      map.setLayoutProperty(LINE_LAYER_ID_2, "visibility", "visible");

      // simple hover highlight
      map.on("mousemove", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [FILL_LAYER_ID_1, LINE_LAYER_ID_2],
        });

        if (!features.length) {
          map.setFilter(HIGHLIGHT_LAYER_ID, ["==", "glims_id", ""]);
          map.setFilter(HIGHLIGHT_LAYER_ID_2, ["==", "id", ""]);
          return;
        }

        const f = features[0];
        const props = f.properties;

        if (props?.glims_id) {
          map.setFilter(HIGHLIGHT_LAYER_ID, ["==", "glims_id", props.glims_id]);
        }

        if (props?.id) {
          map.setFilter(HIGHLIGHT_LAYER_ID_2, ["==", "id", props.id]);
        }
      });

      map.on("mouseleave", LINE_LAYER_ID_2, () => {
        map.setFilter(HIGHLIGHT_LAYER_ID_2, ["==", "id", ""]);
      });
    };

    if (map.isStyleLoaded()) onLoad();
    else map.on("load", onLoad);

    return () => map.off("load", onLoad);
  }, [mapRef]);
}
