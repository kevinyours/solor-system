import { Object3D } from 'three';
import { Shared, Size } from './config';
import { Star, StarProps } from './base/Star';
import { Nullable } from './type';
import { GltfType, GltfTypeProps } from './base/GLTF';

/**
 * 행성
 */

export interface PlanetProps extends GltfTypeProps {}

export class Planet extends GltfType {
    constructor(props: PlanetProps) {
        super(props);
    }
}
