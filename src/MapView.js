// import React from "react";
// import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import geojsonData from "./tanjavur rabi3.geojson";

// export default function MapView() {
//   // Style features based on ClassCat property
//   const styleFeature = (feature) => {
//     const colors = {
//       1: "green",
//       2: "orange",
//       3: "blue",
//       4: "red"
//     };
//     return {
//       color: colors[feature.properties.ClassCat] || "black",
//       weight: 2,
//       fillOpacity: 0.4
//     };
//   };

//   // Bind popup on each feature
//   const onEachFeature = (feature, layer) => {
//     let popupContent = "<strong>Feature Properties:</strong><br/>";
//     for (let key in feature.properties) {
//       popupContent += `<b>${key}</b>: ${feature.properties[key]}<br/>`;
//     }
//     layer.bindPopup(popupContent);
//   };

//   return (
//     <MapContainer
//       style={{ height: "100vh", width: "100%" }}
//       zoom={10}
//       center={[10.78, 79.13]} // Approx center of Tanjavur
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <GeoJSON
//         data={geojsonData}
//         style={styleFeature}
//         onEachFeature={onEachFeature}
//       />
//     </MapContainer>
//   );
// }




// import React from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// import "leaflet-draw/dist/leaflet.draw.css";
// import "leaflet-draw"; // This adds the plugin globally


// import geojsonData from "./tanjavur rabi3.geojson";

// export default function MapView() {
//   const mapRef = useRef();

//   // Style features
//   const styleFeature = (feature) => {
//     const colors = { 1: "green", 2: "orange", 3: "blue", 4: "red" };
//     return {
//       color: colors[feature.properties.ClassCat] || "black",
//       weight: 2,
//       fillOpacity: 0.4
//     };
//   };

//   // Popup for each feature
//   const onEachFeature = (feature, layer) => {
//     let popupContent = "<strong>Feature Properties:</strong><br/>";
//     for (let key in feature.properties) {
//       popupContent += `<b>${key}</b>: ${feature.properties[key]}<br/>`;
//     }
//     layer.bindPopup(popupContent);
//   };

//   useEffect(() => {
//     if (!mapRef.current) return;
//     const map = mapRef.current;

//     // Create feature group for drawn items
//     const drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     // Add draw control
//     const drawControl = new L.Control.Draw({
//       edit: {
//         featureGroup: drawnItems,
//         remove: true
//       },
//       draw: {
//         polygon: true,
//         polyline: true,
//         rectangle: true,
//         marker: true,
//         circle: false
//       }
//     });
//     map.addControl(drawControl);

//     // On create
//     map.on(L.Draw.Event.CREATED, (e) => {
//       const layer = e.layer;
//       drawnItems.addLayer(layer);
//       console.log("Created:", layer.toGeoJSON());
//     });

//     // On edit
//     map.on(L.Draw.Event.EDITED, (e) => {
//       e.layers.eachLayer((layer) => {
//         console.log("Edited:", layer.toGeoJSON());
//       });
//     });

//     // On delete
//     map.on(L.Draw.Event.DELETED, (e) => {
//       console.log(`${e.layers.getLayers().length} feature(s) deleted`);
//     });
//   }, []);

//   return (
//     <MapContainer
//       whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
//       style={{ height: "100vh", width: "100%" }}
//       zoom={10}
//       center={[10.78, 79.13]}
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <GeoJSON data={geojsonData} style={styleFeature} onEachFeature={onEachFeature} />
//     </MapContainer>
//   );
// }





// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import geojsonData from "./tanjavur rabi3.geojson";

// export default function MapView() {
//   const styleFeature = (feature) => {
//     const colors = {
//       1: "green",
//       2: "orange",
//       3: "blue",
//       4: "red"
//     };
//     return {
//       color: colors[feature.properties.ClassCat] || "black",
//       weight: 2,
//       fillOpacity: 0.4
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     // Show crop_name or predicted crop
//     let cropName = feature.properties.crop_name || feature.properties.pred_crop_1 || "Unknown";
//     layer.bindPopup(`<b>Crop Name:</b> ${cropName}<br><b>Area:</b> ${feature.properties.Area || "N/A"}`);
//   };

