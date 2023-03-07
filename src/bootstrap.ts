import * as THREE from 'three';
import { Shared } from './config';
import { makeGroup } from './helpers/group';
import { Moon } from './Moon';
import { Planet } from './Planet';
import { Satellite } from './Satellite';
import { Stella } from './Stella';

/**
 * https://sketchfab.com/PiedroNZ/collections/space-for-free-6b98ac257a2447dcaf528091903d61c7
 */

async function bootstrap(renderer: THREE.WebGLRenderer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    const { scene, ambientLight, directionalLight } = Shared;

    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(ambientLight);
    scene.add(directionalLight);

    const moon = new Moon({
        name: 'moon',
        src: '/textures/moon.jpg',
    });
    await moon.loadMesh();
    moon.mesh.scale.set(0.15, 0.15, 0.15);
    moon.mesh.position.x = 22;

    const earth = new Planet({
        name: 'earth',
        src: '/models/earth.glb',
        width: 0.1,
        height: 0.1,
        depth: 0.1,
    });
    await earth.loadMesh();
    // earth.mesh.scale.set(0.2, 0.2, 0.2);
    earth.mesh.position.x = 20;

    const sun = new Stella({
        name: 'sun',
        src: '/models/sun.glb',
    });
    await sun.loadMesh();

    const moonSystem = makeGroup(moon.mesh);
    const earthSystem = makeGroup([earth.mesh, moonSystem]);
    const solorSystem = makeGroup([sun.mesh, earthSystem]);
    scene.add(solorSystem);

    return { solorSystem, earthSystem, moonSystem };
}

export default bootstrap;
