import * as THREE from 'three';
import { Shared } from './config';
import { makeGroup } from './helpers/group';
import { Planet } from './stars/base/Planet';
import { Stella } from './stars/base/Stella';
import { Satellite } from './stars/base/Satellite';

/**
 * https://sketchfab.com/PiedroNZ/collections/space-for-free-6b98ac257a2447dcaf528091903d61c7
 */

async function bootstrap(renderer: THREE.WebGLRenderer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    const { scene } = Shared;

    /**
     * 태양간 행성간 크기
     * http://scienceorc.net/science/study/jigu/g17-3.html
     */

    const mercury = new Planet({
        name: 'mercury',
        src: '/models/mercury.glb',
    });
    await mercury.loadMesh();
    // mercury.mesh.scale.set(0.3, 0.3, 0.3);
    const mercurySystem = makeGroup(mercury.mesh);
    // mercurySystem.position.x = 50;

    const venus = new Planet({
        name: 'venus',
        src: '/models/venus.glb',
    });
    await venus.loadMesh();
    // venus.mesh.scale.set(0.9, 0.9, 0.9);
    const venusSystem = makeGroup(venus.mesh);
    // venusSystem.position.x = 100;

    const moon = new Satellite({
        name: 'moon',
        src: '/models/moon.glb',
    });
    await moon.loadMesh();
    moon.mesh.scale.set(0.25, 0.25, 0.25);
    const moonSystem = makeGroup(moon.mesh);

    const earth = new Planet({
        name: 'earth',
        src: '/models/earth.glb',
    });
    await earth.loadMesh();
    const earthSystem = makeGroup([earth.mesh, moonSystem]);
    // earthSystem.position.x = 150;

    const mars = new Planet({
        name: 'mars',
        src: '/models/mars.glb',
    });
    await mars.loadMesh();
    const marsSystem = makeGroup(mars.mesh);
    // marsSystem.position.x = 230;

    const jupiter = new Planet({
        name: 'jupiter',
        src: '/models/jupiter-with-europa.glb',
    });
    await jupiter.loadMesh();
    jupiter.mesh.rotation.x = -Math.PI / 2;
    jupiter.mesh.scale.set(11.2, 11.2, 11.2);
    const jupiterSystem = makeGroup(jupiter.mesh);

    const saturn = new Planet({
        name: 'saturn',
        src: '/models/saturn.glb',
    });
    await saturn.loadMesh();
    saturn.mesh.scale.set(9.4, 9.4, 9.4);
    const saturnSystem = makeGroup(saturn.mesh);

    const uranus = new Planet({
        name: 'uranus',
        src: '/models/uranus.glb',
    });
    await uranus.loadMesh();
    uranus.mesh.scale.set(0.01, 0.01, 0.01);
    const uranusSystem = makeGroup(uranus.mesh);

    const neptune = new Planet({
        name: 'neptune',
        src: '/models/neptune.glb',
    });
    await neptune.loadMesh();
    const neptuneSystem = makeGroup(neptune.mesh);

    const pluto = new Planet({
        name: 'pluto',
        src: '/models/pluto.glb',
    });
    await pluto.loadMesh();
    const plutoSystem = makeGroup(pluto.mesh);

    const sun = new Stella({
        name: 'sun',
        src: '/models/sun.glb',
    });
    await sun.loadMesh();

    /**
     * 태양계 행성간 거리
     * https://m.blog.naver.com/jsy945/220893963552
     */

    const solorSystem = makeGroup([
        sun.mesh,
        mercurySystem,
        venusSystem,
        earthSystem,
        marsSystem,
        jupiterSystem,
        saturnSystem,
        uranusSystem,
        neptuneSystem,
        plutoSystem,
    ]);
    scene.add(jupiterSystem);

    return { solorSystem, earthSystem, moonSystem };
}

export default bootstrap;
