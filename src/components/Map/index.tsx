import React, { useEffect, useRef } from 'react';
import OpenLayerMap from 'ol/Map';
import atrributionControl from 'ol/control/Attribution';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as olInteraction from 'ol/interaction';
import { MapCenter } from 'control/map-center';
import { MapZoom } from 'control/map-zoom';
import { MapSourceService } from 'control/map-source';

type IMap = {
  ({ id, center, zoom, tileUrl, mapSource }:
    {
      id: number,
      center: MapCenter,
      zoom: MapZoom,
      tileUrl: any,
      mapSource: MapSourceService,
    }): React.ReactElement
}

const Map: IMap = ({ id, center, zoom, tileUrl, mapSource }) => {
  const mapElement: any = useRef();
  useEffect(() => {
    const map: any = new OpenLayerMap({
      controls: [new atrributionControl()],
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ(tileUrl),
        })
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
    const sub = mapSource.listen((source: string) => {
      map.addLayer(new TileLayer({
        source: new XYZ({
          url: source,
        }),
      }));
    })
    return () => { sub.unsubscribe() }
  }, [center, id, tileUrl])

  return (
    <div className="openlayer">
      <div ref={mapElement} className="openlayer" />
    </div>
  )
}

export default Map;
