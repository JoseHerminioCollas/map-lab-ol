import {
    BehaviorSubject,
    interval,
} from 'rxjs'
import { filter, throttle } from 'rxjs/operators'
import cities from '../data/cities';
import * as olProj from 'ol/proj'

const selectedCity = 'madrid';
const centerLonLat3857 = olProj.transform(
  [cities[selectedCity][1], cities[selectedCity][0]], 'EPSG:4326', 'EPSG:3857'
);

interface Center {
    center: number[]
    id: number
}
interface AddEventListener {
    (listener: (center: number[]) => void, id: number): void
}
interface Add {
    (center: number[], id: number): void
}
export interface MapCenter {
    add: Add
    addEventListener: AddEventListener
}

const centers$: BehaviorSubject<Center> = new BehaviorSubject(
    { center: centerLonLat3857, id: 0 },
)
const addEventListener: AddEventListener = (listener, id) => {
    centers$
        .pipe(throttle(() => interval(200)), filter((center: Center) => center.id !== id))
        .subscribe((center: Center) => {
            listener(center.center)
        },
            console.log,
            () => {
                // eslint-disable-next-line no-console
                console.log('Completed: ', id)
            })
}
const add: Add = (center, id) => {
    centers$.next({ center, id })
}
const mapCenter: MapCenter = {
    add,
    addEventListener,
}

export default mapCenter;
