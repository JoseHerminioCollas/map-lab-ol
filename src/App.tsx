import React from 'react';
import * as olProj from 'ol/proj'
import Map from './components/Map';
import './App.css';
import cities from './data/cities';
import tileUrls from './data/tile-urls';
import mapCenter from './control/map-center';
import mapZoom from './control/map-zoom';

function App() {
  return (
    <div className="App">
      <Map
        id={20}
        tileUrl={tileUrls.NatGeo_World_Map}
        center={mapCenter}
        zoom={mapZoom}
      />      <Map
        id={30}
        tileUrl={tileUrls.gibs}
        center={mapCenter}
        zoom={mapZoom}
      />
    </div>
  );
}

export default App;
