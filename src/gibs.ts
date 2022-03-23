/*
Information about this data can be found here:
https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+Available+Imagery+Products#expand-CorrectedReflectance17Products

`https://map1.vis.earthdata.nasa.gov/wmts-geo/
 MODIS_Terra_CorrectedReflectance_TrueColor/default/2014-07-09/
 EPSG4326_250m/${tile.zoom}/${tile.y}/${tile.x}.jpg`,
 https://gibs.earthdata.nasa.gov/wmts/epsg{EPSG:Code}/best/
 {ProductName}/default/{Time}/{TileMatrixSet}/{ZoomLevel}/{TileRow}/{TileCol}.png
*/

export interface Product {
    description: string
    imageLayer: string
    dateRange: string[]
    tileMatrixSets: string[]
    format: string
  }
  export interface Gibs {
    products: { multibandImagery: Product[] }
  }
  const gibs: Gibs = {
    products: {
      multibandImagery: [
        {
          description: 'Corrected Reflectance (True Color)',
          imageLayer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
          dateRange: ['2003-01-01', 'present'],
          tileMatrixSets: ['EPSG4326_250m'],
          format: 'jpg',
        },
        {
          description: 'Corrected Reflectance ',
          imageLayer: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
          dateRange: ['2020-04-25', 'present'],
          tileMatrixSets: ['EPSG4326_250m'],
          format: 'jpg',
        },
        {
          description: 'Corrected Reflectance (Bands 3-6-7) ',
          imageLayer: 'MODIS_Terra_CorrectedReflectance_Bands367',
          dateRange: ['2003-01-01', 'present'],
          tileMatrixSets: ['EPSG4326_250m'],
          format: 'jpg',
        }, {
          description: 'Corrected Reflectance (Bands 7-2-1) ',
          imageLayer: 'MODIS_Aqua_CorrectedReflectance_Bands721',
          dateRange: ['2003-01-01', 'present'],
          tileMatrixSets: ['EPSG4326_250m'],
          format: 'jpg',
        },
        {
          description: 'Corrected Reflectance (Bands 7-2-1) ',
          imageLayer: 'MODIS_Terra_CorrectedReflectance_Bands367',
          dateRange: ['2003-01-01', 'present'],
          tileMatrixSets: ['EPSG4326_250m'],
          format: 'jpg',
        },
      ],
    },
  }
  const gibsImageServiceUrl = (tile: any, product: string, date: string) => `
  https://map1.vis.earthdata.nasa.gov/wmts-geo/${product}/default/${date}/EPSG4326_250m/${tile.zoom}/${tile.y}/${tile.x}.jpg`
  
  export { gibsImageServiceUrl, gibs }
  