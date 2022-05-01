import { BehaviorSubject, interval } from 'rxjs'
import { filter, throttle } from 'rxjs/operators'

interface Zoom {
    zoom: number
    id?: number
}
type AddEventListener = (listener: (zoom: number) => void, id?: number) => void
type Add = (zoom: number, id?: number) => void
type GetLatestValue = () => Zoom;
export interface MapZoom {
    add: Add
    addEventListener: AddEventListener
    getLatestValue: GetLatestValue
    zoomIn: any
    zoomOut: any
    setMinZoom: (v: number) => void
    setMaxZoom: (v: number) => void
}

let minZoom = 0;
let maxZoom = 10;
const zoomIncrement = 0.5;
const setMinZoom = (v: number) => minZoom = v;
const setMaxZoom = (v: number) => maxZoom = v;
const zoom$: BehaviorSubject<Zoom> = new BehaviorSubject(
    { zoom: 2 },
)
const addEventListener: AddEventListener = (listener, id) => {
    zoom$
        .pipe(throttle(() => interval(200)), filter((zoom: Zoom) => zoom.id !== id))
        .subscribe((zoom: Zoom) => {
            listener(zoom.zoom)
        })
}
const zoomIn = () => {
    const zoom = Math.min(zoom$.getValue().zoom + zoomIncrement, maxZoom);
    zoom$.next({ zoom });
}
const zoomOut = () => {
    const zoom = Math.max(zoom$.getValue().zoom - zoomIncrement, minZoom);
    zoom$.next({ zoom });
}
const add: Add = (zoom, id) => {
    zoom$.next({ zoom, id })
}
const getLatestValue: GetLatestValue = () => zoom$.getValue();

const mapZoom: MapZoom = {
    add,
    addEventListener,
    getLatestValue,
    zoomIn,
    zoomOut,
    setMinZoom,
    setMaxZoom,
}

export default mapZoom;
