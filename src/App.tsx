import React from 'react';
import * as olProj from 'ol/proj'
import Map from './components/Map';
import './App.css';
import tileUrls from './data/tile-urls';
import mapCenter from './control/map-center';
import mapZoom from './control/map-zoom';
import { IIconProps, IContextualMenuProps, Stack, Link } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

function App() {
  initializeIcons();
  const add: IIconProps = { iconName: 'CalculatorAddition' };
  const minuz: IIconProps = { iconName: 'CalculatorSubtract' }
  return (
    <div className="App">
      <IconButton
        iconProps={add}
        title="Zoom In"
        ariaLabel="Zoom In"
        disabled={false} checked={false}
        onClick={mapZoom.zoomIn}
      />
      <IconButton
        iconProps={minuz}
        title="Emoji"
        ariaLabel="Emoji"
        disabled={false} checked={false}
        onClick={mapZoom.zoomOut}
      />
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
