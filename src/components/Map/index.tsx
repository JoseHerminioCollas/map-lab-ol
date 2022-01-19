import React, { useEffect, useRef } from 'react'
import OpenLayerMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

type IMap = {
  ({ center, tileUrl }: { center: number[], tileUrl: any }): React.ReactElement
}

const Map: IMap = ({ center, tileUrl }) => {
  const mapElement: any = useRef()
  useEffect(() => {
    new OpenLayerMap({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ(tileUrl),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center,
        zoom: 12,
      }),
    }).on('pointerdrag', (e: any) => {
      console.log(e.map.getView().getCenter())
    })
  }, [center, tileUrl])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default Map;
