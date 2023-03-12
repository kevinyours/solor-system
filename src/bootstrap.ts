import * as THREE from 'three';
import { makeGroup } from './helpers/group';
import { Planet } from './stars/Planet';
import { Stella } from './stars/Stella';
import { Satellite } from './stars/Satellite';

async function bootstrap(renderer: THREE.WebGLRenderer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    /**
     * 태양간 행성간 크기
     * http://scienceorc.net/science/study/jigu/g17-3.html
     */

    const mercury = new Planet({
        name: 'mercury',
        src: './models/mercury.glb',
    });
    await mercury.loadMesh();
    mercury.mesh.scale.set(0.2, 0.2, 0.2);
    const mercurySystem = makeGroup(mercury.mesh);

    const venus = new Planet({
        name: 'venus',
        src: './models/venus.glb',
    });
    await venus.loadMesh();
    venus.mesh.scale.set(0.3, 0.3, 0.3);
    const venusSystem = makeGroup(venus.mesh);

    const moon = new Satellite({
        name: 'moon',
        src: './models/moon.glb',
    });
    await moon.loadMesh();
    moon.mesh.scale.set(0.25, 0.25, 0.25);
    const moonSystem = makeGroup(moon.mesh);

    const earth = new Planet({
        name: 'earth',
        src: './models/earth.glb',
    });
    await earth.loadMesh();
    const earthSystem = makeGroup([earth.mesh, moonSystem]);

    const mars = new Planet({
        name: 'mars',
        src: './models/mars.glb',
    });
    await mars.loadMesh();
    mars.mesh.scale.set(0.32, 0.32, 0.32);
    const marsSystem = makeGroup(mars.mesh);

    const jupiter = new Planet({
        name: 'jupiter',
        src: './models/jupiter-with-europa.glb',
    });
    await jupiter.loadMesh();
    jupiter.mesh.rotation.x = -Math.PI / 2;
    jupiter.mesh.scale.set(1.4, 1.4, 1.4);
    const jupiterSystem = makeGroup(jupiter.mesh);

    const saturn = new Planet({
        name: 'saturn',
        src: './models/saturn.glb',
    });
    await saturn.loadMesh();
    saturn.mesh.rotation.x = Math.PI / 2;
    const saturnSystem = makeGroup(saturn.mesh);

    const uranus = new Planet({
        name: 'uranus',
        src: './models/uranus.glb',
    });
    await uranus.loadMesh();
    uranus.mesh.scale.set(0.00002, 0.00002, 0.00002);
    const uranusSystem = makeGroup(uranus.mesh);

    const neptune = new Planet({
        name: 'neptune',
        src: './models/neptune.glb',
    });
    await neptune.loadMesh();
    neptune.mesh.scale.set(0.09, 0.09, 0.09);
    neptune.mesh.rotation.x = Math.PI / 2;
    const neptuneSystem = makeGroup(neptune.mesh);

    const pluto = new Planet({
        name: 'pluto',
        src: './models/pluto.glb',
    });
    await pluto.loadMesh();
    pluto.mesh.scale.set(0.6, 0.6, 0.6);
    pluto.mesh.rotation.x = THREE.MathUtils.degToRad(260);
    pluto.mesh.rotation.z = THREE.MathUtils.degToRad(180);
    const plutoSystem = makeGroup(pluto.mesh);

    const sun = new Stella({
        name: 'sun',
        src: './models/sun.glb',
    });
    await sun.loadMesh();
    sun.mesh.scale.set(0.26, 0.26, 0.26);

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

    /**
     * 태양계 행성간 거리
     * https://m.blog.naver.com/jsy945/220893963552
     */

    mercurySystem.position.x = 6;
    mercurySystem.position.z = -2;
    venusSystem.position.x = 8;
    venusSystem.position.z = 0;
    earthSystem.position.x = 13;
    earthSystem.position.y = 1;
    earthSystem.position.z = -0.8;
    moonSystem.position.y = -1;
    moonSystem.position.x = -0.45;
    marsSystem.position.x = -16;
    marsSystem.position.z = -5;
    jupiterSystem.position.x = -21;
    jupiterSystem.position.z = 4;
    saturnSystem.position.x = -27;
    saturnSystem.position.z = 20;
    uranusSystem.position.x = -31;
    uranusSystem.position.z = -10;
    neptuneSystem.position.x = 34.5;
    neptuneSystem.position.z = -13;
    plutoSystem.position.x = 38;
    plutoSystem.position.z = 3;

    return {
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
    };
}

export default bootstrap;
