import { ATTRIBUTION } from 'ol/source/OSM';

const tileUrls = {
    World_Hillshade: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Source: Esri, Airbus DS, USGS, NGA, NASA, CGIAR, N Robinson, NCEAS, NLS, OS, NMA, Geodatastyrelsen, Rijkswaterstaat, GSA, Geoland, FEMA, Intermap and the GIS user community'
    },
    World_Imagery: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community '
    },
    World_Street_Map: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Sources: Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCan, Esri Japan, METI, Esri China (Hong Kong), Esri Korea, Esri (Thailand), NGCC, (c) OpenStreetMap contributors, and the GIS User Community'
    },
    NatGeo_World_Map: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
        attributions: ['National Geographic, Esri, Garmin, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.'],
    },
    openstreetmap: {
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: ATTRIBUTION,
    },
    gibs: {
        url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/' +
            'MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/' +
            'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
        attributions: '<a href="https://wiki.earthdata.nasa.gov/display/GIBS">NASA EOSDIS GIBS</a>'
    },
}

export default tileUrls;

// Corrected Reflectance (True Color)
// Temporal Coverage: 2002 JUL 03 - Present

// True Color: Red = Band 1, Green = Band 4, Blue = Band 3

// These images are called true-color or natural color because this combination of wavelengths is similar to what the human eye would see. The images are natural-looking images of land surface, oceanic and atmospheric features. The downside of this set of bands is that they tend to produce a hazy image.

// The MODIS Corrected Reflectance imagery is available only as near real-time imagery. The imagery can be visualized in Worldview and the Global Imagery Browse Services (GIBS). The sensor resolution is 500 m and 250 m (Bands 1 and 2 have a sensor resolution of 250 m, Bands 3 – 7 have a sensor resolution of 500m, and Bands 8 - 36 are 1 km. Band 1 is used to sharpen Band 3, 4, 6, and 7), imagery resolution is 250 m, and the temporal resolution is daily.

// References: MYD02HKM doi:10.5067/MODIS/MYD02HKM.061; MYD021KM doi:10.5067/MODIS/MYD021KM.061
