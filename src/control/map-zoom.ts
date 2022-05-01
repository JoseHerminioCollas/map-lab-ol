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
}

const zoom$: BehaviorSubject<Zoom> = new BehaviorSubject(
    { zoom: 2},
)
const addEventListener: AddEventListener = (listener, id) => {
    zoom$
        .pipe(throttle(() => interval(200)), filter((zoom: Zoom) => zoom.id !== id))
        .subscribe((zoom: Zoom) => {
            listener(zoom.zoom)
        })
}
const add: Add = (zoom, id) => {
    zoom$.next({ zoom, id })
}
const getLatestValue: GetLatestValue = () => zoom$.getValue();
const mapZoom: MapZoom = {
    add,
    addEventListener,
    getLatestValue,
}

export default mapZoom;
