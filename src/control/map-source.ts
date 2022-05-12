import { BehaviorSubject } from 'rxjs';

export type MapSourceService = {
    get: () => any
    set: (val: string) => any
    listen: (cb: any) => any
}
export type MapSource = (initValue: string) => MapSourceService;

const mapSource: MapSource = (initValue) => {
    const source$: BehaviorSubject<string> = new BehaviorSubject(initValue);

    return {
        get: () => source$.value,
        set: (val: string) => source$.next(val),
        listen: (cb: any) => source$.subscribe(val => cb(val)),
    }
}

export default mapSource;
