import { Visualization } from "../control/GIBSVis";

export interface Gibs {
    [key: string]: Visualization
}
const gibs: Gibs =
{
    MODIS_Terra_CorrectedReflectance_TrueColor:
    {
        name: 'Corrected Reflectance (True Color)',
        identifier: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        platform: 'string',
        instrument: ['string'],
        period: { start: [2003, 1, 1], end: 'present' },
        projection: ['EPSG4326_250m'],
        resolution: 'string',
        format: 'jpg',
        temporal: 'string',
        product: 'string',
    },
    VIIRS_SNPP_CorrectedReflectance_TrueColor: {
        name: 'Corrected Reflectance ',
        identifier: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
        period: { start: [2020, 4, 25], end: 'present' },
        projection: ['EPSG4326_250m'],
        format: 'jpg',
    },
    MODIS_Terra_CorrectedReflectance_Bands367: {
        name: 'Corrected Reflectance (Bands 3-6-7)',
        identifier: 'MODIS_Terra_CorrectedReflectance_Bands367',
        period: { start: [2003, 1, 1], end: 'present' },
        projection: ['EPSG4326_250m'],
        format: 'jpg',
    },
    MODIS_Aqua_CorrectedReflectance_Bands721: {
        name: 'Corrected Reflectance (Bands 7-2-1) ',
        identifier: 'MODIS_Aqua_CorrectedReflectance_Bands721',
        period: { start: [2022, 5, 2], end: [2022, 5, 12]},
        projection: ['EPSG4326_250m'],
        format: 'jpg',
    }

};

export default gibs;
