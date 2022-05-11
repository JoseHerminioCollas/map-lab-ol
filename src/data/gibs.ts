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
export interface Gibs {
    [key: string]: Visualization
}
export const gibs: Gibs =
{
    MODIS_Terra_CorrectedReflectance_TrueColor:
    {
        name: 'Corrected Reflectance (True Color)',
        identifier: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        platform: 'string',
        instrument: ['string'],
        period: ['2003-01-01', 'present'],
        projection: ['EPSG4326_250m'],
        resolution: 'string',
        format: 'jpg',
        temporal: 'string',
        product: 'string',
    },
    VIIRS_SNPP_CorrectedReflectance_TrueColor: {
        name: 'Corrected Reflectance ',
        identifier: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
        period: ['2020-04-25', 'present'],
        projection: ['EPSG4326_250m'],
        format: 'jpg',
    },
    MODIS_Terra_CorrectedReflectance_Bands367: {
        name: 'Corrected Reflectance (Bands 3-6-7)',
        identifier: 'MODIS_Terra_CorrectedReflectance_Bands367',
        period: ['2003-01-01', 'present'],
        projection: ['EPSG4326_250m'],
        format: 'jpg',
    },
    MODIS_Aqua_CorrectedReflectance_Bands721: {
        name: 'Corrected Reflectance (Bands 7-2-1) ',
        identifier: 'MODIS_Aqua_CorrectedReflectance_Bands721',
        period: ['2003-01-01', 'present'],
        projection: ['EPSG4326_250m'],
        format: 'jpg',
    }

};

export default gibs;
