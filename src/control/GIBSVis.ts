import { BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import gibs, { Gibs } from 'data/gibs';

export type Day = [number, number, number]
export interface Visualization {
    name: string
    identifier: string
    platform?: string
    instrument?: string[]
    period: { start: Day, end: Day | string }
    projection?: string[]
    resolution?: string
    format?: string
    temporal?: string
    product?: string
}
type GetSourceUrl = () => string;
type Set = (identifier: string) => void
type GetVis = () => Visualization
type SetDay = (day: Day) => void
type GetDay = () => Day
type GetAll = () => Gibs;
type ListenSourceUrl = (listener: (sourceUrl: string) => void) => void
type ListenVis = (listener: (vis: Visualization) => void) => void
interface MinMaxDates { min: Date, max: Date }
type ListenMinMax = (listener: (minMax: MinMaxDates) => void) => void
type GetMinMax = () => MinMaxDates
export interface GIBSVisI {
    getVis: GetVis
    listenVis: ListenVis
    setVis: Set
    setDay: SetDay
    getDay: GetDay
    getAll: GetAll
    getSourceUrl: GetSourceUrl
    getMinMax: GetMinMax
    listenSourceUrl: ListenSourceUrl
    listenMinMax: ListenMinMax
}
const gibsVis$: BehaviorSubject<Visualization> = new BehaviorSubject(
    gibs.MODIS_Aqua_CorrectedReflectance_Bands721,
)
const day$: BehaviorSubject<Day> = new BehaviorSubject([2022, 5, 5]) // TODO set according to selected Vis
const sourceUrl$: BehaviorSubject<string> = new BehaviorSubject('NONE')
const getMaxDate = () => {
    if (gibsVis$.value.period.end === 'present') return new Date()
    const day = gibsVis$.value.period.end as Day // force as a Day type
    return new Date(day.join('-'))
}
const getMinDate = () => new Date(gibsVis$.value.period.start.join('-'))
const initMMDate = { min: getMinDate(), max: getMaxDate() }
const minMaxDate$ = new BehaviorSubject<MinMaxDates>(initMMDate)
const getMinMax: GetMinMax = () => minMaxDate$.value
gibsVis$.pipe(
    mergeMap(gibsVis => day$.pipe(
        // force the return type here, why doen't this get set?
        map(day => [gibsVis, day] as [Visualization, [number, number, number]]))
    )
).subscribe(([visualization, day]) => {
    const dayStr = `${day[0].toString()}-${day[1].toString().padStart(2, '0')}-${day[2].toString().padStart(2, '0')}`
    const fullUrl = `https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/${visualization.identifier}/default/${dayStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
    sourceUrl$.next(fullUrl)
    minMaxDate$.next({ min: getMinDate(), max: getMaxDate() })
})
const setVis: Set = identifier => gibsVis$.next(gibs[identifier])
const getVis: GetVis = () => gibsVis$.value;
const setDay: SetDay = day => day$.next(day);
const getDay: GetDay = () => day$.value;
const getAll: GetAll = () => gibs;
const listenSourceUrl: ListenSourceUrl = listener => sourceUrl$.subscribe(sourceUrl => listener(sourceUrl))
const listenVis: ListenVis = (listener => gibsVis$.subscribe(vis => listener(vis)))
const listenMinMax: ListenMinMax = listener => minMaxDate$.subscribe(v => listener(v))
export const getSourceUrl: GetSourceUrl = () => sourceUrl$.value
const GIBSVis: GIBSVisI = {
    listenVis,
    getVis,
    setVis,
    getAll,
    getSourceUrl,
    listenSourceUrl,
    getMinMax,
    listenMinMax,
    setDay,
    getDay,
}

export default GIBSVis;

/*
https://nasa-gibs.github.io/gibs-api-docs/available-visualizations/#multi-bandspectral

<li><strong>Platform</strong> - The satellite, aircraft, vessel, ground station, or mission from which data was gathered.</li>
<li><strong>Instrument</strong> - The scientific instrument that gathered the data.</li>
<li><strong>Name/Identifier</strong> - The visualization product's human-readable name and machine-readable identifier.</li>
<li><strong>Period</strong> - The visualization product's temporal period (e.g. <code>daily</code>, <code>monthly</code>).</li>
<li><strong>Projection(s) <sup>[<a href="#footnote-1">1</a>]</sup></strong> - The map projection(s) in which the visualization product is made available through GIBS web services.</li>
<li><strong>Resolution <sup>[<a href="#footnote-1">2</a>]</sup></strong> - The visualization product's native resolution used when pre-generating raster or vector tiles for access.</li>
<li><strong>Format</strong> - The visualization product's native format, as used in tile requests (e.g. <code>jpeg</code>, <code>png</code>, <code>vnd.mapbox-vector-tile</code>).</li>
<li><strong>Temporal Range</strong> - The visualization product's temporal range (e.g. <code>2002-08-30 - Present</code>).</li>
<li><strong>Product <sup>[<a href="#footnote-1">3</a>]</sup> <sup>[<a href="#footnote-1">4</a>]</sup></strong>
 - The science data product(s) utilized in the generation of the 
visualization product.  These may be one, or both, of Near Real-Time (<a href="https://earthdata.nasa.gov/lance" target="_blank">LANCE</a>) or Standard quality products.  Links are provided to the product's definition in the NASA Common Metadata Repository (<a href="https://earthdata.nasa.gov/cmr" target="_blank">CMR</a>). </li>
</ul>
*/
