export default class LayerManager {
  constructor(map) {
    this.map = map;
    this.layers = {};
  }

  addALayer(name, layer) {
    if (!this.layers[name]) {
      this.layers[name] = layer;
      this.map.addLayer(layer);
    }
  }

  removeLayer(name) {
    if (this.layers[name]) {
      this.map.removeLayer(this.layers[name]);
      delete this.layers[name];
    }
  }

  toggleLayer(name) {
    if (this.layers[name] && this.map.hasLayer(this.layers[name])) {
      this.map.removeLayer(this.layers[name]);
    } else if (this.layers[name]) {
      this.map.addLayer(this.layers[name]);
    }
  }
}
