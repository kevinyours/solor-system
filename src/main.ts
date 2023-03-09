import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import bootstrap from './bootstrap';
import { Shared } from './config';

/**
 * https://velog.io/@9rganizedchaos/Three.js-journey-%EA%B0%95%EC%9D%98%EB%85%B8%ED%8A%B8-14
 */

async function init() {
    const canvas: HTMLCanvasElement = document.querySelector('#space-canvas')!;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    const { camera, clock, scene, ambientLight, axesHelper } = Shared;

    scene.add(camera);
    scene.add(ambientLight);
    scene.add(axesHelper);

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

    const { solorSystem, earthSystem, moonSystem } = await bootstrap(renderer);

    function draw() {
        const delta = clock.getDelta();

        // solorSystem.rotation.y += delta;
        // earthSystem.rotation.y += delta;
        // moonSystem.rotation.y += delta;

        controls.update();
        camera.lookAt(axesHelper.position);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        renderer.setAnimationLoop(draw);
    }

    function onResize() {
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', onResize);

    draw();
}

init();
