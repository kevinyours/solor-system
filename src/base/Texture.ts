import { Mesh, MeshStandardMaterial, SphereGeometry, RepeatWrapping } from 'three';
import { Shared, Geometry } from '../config';
import { Star, StarProps } from './Star';
import { Nullable } from '../type';

export interface TextureTypeProps extends StarProps {
    src: string;
}

export class TextureType extends Star {
    private _src: string;
    private _mesh: Nullable<Mesh<SphereGeometry, MeshStandardMaterial>> = null;

    constructor(props: TextureTypeProps) {
        super(props);

        this._src = props.src;
    }

    async loadMesh() {
        const texture = await Shared.textureLoader.loadAsync(this.src);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(4, 4);

        const geometry = Geometry.sphere;
        const material = new MeshStandardMaterial({
            map: texture,
        });
        this._mesh = new Mesh(geometry, material);
    }

    get mesh() {
        if (!this._mesh) throw new Error(`${this.name} has no mesh`);
        return this._mesh;
    }

    get src(): string {
        return this._src;
    }
}
