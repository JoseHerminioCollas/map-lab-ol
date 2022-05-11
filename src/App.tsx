import React from 'react';
import Map from './components/Map';
import './App.css';
import tileUrls from './data/tile-urls';
import mapCenter from './control/map-center';
import mapZoom from './control/map-zoom';
import gibsVis from './control/GIBSVis';
import { IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { gibs } from './data/gibs';
import { Dropdown, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

const gibsVisOptions = Object.entries(gibs)
  .map(([, b]) => ({ key: b.identifier, text: b.name }))
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function App() {
  initializeIcons();
  const add: IIconProps = { iconName: 'CalculatorAddition' };
  const minuz: IIconProps = { iconName: 'CalculatorSubtract' }

  return (
    <div className="App">
      <Map
        id={30}
        tileUrl={tileUrls.gibs}
        center={mapCenter}
        zoom={mapZoom}
        gibsVis={gibsVis}
      />
      <Map
        id={20}
        tileUrl={tileUrls.NatGeo_World_Map}
        center={mapCenter}
        zoom={mapZoom}
        gibsVis={gibsVis}
      />
      <Dropdown
        placeholder="Select an option"
        label="Basic uncontrolled example"
        options={gibsVisOptions}
        styles={dropdownStyles}
        onChange={(e, item) => {
          if (item) {
            gibsVis.set(item.key.toString())
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
        title="Emoji"
        ariaLabel="Emoji"
        disabled={false} checked={false}
        onClick={mapZoom.zoomOut}
      />
    </div>
  );
}

export default App;
