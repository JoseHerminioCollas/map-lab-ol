import React, { useEffect, useRef } from 'react'
import OpenLayerMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import { MapCenter } from '../../control/map-center'

type IMap = {
  ({ id, center, tileUrl }: { id: number, center: MapCenter, tileUrl: any }): React.ReactElement
}

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
        center: center.getLatestValue().center,
        zoom: 3,
      }),
    }).on('pointerdrag', ({ map }: any) => {
      center.add(map.getView().getCenter(), id)
    })
    center.addEventListener(center => {
      if (map) {
        map.target.getView().setCenter(center)
      }
    }, id)
  }, [center, id, tileUrl])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default Map;
