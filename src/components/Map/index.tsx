import React, { useEffect, useRef } from 'react'
import OpenLayerMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as olInteraction from 'ol/interaction';
import { MapCenter } from '../../control/map-center'
import { MapZoom } from '../../control/map-zoom'

type IMap = {
  ({ id, center, zoom, tileUrl }:
    { id: number, center: MapCenter, zoom: MapZoom, tileUrl: any }): React.ReactElement
}

const Map: IMap = ({ id, center, zoom, tileUrl }) => {
  const mapElement: any = useRef()
  useEffect(() => {
    const map: any = new OpenLayerMap({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ(tileUrl),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: center.getLatestValue().center,
        zoom: zoom.getLatestValue().zoom,
        zoomFactor: 5,
      }),
    })
    const mouseWheelInt = new olInteraction.MouseWheelZoom();
    if (map) {
      map.addInteraction(mouseWheelInt);
      map.on(['dblclick', 'wheel'], (e: any) => {
        const mapView = e.map.getView()
        const [mapZoom, maxZoom, minZoom] = [mapView.getZoom(), mapView.getMaxZoom(), mapView.getMinZoom()]
        const inc = 0.3
        if (e.type === 'wheel') {
          const nN = e.originalEvent.deltaY > 0 ?
            Math.max(mapZoom - inc, minZoom) : Math.min(mapZoom + inc, maxZoom);
          zoom.add(nN, 10000)
        } else if (e.type === 'dblclick') {
          const nN = Math.min(mapZoom + 0.5, maxZoom)
          zoom.add(nN, 10000)
        }
        return false;
      })
      map.on('pointerdrag', (e: any) => {
        center.add(e.map.getView().getCenter(), id)
      })
    }
    zoom.addEventListener(zoom => {
      map.getView().setZoom(zoom)
    }, id)
    center.addEventListener(center => {
      map.getView().setCenter(center)
    }, id)
  }, [center, id, tileUrl])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default Map;
