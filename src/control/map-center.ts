import { BehaviorSubject, interval } from 'rxjs'
import { filter, throttle } from 'rxjs/operators'

interface Center {
    center: number[]
    id?: number
}
type AddEventListener = (listener: (center: number[]) => void, id: number) => void
type Add = (center: number[], id: number) => void
type GetLatestValue = () => Center;
export interface MapCenter {
    add: Add
    addEventListener: AddEventListener
    getLatestValue: GetLatestValue
}

const centers$: BehaviorSubject<Center> = new BehaviorSubject(
    { center: [548506308229.4553, 4332711.168894576] },
)
const addEventListener: AddEventListener = (listener, id) => {
    centers$
        .pipe(throttle(() => interval(200)), filter((center: Center) => center.id !== id))
        .subscribe((center: Center) => {
            listener(center.center)
        },
            console.log,
            () => { })
}
const add: Add = (center, id) => {
    centers$.next({ center, id })
}
const getLatestValue: GetLatestValue = () => centers$.getValue();
const mapCenter: MapCenter = {
    add,
    addEventListener,
    getLatestValue,
}

export default mapCenter;
