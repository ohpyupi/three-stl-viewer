function ConsoleBar(config={}) {

  let {defaultColor} = config;

  this.dom = document.createElement('div');
  this.dom.className += 'console-bar';
  createWireFrameConsole.apply(this, [config.wireframeHandler]);
  createColorConsole.apply(this, [defaultColor, config.colorHandler]);
}

function createWireFrameConsole(callback=()=>{}) {
  let button = document.createElement('button');
  button.type = 'button';
  button.className += 'wireframe-console';
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    callback();
  });
  this.dom.appendChild(button);
}

function createColorConsole(defaultColor, callback) {
  let colorConsole = document.createElement('input');
  this.dom.appendChild(colorConsole);
  colorConsole.className += 'color-console';
  $(colorConsole).spectrum({
    color: defaultColor, 
  });

  $(colorConsole).on('move.spectrum', (e, color)=>{
    let hexColor = color.toHexString();
    callback(hexColor); 
  });
}

export default ConsoleBar;
