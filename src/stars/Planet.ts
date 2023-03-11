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
