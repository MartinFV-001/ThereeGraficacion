import * as THREE from './three.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

// Crea el elemento html para visualizar la escena 3d
document.body.appendChild( renderer.domElement );

// Dibujar un cuboide
const geometry = new THREE.BoxGeometry( 2, 1, 3 );

// Crea un material para la geometría 
const material = new THREE.MeshBasicMaterial( { color: 0xea4b25 } );

// Dibuja la geometría con el material
const cube = new THREE.Mesh( geometry, material );

// Agrega el cubo a la escena
scene.add( cube );

// Crea las aristas de la geometría
const edges = new THREE.EdgesGeometry( geometry );

// Crea un material para las aristas
const edgeMaterial = new THREE.LineBasicMaterial( { color: 0xefced3 } );

// Dibuja las aristas con el material
const edgeLines = new THREE.LineSegments( edges, edgeMaterial );

// Agrega las aristas a la escena
scene.add( edgeLines );

camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    // Asegúrate de que las aristas roten junto con el cubo
    edgeLines.rotation.copy(cube.rotation);

    renderer.render( scene, camera );
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
