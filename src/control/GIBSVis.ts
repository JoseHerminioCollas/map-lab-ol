import { BehaviorSubject, interval } from 'rxjs';
import { map, mergeMap, throttle } from 'rxjs/operators';
import gibs, { Gibs } from '../data/gibs';

export interface Visualization {
    name: string
    identifier: string
    platform?: string
    instrument?: string[]
    period?: string[]
    projection?: string[]
    resolution?: string
    format?: string
    temporal?: string
    product?: string
}
type GetSourceUrl = () => string;
type Set = (identifier: string) => void
type SetDay = (day: [number, number, number]) => void
type GetAll = () => Gibs;
type ListenSourceUrl = (listener: (sourceUrl: string) => void) => void

export interface GIBSVisI {
    setVis: Set
    setDay: SetDay
    getAll: GetAll
    getSourceUrl: GetSourceUrl
    listenSourceUrl: ListenSourceUrl
}
const gibsVis$: BehaviorSubject<Visualization> = new BehaviorSubject(
    gibs.MODIS_Aqua_CorrectedReflectance_Bands721,
)
const day$: BehaviorSubject<[number, number, number]> = new BehaviorSubject([2011, 1, 1])
const sourceUrl$: BehaviorSubject<string> = new BehaviorSubject('NONE')
gibsVis$.pipe(
    mergeMap(gibsVis => day$.pipe(
        // force the return type here, why doen't this get set?
        map(day => [gibsVis, day] as [Visualization, [number, number, number]]))
    )
).subscribe(([visualization, day]) => {
    const dayStr = `${day[0].toString()}-${day[1].toString().padStart(2, '0')}-${day[2].toString().padStart(2, '0')}`
    const fullUrl = `https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/${visualization.identifier}/default/${dayStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
    sourceUrl$.next(fullUrl)
})
const setVis: Set = identifier => gibsVis$.next(gibs[identifier])
const setDay: SetDay = day => day$.next(day)
const getAll: GetAll = () => gibs;
const listenSourceUrl: ListenSourceUrl = listener => {
    sourceUrl$.subscribe(sourceUrl => listener(sourceUrl))
}
export const getSourceUrl: GetSourceUrl = () => sourceUrl$.value
const GIBSVis: GIBSVisI = {
    setVis,
    getAll,
    getSourceUrl,
    listenSourceUrl,
    setDay,
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
