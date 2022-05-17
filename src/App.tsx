import React, { useEffect } from 'react';
import { IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Dropdown, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { DatePicker, mergeStyleSets, defaultDatePickerStrings } from '@fluentui/react';
import './App.css';
import Map from './components/Map';
import tileUrls from './data/tile-urls';
import mapCenter from './control/map-center';
import mapZoom from './control/map-zoom';
import mapSource from './control/map-source';
import gibsVis from './control/GIBSVis';

const gibsVisOptions = Object.entries(gibsVis.getAll())
  .map(([, b]) => ({ key: b.identifier, text: b.name }))
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
const datePickerStyles = mergeStyleSets({
  root: { selectors: { '> *': { marginBottom: 15 } } },
  control: { maxWidth: 300, marginBottom: 15 },
});
function App() {
  initializeIcons();
  const add: IIconProps = { iconName: 'CalculatorAddition' };
  const minuz: IIconProps = { iconName: 'CalculatorSubtract' }
  const gibsMapSource = mapSource(gibsVis.getSourceUrl())
  const navMapSource = mapSource(tileUrls.NatGeo_World_Map.url)
  useEffect(() => {
    gibsVis.listenSourceUrl((vis: any) => {
      gibsMapSource.set(vis);
    })
  }, [])

  return (
    <div className="App">
      <Map
        id={30}
        tileUrl={tileUrls.gibs}
        center={mapCenter}
        zoom={mapZoom}
        mapSource={gibsMapSource}
      />
      <Map
        id={20}
        tileUrl={tileUrls.NatGeo_World_Map}
        center={mapCenter}
        zoom={mapZoom}
        mapSource={navMapSource}
      />
      <Dropdown
        placeholder="Select a GIBS product"
        label="Select a GIBS product"
        options={gibsVisOptions}
        styles={dropdownStyles}
        onChange={(e, item) => {
          if (!item) return;
          gibsVis.setVis(item.key.toString())
        }}
      />
      <DatePicker
        isRequired
        label="Date required (with label)"
        placeholder="Select a date..."
        ariaLabel="Select a date"
        className={datePickerStyles.control}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
        onSelectDate={date => {
          if (!date) return
          gibsVis.setDay(
            [date.getFullYear(), date.getMonth() + 1, date.getDate()]
          )
        }}
      />
      <IconButton
        iconProps={add}
        title="Zoom In"
        ariaLabel="Zoom In"
        disabled={false}
        checked={false}
        onClick={mapZoom.zoomIn}
      />
      <IconButton
        iconProps={minuz}
        title="Zoom Out"
        ariaLabel="Zoom Out"
        disabled={false}
        checked={false}
        onClick={mapZoom.zoomOut}
      />
    </div>
  );
}

export default App;
