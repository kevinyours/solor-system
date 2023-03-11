import { Object3D } from 'three';
import { Star, StarProps } from './base/Star';
import { Shared, Size } from '../config';
import { Nullable } from '../type';

/**
 * 항성
 */

export interface StellaProps extends StarProps {
    src: string;
    width?: number;
    height?: number;
    depth?: number;
}

export class Stella extends Star {
    private _src: string;
    private _width: number;
    private _height: number;
    private _depth: number;
    private _mesh: Nullable<Object3D> = null;

    constructor(props: StellaProps) {
        super(props);

        this._src = props.src;
        this._width = props.width || Size.defaultWidth;
        this._height = props.height || Size.defaultHeight;
        this._depth = props.depth || Size.defaultDepth;
    }

    async loadMesh() {
        const gltf = await Shared.glftLoader.loadAsync(this.src);
        this._mesh = gltf.scene.children[0];
        this._mesh.position.set(this.x, this.y, this.z);
        this._mesh.rotation.set(this.rotationX, this.rotationY, this.rotationZ);
        this._mesh.castShadow = true;
    }

    get src(): string {
        return this._src;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get depth(): number {
        return this._depth;
    }

    get mesh(): Object3D {
        if (!this._mesh) throw new Error(`${this.name} has no mesh`);
        return this._mesh;
    }
}
