# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---------------------------------------------------------------------------------------------------------------------------------------------

# ThanjavurMap – Interactive Mapping Component

An interactive React + Leaflet map built for the Thanjavur region.  
Supports:
- Loading existing shapes from a GeoJSON file
- Drawing and editing shapes
- Adding descriptions to drawn features
- Resetting the map view with a home button

## **Runnable file location:** `maps/src/components/ThanjavurMap.jsx`  
(You can run this component directly inside a React app to test the functionality.)

---

## Features & How Each of them work

### 1. **Basic Setup**
- React hooks used:
  - `useEffect` → For initializing and cleaning up the map when the component mounts/unmounts. *(Note: I intentionally ignored an ESLint dependency warning here because `defaultBounds` is a constant and doesn’t need to trigger re-renders.)*
  - `useRef` → To store the Leaflet map instance and feature groups without re-rendering. *(I wasn’t fully confident in `useRef` usage, so I asked AI for a short explanation before implementing it.)*
  - `useState` → To track the loading state while fetching GeoJSON.
- **Leaflet** and **Leaflet Draw** are used for mapping and drawing tools. (As recommended by AI)

---

### 2. **Map Initialization**
- The map is created only once (`useEffect` dependency array is empty).
- `defaultBounds` sets the map to Thanjavur’s region initially.
- Tiles are loaded from OpenStreetMap.

---

### 3. **Layer Groups**
- Two `FeatureGroup` layers:
  - `drawnItemsRef` → Shapes from the GeoJSON file.
  - `userDrawnItemsRef` → Shapes the user draws/edits.

---

### 4. **Viewing Properties of Existing GeoJSON**
- Clicking a shape shows its properties in a popup.
- Properties are wrapped inside a collapsible `<details>` element.

---

### 5. **Adding Descriptions to Drawn Shapes**
- When a new shape is drawn:
  - A popup form appears with a `<textarea>` to add a description.
  - The description is stored in `feature.properties` of the shape.
- On save, the popup updates to display the description.

---

### 6. **Loading the GeoJSON File**
- Fetches `/tanjavur_rabi3.geojson`.
- Shapes are styled and added to the `drawnItemsRef` layer group.
- Clicking opens the property popup.

---

### 7. **Drawing & Editing Tools**
- Leaflet Draw toolbar allows:
  - Polygon, rectangle, marker, and polyline creation.
- Events handled:
  - `CREATED` → Adds new shape to `userDrawnItemsRef` with description popup.
  - `EDITED` → Reopens description editor for modified shapes.
- *(I used AI to check the event names and object structure for Leaflet Draw.)*

---

### 8. **Cleanup**
- On unmount, the map instance is removed to prevent duplicate initialization.

---

## Where I used AI for help
While I wrote most of the logic myself, I did use AI in these areas:
1. Understanding **`useRef`** and why it’s ideal for storing map/layer instances without triggering re-renders.
2. Confirming the correct event constants (`L.Draw.Event.CREATED`, `L.Draw.Event.EDITED`) and how to attach listeners in React.
3. Suggesting the `<details>` tag for a clean, collapsible properties display.
4. **Technology choice discussion** – The original task suggested using **OpenLayers**, but after asking AI for a recommendation, it suggested **Leaflet** for this specific use case.  
   - **Why I didn’t use OpenLayers:** The AI recommended that while OpenLayers is powerful, it’s more complex for simple interactive maps. Leaflet has a lighter learning curve, better beginner documentation, and integrates more easily with React through community plugins. Since my focus was rapid prototyping with basic draw/edit features, Leaflet allowed me to deliver a working solution faster without sacrificing core functionality.

###### Everything else — including structuring the component, integrating the fetch logic, styling, and handling popups — was implemented manually.