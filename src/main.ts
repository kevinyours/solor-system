import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import bootstrap from './bootstrap';
import { Shared, Size } from './config';

const { canvas, camera, clock, scene, ambientLight, axesHelper, grideHelper } = Shared;
const { frustumSize } = Size;

async function init() {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    camera.position.y = Math.PI / 6;
    camera.position.x = Math.PI / 2;
    camera.position.z = Math.PI / 2;

    scene.add(camera);
    scene.add(ambientLight);
    scene.add(axesHelper);
    scene.add(grideHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.minDistance = 5;
    controls.maxDistance = 50;

    // Dat GUI
    const gui = new dat.GUI();
    gui.add(camera.position, 'x', -100, 100, 0.1).name('카메라 X');
    gui.add(camera.position, 'y', -100, 100, 0.1).name('카메라 Y');
    gui.add(camera.position, 'z', -100, 100, 0.1).name('카메라 Z');

    const { solorSystem } = await bootstrap(renderer);
    scene.add(solorSystem);

    function render() {
        const delta = clock.getDelta();

        // solorSystem.rotation.y += delta;
        // earthSystem.rotation.y += delta;
        // moonSystem.rotation.y += delta;

        controls.update();
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        renderer.setAnimationLoop(render);
    }

    function onResize() {
        const newAspect = window.innerWidth / window.innerHeight;
        camera.left = (frustumSize * newAspect) / -2;
        camera.right = (frustumSize * newAspect) / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', onResize, false);

    render();
}

init();
