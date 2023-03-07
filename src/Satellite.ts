import { TextureType, TextureTypeProps } from './base/Texture';

/**
 * 위성
 */

export interface SatelliteProps extends TextureTypeProps {}

export class Satellite extends TextureType {
    constructor(props: SatelliteProps) {
        super(props);
    }
}
