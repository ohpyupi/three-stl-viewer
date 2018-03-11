# Three STL Viewer 

## Introduction
Three STL Viewer is a 3D model viewr for STL objects based on Three.js 3D engine.
[Examples](https://three-stl-viewer.herokuapp.com/)

## Installation

```
npm install three-stl-viewer --save
```

## Dependencies
Three STL Viewer has dependencies, jQuery, spectrum, and Three.js. To utilize the package, it is required to install the dependencies properly.

```
npm install jquery --save
npm install spectrum-colorpicker --save
npm install three --save
```

## How to use

```
// jQuery should exist in the global scope.
import 'spectrum-colorpicker';
import 'spectrum-colorpicer/spectrum.css';
import ThreeSTLViewer from 'three-stl-viewer';

...

let viewer = new ThreeSTLViewer({
	selector: '#pikachu.stl-viewer',
	urlToSTL: '/stl/pikachu.stl',
});
```

## Authors

* **Hoseong Lee** - *Initial work* - ohpyupi@gmail.com
