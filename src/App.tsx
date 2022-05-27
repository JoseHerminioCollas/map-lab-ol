import React, { useEffect, useState } from 'react';
import {
  FontIcon,
  IIconProps,
  mergeStyles,
  DatePicker,
  defaultDatePickerStrings,
  IconButton,
  Dropdown,
  IDropdownStyles,
  Modal,
} from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
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
const infoIconClass = mergeStyles({
  fontSize: 25,
  fontWeight: 900,
  height: 25,
  width: 25,
  margin: '0 0.35em',
  cursor: 'pointer',
});
const modalClass = mergeStyles({
  background: '#eee',
  borderRadius: '1em',
  margin: '0 0.35em',
  maxWidth: 500,
  maxHeight: 600,
});
const cancelIconClass = mergeStyles({
  fontSize: 25,
  fontWeight: 900,
  height: 25,
  width: 25,
  margin: '0 0.35em',
  cursor: 'pointer',
});

function App() {
  initializeIcons();
  const add: IIconProps = { iconName: 'CalculatorAddition' };
  const minuz: IIconProps = { iconName: 'CalculatorSubtract' }
  const gibsMapSource = mapSource(gibsVis.getSourceUrl())
  const navMapSource = mapSource(tileUrls.NatGeo_World_Map.url)
  const [dPData, setDPData] = useState(gibsVis.getMinMax())
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      <Modal
        titleAriaId='Goatstone Information'
        onDismiss={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isBlocking={false}
        containerClassName={modalClass}
      >
        <div className='modal-header'>
          <h3>View GIBS</h3>
          <FontIcon
            onClick={() => setIsModalOpen(false)}
            aria-label="Close Window"
            iconName="cancel"
            className={cancelIconClass}
          />
        </div>
        <article className='modal-article'>
          <img width="75px" src='logo.svg' />

          <p>
            View GIBS is a tool for viewing satellite images provided by NASA's Global Imagery Browse Services (GIBS) system.
            <br />
            <a href="https://nasa-gibs.github.io/gibs-api-docs/" >
              GIBS : https://nasa-gibs.github.io/gibs-api-docs
            </a>
          </p>
          <p>
            View GIBS (https://viewgibs.world) is a simplified version of the Worldview application located at:
            &nbsp;<a href="https://worldview.earthdata.nasa.gov/">
              https://worldview.earthdata.nasa.gov/
            </a>
          </p>
          <p>
            Ideally, the usefulness of this simplified application will provide users with an optional tool that will provide useful variants for searching and viewing the satellite imagery.
          </p>
          <h5>Users can :</h5>
          <ul>
            <li>
              Use a geographic map to navigate a satellite map with drag, click and double click
            </li>
            <li>
              Navigate the satellite map
            </li>
            <li>
              Select from a sub group of the NASA visualizations available.
            </li>
            <li>
              Select the day the image was taken
            </li>
          </ul>
          <p>
            As the user navigates either map both the satellite and geographic maps' locations remain in sync.
          </p>
          <p>
            View Gibs is developed by
            &nbsp;<a
              href="https://goatstone.com"
              target="new"
            >Goatstone</a> ( 2022 &copy; )
          </p>
        </article>
      </Modal>
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
        <img width="35px" src='logo.svg' />
        <h1>
          View
          &nbsp;<a href='https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs' target="new">
            GIBS
          </a>&nbsp;
          <FontIcon
            onClick={() => setIsModalOpen(true)}
            aria-label="Information"
            iconName="info"
            className={infoIconClass} />
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
