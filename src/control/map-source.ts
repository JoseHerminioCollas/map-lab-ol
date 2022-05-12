import { BehaviorSubject } from 'rxjs';

type MapSourceService = {
    get: () => string
    set: (source: string) => void
    listen: (callback: (source: string) => void) => { unsubscribe: () => void }
}
type MapSource = (initValue: string) => MapSourceService;

const mapSource: MapSource = (initValue) => {
    const source$: BehaviorSubject<string> = new BehaviorSubject(initValue);

    return {
        get: () => source$.value,
        set: (newSource: string) => source$.next(newSource),
        listen: callback => source$.subscribe(val => callback(val)),
    }
}

export type { MapSourceService };
export default mapSource;
