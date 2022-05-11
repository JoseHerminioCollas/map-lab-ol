import { BehaviorSubject, interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
import gibs, { Gibs, Visualization } from '../data/gibs';

type AddListener = (listener: (visualization: Visualization) => void) => void
type Set = (identifier: string) => void
type Get = () => Visualization;
type GetAll = () => Gibs;
export interface GIBSVisI {
    set: Set
    get: Get
    getAll: GetAll
    addListener: AddListener
}
const gibsVis$: BehaviorSubject<Visualization> = new BehaviorSubject(
    gibs.MODIS_Terra_CorrectedReflectance_TrueColor,
)
const set: Set = (identifier) => gibsVis$.next(gibs[identifier])
const get: Get = () => gibsVis$.value;
const getAll: GetAll = () => gibs;
const addListener: AddListener = (listener) => {
    gibsVis$
        .pipe(throttle(() => interval(200)))
        .subscribe(visualization => {
            listener(visualization)
        })
}
const GIBSVis: GIBSVisI = {
    set,
    get,
    getAll,
    addListener,
}

export default GIBSVis;