//   // Add drawing/editing controls after map is created
//   const handleMapCreated = (map) => {
//     const drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     const drawControl = new L.Control.Draw({
//       position: "topleft",
//       draw: {
//         polygon: true,
//         polyline: false,
//         rectangle: true,
//         circle: false,
//         marker: true,
//         circlemarker: false
//       },
//       edit: {
//         featureGroup: drawnItems
//       }
//     });
//     map.addControl(drawControl);

//     map.on(L.Draw.Event.CREATED, (e) => {
//       const layer = e.layer;
//       drawnItems.addLayer(layer);
//     });

//     // Add Legend bottom-right
//     const legend = L.control({ position: "bottomright" });
//     legend.onAdd = function () {
//       const div = L.DomUtil.create("div", "legend");
//       div.innerHTML = `
//         <h4>Legend</h4>
//         <i style="background: green"></i> Class 1<br>
//         <i style="background: orange"></i> Class 2<br>
//         <i style="background: blue"></i> Class 3<br>
//         <i style="background: red"></i> Class 4<br>
//       `;
//       return div;
//     };
//     legend.addTo(map);
//   };

//   return (
//     <MapContainer
//       style={{ height: "100vh", width: "100%" }}
//       zoom={10}
//       center={[10.78, 79.13]}
//       whenCreated={handleMapCreated}
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <GeoJSON
//         data={geojsonData}
//         style={styleFeature}
//         onEachFeature={onEachFeature}
//       />
//     </MapContainer>
//   );
// }







// import React from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import geojsonData from "./tanjavur rabi3.geojson";

// export default function MapView() {
//   const styleFeature = (feature) => {
//     const colors = {
//       1: "green",
//       2: "orange",
//       3: "blue",
//       4: "red"
//     };
//     return {
//       color: colors[feature.properties.ClassCat] || "black",
//       weight: 2,
//       fillOpacity: 0.4
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     let cropName = feature.properties.crop_name || feature.properties.pred_crop_1 || "Unknown";
//     layer.bindPopup(`<b>Crop Name:</b> ${cropName}<br><b>Area:</b> ${feature.properties.Area || "N/A"}`);
//   };

//   const handleMapCreated = (map) => {
//     const drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     const drawControl = new L.Control.Draw({
//       position: "topleft",
//       draw: {
//         polygon: true,
//         polyline: false,
//         rectangle: true,
//         circle: false,
//         marker: true,
//         circlemarker: false
//       },
//       edit: {
//         featureGroup: drawnItems
//       }
//     });
//     map.addControl(drawControl);

//     map.on(L.Draw.Event.CREATED, (e) => {
//       const layer = e.layer;
//       drawnItems.addLayer(layer);
//     });
//   };

//   return (
//     <MapContainer
//       style={{ height: "100vh", width: "100%" }}
//       zoom={10}
//       center={[10.78, 79.13]}
//       whenCreated={handleMapCreated}
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <GeoJSON
//         data={geojsonData}
//         style={styleFeature}
//         onEachFeature={onEachFeature}
//       />
//     </MapContainer>
//   );
// }





import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import geojsonData from "./tanjavur rabi3.geojson";

export default function MapView() {
  const styleFeature = () => ({
    color: "blue",
    weight: 2,
    fillOpacity: 0.4
  });

  const onEachFeature = (feature, layer) => {
    let cropName =
      feature.properties.crop_name ||
      feature.properties.pred_crop_1 ||
      "Unknown";
    layer.bindPopup(
      `<b>Crop Name:</b> ${cropName}<br><b>Area:</b> ${
        feature.properties.Area || "N/A"
      }`
    );
  };

  const handleMapCreated = (map) => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      position: "topright", // ✅ top right
      draw: {
        polygon: true,
        polyline: false,
        rectangle: true,
        circle: false,
        marker: true,
        circlemarker: false
      },
      edit: {
        featureGroup: drawnItems,
        remove: true
      }
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      drawnItems.addLayer(e.layer);
    });
  };

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      zoom={10}
      center={[10.78, 79.13]}
      whenCreated={handleMapCreated}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={geojsonData}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
