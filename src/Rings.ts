import { RingGeometry, MeshBasicMaterial, Mesh } from 'three';
import { Star, StarProps } from './base/Star';
import { Geometry, Material } from './config';

/**
 * 행성의 고리
 */

export interface RingsProps extends StarProps {}

export class Rings extends Star {
    private _geometry: RingGeometry;
    private _material: MeshBasicMaterial;
    private _mesh: Mesh;

    constructor(props: StarProps) {
        super(props);

        this._geometry = Geometry.ring;
        this._material = Material.ring;
        this._mesh = new Mesh(this._geometry, this._material);
    }

    get mesh(): Mesh {
        return this._mesh;
    }
}
