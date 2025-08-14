import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

const ThanjavurMap = () => {
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(new L.FeatureGroup());
  const userDrawnItemsRef = useRef(new L.FeatureGroup()); 
  const [loading, setLoading] = useState(true);

  const defaultBounds = [
    [10.5, 78.9], 
    [10.85, 79.3], 
  ];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map("map");
    map.fitBounds(defaultBounds);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.addLayer(drawnItemsRef.current);
    map.addLayer(userDrawnItemsRef.current);

    // Show properties from existing GeoJSON
    const bindGeoJSONProperties = (layer) => {
      const props = layer.feature?.properties || {};
      let html = `
        <div style="max-height:150px; overflow-y:auto; width:220px;">
          <details open>
            <summary><b>Properties</b></summary>
            <div style="margin-top:5px;">`;
      if (Object.keys(props).length === 0) {
        html += "No properties available";
      } else {
        Object.entries(props).forEach(([key, value]) => {
          html += `<b>${key}</b>: ${value}<br/>`;
        });
      }
      html += `
            </div>
          </details>
        </div>
      `;
      layer.bindPopup(html, { maxWidth: 250 }).openPopup();
    };

    
    // Popup for drawn polygons with Save + Delete
const bindTextEditor = (layer) => {
  const textValue = layer.feature?.properties?.description || "";
  const formHtml = `
    <form id="text-form">
      <textarea id="desc" rows="4" style="width:200px;">${textValue}</textarea><br/><br/>
      <button type="submit">Save</button>
      
    </form>
  `;

  layer.bindPopup(formHtml);

  layer.on("popupopen", () => {
    const form = document.getElementById("text-form");
    const deleteBtn = document.getElementById("delete-btn");

    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const descEl = document.getElementById("desc");
        if (descEl) {
          const desc = descEl.value;
          if (!layer.feature) {
            layer.feature = {
              type: "Feature",
              properties: {},
              geometry: layer.toGeoJSON().geometry
            };
          }
          layer.feature.properties = { description: desc };
          layer.bindPopup(`<b>Description:</b><br/>${desc}`).openPopup();
        }
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        userDrawnItemsRef.current.removeLayer(layer);
        map.closePopup();
      });
    }
  });
};


    // Load existing GeoJSON
    fetch("/tanjavur_rabi3.geojson")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        L.geoJSON(data, {
          style: { color: "#3388ff", weight: 2, fillOpacity: 0.5 },
          onEachFeature: (feature, layer) => {
            layer.on("click", () => bindGeoJSONProperties(layer));
            drawnItemsRef.current.addLayer(layer);
          },
        }).addTo(map);
      })
      .catch(() => setLoading(false));

    // Drawing controls
    const drawControl = new L.Control.Draw({
      edit: { featureGroup: userDrawnItemsRef.current }, 
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        marker: true,
        polyline: true,
      },
    });
    map.addControl(drawControl);

    // New shape
    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      bindTextEditor(layer);
      userDrawnItemsRef.current.addLayer(layer); 
    });

    // Edited shape
    map.on(L.Draw.Event.EDITED, (e) => {
      e.layers.eachLayer((layer) => {
        bindTextEditor(layer);
      });
    });

    // Home button
    const homeBtn = L.control({ position: "topleft" });
    homeBtn.onAdd = () => {
      const btn = L.DomUtil.create("button", "home-btn");
      btn.innerHTML = "🏠";
      btn.style.background = "#fff";
      btn.style.padding = "5px";
      btn.style.cursor = "pointer";
      btn.onclick = () => {
        map.fitBounds(defaultBounds);
      };
      return btn;
    };
    homeBtn.addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {loading && <div style={{ padding: "10px" }}>Loading GeoJSON...</div>}
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      <style>
        {`
          .home-btn {
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
};

export default ThanjavurMap;
