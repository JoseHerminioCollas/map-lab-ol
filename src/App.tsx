import React from 'react';
import * as olProj from 'ol/proj'
import Map from './components/Map';
import './App.css';
import cities from './data/cities';
import tileUrls from './data/tile-urls';
import mapCenter from './control/map-center';

const selectedCity = 'seattle';
const centerLonLat3857 = olProj.transform(
  [cities[selectedCity][1], cities[selectedCity][0]], 'EPSG:4326', 'EPSG:3857'
);
function App() {
  return (
    <div className="App">
      <Map
        id={10}
        tileUrl={tileUrls.gibs}
        center={mapCenter}
      />
      <Map
        id={20}
        tileUrl={tileUrls.NatGeo_World_Map}
        center={mapCenter}
      />
    </div>
  );
}

export default App;
