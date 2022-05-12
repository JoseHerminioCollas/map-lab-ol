import React from 'react';
import { IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Dropdown, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import './App.css';
import Map from './components/Map';
import tileUrls from './data/tile-urls';
import mapCenter from './control/map-center';
import mapZoom from './control/map-zoom';
import mapSource from './control/map-source';
import gibsVis from './control/GIBSVis';
import { gibsImageServiceUrl } from './data/gibs';

const gibsVisOptions = Object.entries(gibsVis.getAll())
  .map(([, b]) => ({ key: b.identifier, text: b.name }))
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function App() {
  initializeIcons();
  const add: IIconProps = { iconName: 'CalculatorAddition' };
  const minuz: IIconProps = { iconName: 'CalculatorSubtract' }
  const url = gibsImageServiceUrl('MODIS_Terra_CorrectedReflectance_TrueColor');
  const ms = mapSource(url)
  const ms2 = mapSource('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}')

  return (
    <div className="App">
      <Map
        id={30}
        tileUrl={tileUrls.gibs}
        center={mapCenter}
        zoom={mapZoom}
        mapSource={ms}
      />
      <Map
        id={20}
        tileUrl={tileUrls.NatGeo_World_Map}
        center={mapCenter}
        zoom={mapZoom}
        mapSource={ms2}
      />
      <Dropdown
        placeholder="Select a GIBS product"
        label="Select a GIBS product"
        options={gibsVisOptions}
        styles={dropdownStyles}
        onChange={(e, item) => {
          if (item) {
            const url = gibsImageServiceUrl(item.key.toString());
            ms.set(url)
          }
        }}
      />
      <IconButton
        iconProps={add}
        title="Zoom In"
        ariaLabel="Zoom In"
        disabled={false} checked={false}
        onClick={mapZoom.zoomIn}
      />
      <IconButton
        iconProps={minuz}
        title="Zoom Out"
        ariaLabel="Zoom Out"
        disabled={false} checked={false}
        onClick={mapZoom.zoomOut}
      />
    </div>
  );
}

export default App;
