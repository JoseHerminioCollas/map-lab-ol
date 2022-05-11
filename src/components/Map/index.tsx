import React, { useEffect, useRef } from 'react'
import OpenLayerMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as olInteraction from 'ol/interaction';
import { MapCenter } from '../../control/map-center'
import { MapZoom } from '../../control/map-zoom'
import { GIBSVisI } from '../../control/GIBSVis'

type IMap = {
  ({ id, center, zoom, tileUrl }:
    { id: number, center: MapCenter, zoom: MapZoom, tileUrl: any, gibsVis: GIBSVisI }): React.ReactElement
}
const gibsImageServiceUrl = (product: string, date: string) => `
https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/${product}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`

const Map: IMap = ({ id, center, zoom, tileUrl, gibsVis }) => {
  const mapElement: any = useRef()
  useEffect(() => {
    console.log('init map')
    const l = new TileLayer({
      source: new XYZ(tileUrl),
    })
    const map: any = new OpenLayerMap({
      controls: [],
      target: mapElement.current,
      layers: [
        l
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: center.getLatestValue().center,
        zoom: zoom.getLatestValue().zoom,
      }),
    })
    const mouseWheelInt = new olInteraction.MouseWheelZoom();
    if (map) {
      zoom.setMaxZoom(map.getView().getMaxZoom());
      zoom.setMinZoom(map.getView().getMinZoom())
      map.addInteraction(mouseWheelInt);
      map.on('dblclick', () => {
        zoom.zoomIn();
        return false;
      })
      map.on('wheel', ({ originalEvent }: any) => {
        originalEvent.deltaY > 0 ? zoom.zoomOut() : zoom.zoomIn();
        return false;
      })
      map.on('pointerdrag', ({ map }: any) => {
        center.add(map.getView().getCenter(), id)
      })
    }
    zoom.addEventListener(zoom => {
      map.getView().setZoom(zoom)
    }, id)
    center.addEventListener(center => {
      map.getView().setCenter(center)
    }, id)
    gibsVis.addListener(gV => {
      const xyz2 = new XYZ({
        url: gibsImageServiceUrl(gV.identifier, '2021-01-01'),
      })
      l.setSource(xyz2)
    })
  }, [center, id, tileUrl])

  return (
    <div className="openlayer">
      {gibsVis.get().name}
      <div ref={mapElement} className="openlayer" />
    </div>
  )
}

export default Map;
