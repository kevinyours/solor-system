import { GltfType, GltfTypeProps } from './base/GLTF';

/**
 * 위성
 */

export interface SatelliteProps extends GltfTypeProps {}

export class Satellite extends GltfType {
    constructor(props: SatelliteProps) {
        super(props);
    }
}
