import { Mesh, MeshStandardMaterial, RepeatWrapping, SphereGeometry } from 'three';
import { Star, StarProps } from '../base/Star';
import { Geometry, Shared } from '../config';
import { Nullable } from '../type';

interface MoonProps extends StarProps {
    src: string;
}

export class Moon extends Star {
    private _maxPoints = 100;
    private _src: string;
    private _geometry: Nullable<SphereGeometry> = null;
    private _mesh: Nullable<Mesh<SphereGeometry, MeshStandardMaterial>> = null;

    constructor(props: MoonProps) {
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

    get src() {
        return this._src;
    }
}
