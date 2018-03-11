/*
 * Author: Hoseong Lee
 * Contact: ohpyupi@gmail.com
 */
import * as THREE from 'three';
import STLLoader from 'imports-loader?THREE=three!exports-loader?THREE.STLLoader!three/examples/js/loaders/STLLoader';
import OrbitControls from 'imports-loader?THREE=three!exports-loader?THREE.OrbitControls!three/examples/js/controls/OrbitControls';

import ConsoleBar from './console-bar';
import './styles.css';

THREE.STLLoader = STLLoader;
THREE.OrbitControls = OrbitControls;

export default ThreeSTLViewer;

/*
 * @param {object} config
 * @param {string} config.selector
 * @param {string} config.urlToSTL
 */
function ThreeSTLViewer(config={}) {
  if (!config.selector || typeof config.selector !== 'string') {
    throw 'selector is required and must be a string.';
  }
  if (!config.urlToSTL || typeof config.urlToSTL !== 'string') {
    throw 'urlToSTL is required and must be a string.';
  }

  let colors = {
    primary: new THREE.Color('#0a85ff'),
    warning: new THREE.Color('#47002A'),
    support: new THREE.Color('#CACACA'),
    white: new THREE.Color('#ffffff'),
  };
 
  let container = document.querySelector(config.selector);
  container.className += ' three-stl-viewer';
  this.container = container;
  if (!container) {
    throw `Failed to find the DOM with the selector ${config.selector}`;
  }

  let material = new THREE.MeshPhongMaterial({
    color: '',
    shininess: 2000,
  });

  let light = new THREE.AmbientLight(colors.support, .5);

  let fog = new THREE.FogExp2(colors.support, 0.0128);

  let camera = new THREE.PerspectiveCamera(100, 1, 1, 1000)

  let scene = new THREE.Scene();

  let renderer = new THREE.WebGLRenderer({antialias: true});

  let grid = new THREE.GridHelper(400, 200, new THREE.Color('#ffffff'), new THREE.Color('#ffffff'));

  let loader = new THREE.STLLoader();

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  let size = {};
 
  configureMaterial();
  configureScene();
  configureControls();
  initiate();
  animate();
  addConsoleBar();

  function initiate() {
    camera.aspect = getWidth() / getHeight();
    loader.load(config.urlToSTL, (geometry)=>{
      geometry.center();
      geometry.rotateZ(Math.PI/2);
      geometry.rotateX(-Math.PI/2);
      geometry.lookAt(new THREE.Vector3(0, 0, 1));

      let mesh = new THREE.Mesh(geometry, material);
      let bbox = new THREE.Box3().setFromObject(mesh);
      size.x = bbox.max.x / 2;
      size.y = bbox.max.y / 2;
      size.z = bbox.max.z / 2;

      mesh.position.set(0, size.y, 0)
      mesh.receiveShadow = true
      mesh.castShadow = true
      mesh.scale.set(.5, .5, .5)
      scene.add(mesh)
      camera.position.set(2 * size.x, 2 * size.y, 2 * size.z)
      handleResize();
    });

    camera.updateProjectionMatrix()
    renderer.setSize(getWidth(), getHeight());
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    addLightToScene(1, 1, 1, 0xffffff, 1);
  }

  function configureControls() {
    controls.maxDistance = 100;
  }

  function configureMaterial() {
    material.depthWrite = true;
    material.color = colors.primary;
    material.side = THREE.DoubleSide;
  }

  function configureScene() {
    scene.background = new THREE.Color(colors.support);
    scene.add(grid);
    scene.add(light);
    scene.fog = fog;
  }

  function addLightToScene(x, y, z, color, intensity) {
    let dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(x, y, z)
    scene.add(dirLight);
  }

  function changeColor(color) {
  	material.color = new THREE.Color(color);
  }

  function toggleWireframe() {
    material.wireframe = !material.wireframe;
  }

  function animate () {
    window.requestAnimationFrame(function () {
      return animate();
    });
    render();
  };

  function render() {
    let timer = Date.now()*0.0005; 
    camera.lookAt(new THREE.Vector3(-1, -2, 0));
    renderer.render(scene, camera);
    renderer.setClearColor(0xffffff, 1);
  }

  function handleResize() {
    window.addEventListener('resize', function () {
			camera.aspect = getWidth() / getHeight();
			camera.updateProjectionMatrix();
		  renderer.setSize(getWidth(), getHeight());
    }, false);
  }

  function addConsoleBar() {
    let config = {
      defaultColor: colors.primary.getHexString(), 
      wireframeHandler: toggleWireframe,
      colorHandler: changeColor,
    };
    let consoleBar = new ConsoleBar(config);
    container.appendChild(consoleBar.dom);
  }

  function getWidth() {
    return $(container).width();
  }
  function getHeight() {
    return $(container).height();
  }
}
