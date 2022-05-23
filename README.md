# viewgibs.world 

# [https://viewgibs.world](https://viewgibs.world) : Satellite Image Navigator

<img width="250px" src='public/logo.svg'>

Viewgibs.world is a tool for viewing satellite images provided by NASA's Global Imagery Browse Services (GIBS) system.

Documentation for GIBS can be found here: 
[https://nasa-gibs.github.io/gibs-api-docs/](https://nasa-gibs.github.io/gibs-api-docs/)

Viewgibs.world is a simplified version of the Worldview application located at: [https://worldview.earthdata.nasa.gov/](https://worldview.earthdata.nasa.gov/)

Ideally, the usefulness of this simplified application will provide users with an optional tool that will provide useful variants for searching and viewing the satellite imagery.

## Development

### The Technology Used

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [TypeScript](https://www.typescriptlang.org)
* [React](https://reactjs.org/)
* [Fluent UI](https://developer.microsoft.com/en-us/fluentui)
* [OpenLayers](https://openlayers.org/)
* [RxJS](https://rxjs.dev/)
* [ImageMagick](https://imagemagick.org)
* [InkScape](https://inkscape.org/)
* [Gimp](https://www.gimp.org/)


The map is a single React component. This component takes the values it needs to display the correct map, its location, and zoom. It wraps the mapping library OpenLayers which provides much of the functionality for the map.

RxJS is used to deliver the messages and commands from one component to another component.

Fluent UI is used as the component library. Ideally, the flexibility and functionality of a component library like Fluent UI will provide the user with an easy-to-use interface for navigating the satellite imagery.

Image Magick is used to create the favicon.ico

[Favicons with ImageMagick](https://nedbatchelder.com/blog/202012/favicons_with_imagemagick.html)
```
convert -background transparent "art/logo-5-23-2022.png" -define icon:auto-resize=16,24,32,48,64,72,96,128,256 "favicon.ico"
```

Inkscape and Gimp have been used to generate the icon

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
