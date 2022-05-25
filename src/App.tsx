import React, { useEffect, useState } from 'react';
import { IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Dropdown, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { DatePicker, defaultDatePickerStrings } from '@fluentui/react';
import 'App.css';
import Map from 'components/Map';
import tileUrls from 'data/tile-urls';
import mapCenter from 'control/map-center';
import mapZoom from 'control/map-zoom';
import mapSource from 'control/map-source';
import gibsVis from 'control/GIBSVis';

const gibsVisOptions = Object.entries(gibsVis.getAll())
  .map(([, b]) => ({ key: b.identifier, text: b.name }))
const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
};

function App() {
  initializeIcons();
  const add: IIconProps = { iconName: 'CalculatorAddition' };
  const minuz: IIconProps = { iconName: 'CalculatorSubtract' }
  const gibsMapSource = mapSource(gibsVis.getSourceUrl())
  const navMapSource = mapSource(tileUrls.NatGeo_World_Map.url)
  const [dPData, setDPData] = useState(gibsVis.getMinMax())
  useEffect(() => {
    gibsVis.listenSourceUrl(vis => {
      gibsMapSource.set(vis);
    })
    gibsVis.listenMinMax(mm => {
      setDPData(mm)
    })
  }, [gibsMapSource])

  return (
    <div className="App">
      <div className='a'>
        <Map
          id={30}
          tileUrl={tileUrls.gibs}
          center={mapCenter}
          zoom={mapZoom}
          mapSource={gibsMapSource}
        />
      </div>
      <div className='b'>
        <Map
          id={20}
          tileUrl={tileUrls.NatGeo_World_Map}
          center={mapCenter}
          zoom={mapZoom}
          mapSource={navMapSource}
        />
      </div>
      <div className='c'>
        <Dropdown
          defaultSelectedKey={gibsVis.getVis().identifier}
          label="Select a GIBS product"
          options={gibsVisOptions}
          styles={dropdownStyles}
          onChange={(e, item) => {
            if (!item) return;
            gibsVis.setVis(item.key.toString())
          }}
        />
        <DatePicker
          value={dPData.max}
          label="Date "
          placeholder={dPData.max.toDateString()}
          ariaLabel="Select a date"
          initialPickerDate={dPData.max}
          minDate={dPData.min}
          maxDate={dPData.max}
          // DatePicker uses English strings by default. For localized apps, you must override this prop.
          strings={defaultDatePickerStrings}
          onSelectDate={date => {
            if (!date) return
            gibsVis.setDay(date.toISOString())
          }}
        />
        <div className='d'>
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
      </div>
      <div className='message-bar'>
        <h1>View
          <a href='https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs'> GIBS </a>
          Visualizations <img width="35px" src='logo.svg' />
        </h1>
        <dl>
          <dt>Current Visualization</dt>
          <dd>{gibsVis.getVis().name}</dd>
        </dl>
        <a href="https://github.com/JoseHerminioCollas/viewgibs.world" target="new">
          <img src="octocat-small.png" />
        </a>
      </div>
    </div>
  );
}

export default App;
