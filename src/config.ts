import {
    Clock,
    RingGeometry,
    Scene,
    SphereGeometry,
    MeshBasicMaterial,
    DoubleSide,
    OrthographicCamera,
    AmbientLight,
    DirectionalLight,
    TextureLoader,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Size = {
    defaultWidth: 0.5,
    defaultHeight: 0.5,
    defaultDepth: 0.5,
};

export const Colors = {
    defaultColor: '#fff',
};

export const Shared = {
    clock: new Clock(),
    scene: new Scene(),
    glftLoader: new GLTFLoader(),
    textureLoader: new TextureLoader(),
    camera: new OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        1,
        1000,
    ),
    ambientLight: new AmbientLight('white', 1),
    directionalLight: new DirectionalLight('white', 1),
};

export const Geometry = {
    ring: new RingGeometry(9, 12, 30, 16, 0, 6.28),
    sphere: new SphereGeometry(1, 32, 32),
};

export const Material = {
    ring: new MeshBasicMaterial({ color: Colors.defaultColor, side: DoubleSide }),
};
