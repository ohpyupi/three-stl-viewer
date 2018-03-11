import $ from 'jquery';
window.$ = $;
import 'spectrum-colorpicker';
import 'spectrum-colorpicker/spectrum.css';
import ThreeSTLViewer from '../src/index.js';

let pikachuViewer = new ThreeSTLViewer({
  selector: '#pikachu.stl-viewer',
  urlToSTL: '/stl/pikachu.stl',
});

let balloonViewer = new ThreeSTLViewer({
  selector: '#balloon.stl-viewer',
  urlToSTL: '/stl/balloon.stl',
});
