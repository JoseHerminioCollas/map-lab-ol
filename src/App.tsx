import React from 'react';
import * as olProj from 'ol/proj'
import Map from './components/Map';
import './App.css';
import cities from './data/cities';
import tileUrls from './data/tile-urls';

const selectedCity = 'seattle';
const centerLonLat3857 = olProj.transform(
  [cities[selectedCity][1], cities[selectedCity][0]], 'EPSG:4326', 'EPSG:3857'
);
function App() {
  return (
    <div className="App">
      <Map
        tileUrl={tileUrls.gibs}
        center={centerLonLat3857}
      />
      <Map
        tileUrl={tileUrls.NatGeo_World_Map}
        center={centerLonLat3857}
      />
    </div>
  );
}

export default App;
