import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import bootstrap from './bootstrap';
import { Shared, Size } from './config';

const { canvas, camera, clock, scene, ambientLight, axesHelper, grideHelper, textureLoader } = Shared;
const { frustumSize } = Size;

async function init() {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setClearColor(0x000000, 0);

    camera.position.y = 15;
    camera.position.x = Math.PI / 2 - 15;
    camera.position.z = -10;
    camera.zoom = 0.4;
    camera.updateProjectionMatrix();

    scene.add(camera);
    scene.add(ambientLight);
    scene.background = textureLoader.load('./textures/galaxy.jpg');
    // scene.add(axesHelper);
    // scene.add(grideHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.minDistance = 5;
    controls.maxDistance = 50;

    // Dat GUI
    // const gui = new dat.GUI();
    // gui.add(camera.position, 'x', -100, 100, 0.1).name('카메라 X');
    // gui.add(camera.position, 'y', -100, 100, 0.1).name('카메라 Y');
    // gui.add(camera.position, 'z', -100, 100, 0.1).name('카메라 Z');

    const {
        solorSystem,
        mercurySystem,
        venusSystem,
        earthSystem,
        moonSystem,
        marsSystem,
        jupiterSystem,
        saturnSystem,
        uranusSystem,
        neptuneSystem,
        plutoSystem,
    } = await bootstrap(renderer);
    scene.add(solorSystem);

    function render() {
        const delta = clock.getDelta();

        /**
         * 태양계 공전/자전 주기
         * https://zio2017.tistory.com/171
         */

        mercurySystem.rotation.y += delta * 0.059;
        venusSystem.rotation.y += delta * 0.001;
        earthSystem.rotation.y += delta;
        moonSystem.rotation.y += delta * 0.8;
        marsSystem.rotation.y += delta;
        jupiterSystem.rotation.y += delta * 2.8;
        saturnSystem.rotation.y += delta * 2.4;
        uranusSystem.rotation.y += delta * 1.5;
        neptuneSystem.rotation.y += delta * 1.5;
        plutoSystem.rotation.y += delta * 0.0006;
        solorSystem.rotation.y += delta * 0.1;

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
