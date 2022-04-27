import React, { useEffect, useRef } from 'react'
import OpenLayerMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import cities from '../../data/cities';
import { MapCenter } from '../../control/map-center'

type IMap = {
  ({ id, center, tileUrl }: { id: number, center: MapCenter, tileUrl: any }): React.ReactElement
}
const selectedCity = 'seattle';
const centerLonLat3857 = olProj.transform(
  [cities[selectedCity][1], cities[selectedCity][0]], 'EPSG:4326', 'EPSG:3857'
);

const Map: IMap = ({ id, center, tileUrl }) => {
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
        center: centerLonLat3857,
        zoom: 3,
      }),
    }).on('pointerdrag', (e: any) => {
      const latLong = olProj.toLonLat(e.map.getView().getCenter())
      center.add([latLong[1], latLong[0]], id)
      console.log('id', id)
    })
    center.addEventListener(center => {
      if (map) {
        const lLConverted = olProj.fromLonLat([center[1], center[0]])
        map.target.getView().setCenter(lLConverted)
      }
    }, id)
  }, [center, id, tileUrl])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default Map;
