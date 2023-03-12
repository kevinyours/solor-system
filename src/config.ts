import {
    Clock,
    AxesHelper,
    GridHelper,
    Scene,
    SphereGeometry,
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
    frustumSize: 30, // 절두체 크기
    aspect: window.innerWidth / window.innerHeight, // 윈도우 화면 비율
};

export const Colors = {
    defaultColor: '#fff',
    backgroundColor: 'hsl(60, 8%, 5%)',
};

export const Shared = {
    canvas: document.querySelector('#space-canvas') as HTMLCanvasElement,
    clock: new Clock(),
    scene: new Scene(),
    axesHelper: new AxesHelper(100),
    grideHelper: new GridHelper(5),
    glftLoader: new GLTFLoader(),
    textureLoader: new TextureLoader(),
    camera: new OrthographicCamera(
        -(Size.frustumSize * Size.aspect) / 2,
        (Size.frustumSize * Size.aspect) / 2,
        Size.frustumSize / 2,
        -Size.frustumSize / 2,
        1,
        10000,
    ),
    ambientLight: new AmbientLight(0xffffff, 1),
    directionalLight: new DirectionalLight(0xffffff, 1),
};

export const Geometry = {
    sphere: new SphereGeometry(1, 32, 32),
};
